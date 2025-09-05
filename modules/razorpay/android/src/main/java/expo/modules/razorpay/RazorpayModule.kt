package expo.modules.razorpay

import android.app.Activity
import androidx.fragment.app.FragmentActivity
import com.razorpay.Checkout
import com.razorpay.PaymentResultListener
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.types.Enumerable
import org.json.JSONObject

data class RazorpayOptions(
  val key: String,
  val amount: Int, // Amount in paise (smallest currency unit)
  val currency: String = "INR",
  val orderId: String? = null,
  val name: String,
  val description: String? = null,
  val image: String? = null,
  val prefill: PrefillOptions? = null,
  val notes: Map<String, Any>? = null,
  val theme: ThemeOptions? = null,
  val modal: ModalOptions? = null,
  val readonly: ReadonlyOptions? = null
) : Record

data class PrefillOptions(
  val name: String? = null,
  val email: String? = null,
  val contact: String? = null
) : Record

data class ThemeOptions(
  val color: String? = null,
  val backdropColor: String? = null
) : Record

data class ModalOptions(
  val backdropClose: Boolean = true,
  val escape: Boolean = true,
  val handleback: Boolean = true,
  val confirm_close: Boolean = false
) : Record

data class ReadonlyOptions(
  val email: Boolean = false,
  val contact: Boolean = false,
  val name: Boolean = false
) : Record

enum class PaymentStatus(val value: String) : Enumerable {
  SUCCESS("success"),
  ERROR("error"),
  CANCELLED("cancelled")
}

data class PaymentResult(
  val status: PaymentStatus,
  val paymentId: String? = null,
  val orderId: String? = null,
  val signature: String? = null,
  val error: PaymentError? = null
) : Record

data class PaymentError(
  val code: String,
  val description: String,
  val source: String? = null,
  val step: String? = null,
  val reason: String? = null
) : Record

class RazorpayModule : Module(), PaymentResultListener {
  private var currentPromise: Promise? = null
  
  override fun definition() = ModuleDefinition {
    Name("Razorpay")
    
    Constants(
      "SDK_VERSION" to "1.6.40" // Hardcoded version as getVersion() is not available in this SDK version
    )
    
    AsyncFunction("initializePayment") { options: RazorpayOptions, promise: Promise ->
      try {
        val activity = appContext.activityProvider?.currentActivity as? FragmentActivity
          ?: throw Exception("Current activity is not available or not a FragmentActivity")
        
        currentPromise = promise
        
        // Create Checkout instance
        val checkout = Checkout()
        checkout.setKeyID(options.key)
        
        // Build payment options JSON
        val paymentOptions = JSONObject().apply {
          put("key", options.key)
          put("amount", options.amount)
          put("currency", options.currency)
          put("name", options.name)
          
          options.orderId?.let { put("order_id", it) }
          options.description?.let { put("description", it) }
          options.image?.let { put("image", it) }
          
          // Prefill options
          options.prefill?.let { prefill ->
            val prefillJson = JSONObject()
            prefill.name?.let { prefillJson.put("name", it) }
            prefill.email?.let { prefillJson.put("email", it) }
            prefill.contact?.let { prefillJson.put("contact", it) }
            put("prefill", prefillJson)
          }
          
          // Theme options
          options.theme?.let { theme ->
            val themeJson = JSONObject()
            theme.color?.let { themeJson.put("color", it) }
            theme.backdropColor?.let { themeJson.put("backdrop_color", it) }
            put("theme", themeJson)
          }
          
          // Modal options
          options.modal?.let { modal ->
            val modalJson = JSONObject().apply {
              put("backdrop_close", modal.backdropClose)
              put("escape", modal.escape)
              put("handleback", modal.handleback)
              put("confirm_close", modal.confirm_close)
            }
            put("modal", modalJson)
          }
          
          // Readonly options
          options.readonly?.let { readonly ->
            val readonlyJson = JSONObject().apply {
              put("email", readonly.email)
              put("contact", readonly.contact)
              put("name", readonly.name)
            }
            put("readonly", readonlyJson)
          }
          
          // Notes
          options.notes?.let { notes ->
            val notesJson = JSONObject()
            notes.forEach { (key, value) ->
              notesJson.put(key, value)
            }
            put("notes", notesJson)
          }
        }
        
        // Start payment
        checkout.open(activity, paymentOptions)
        
      } catch (e: Exception) {
        promise.reject("RAZORPAY_INIT_ERROR", e.message ?: "Failed to initialize Razorpay", e)
        currentPromise = null
      }
    }
    
    Function("getVersion") {
      "1.6.40" // Return hardcoded version as Checkout.getVersion() is not available in this SDK version
    }
  }
  
  // PaymentResultListener implementation
  override fun onPaymentSuccess(paymentId: String?) {
    val result = PaymentResult(
      status = PaymentStatus.SUCCESS,
      paymentId = paymentId
    )
    
    currentPromise?.resolve(result)
    currentPromise = null
  }
  
  override fun onPaymentError(code: Int, response: String?) {
    try {
      val errorJson = response?.let { JSONObject(it) }
      val error = PaymentError(
        code = code.toString(),
        description = errorJson?.optString("error")?.let { errorDetails ->
          val errorDetailsJson = JSONObject(errorDetails)
          errorDetailsJson.optString("description", "Payment failed")
        } ?: "Payment failed",
        source = errorJson?.optString("error")?.let { errorDetails ->
          val errorDetailsJson = JSONObject(errorDetails)
          errorDetailsJson.optString("source")
        },
        step = errorJson?.optString("error")?.let { errorDetails ->
          val errorDetailsJson = JSONObject(errorDetails)
          errorDetailsJson.optString("step")
        },
        reason = errorJson?.optString("error")?.let { errorDetails ->
          val errorDetailsJson = JSONObject(errorDetails)
          errorDetailsJson.optString("reason")
        }
      )
      
      val result = PaymentResult(
        status = PaymentStatus.ERROR,
        error = error
      )
      
      currentPromise?.resolve(result)
      
    } catch (e: Exception) {
      val error = PaymentError(
        code = code.toString(),
        description = response ?: "Unknown error occurred"
      )
      
      val result = PaymentResult(
        status = PaymentStatus.ERROR,
        error = error
      )
      
      currentPromise?.resolve(result)
    }
    
    currentPromise = null
  }
}
