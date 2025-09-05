package expo.modules.calculator

import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.ColorDrawable
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.Window
import android.view.WindowManager
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import java.net.URL

class CalculatorModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Calculator')` in JavaScript.
    Name("Calculator")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(CalculatorView::class) {
      // Defines a setter for the `url` prop.
      Prop("url") { view: CalculatorView, url: URL ->
        view.webView.loadUrl(url.toString())
      }
      // Defines an event that the view can send to JavaScript.
      Events("onLoad")
    }

    View(NativeButtonView::class) {
      // No props or events needed
    }

    View(NativeStyledTextView::class) {
      // No props or events needed
    }

    View(NativeBottomSheetView::class) {
      Prop("isVisible") { view: NativeBottomSheetView, isVisible: Boolean? ->
        println("Android Prop setter 'isVisible' called with: $isVisible")
        isVisible?.let { view.setVisible(it) }
      }
      Prop("title") { view: NativeBottomSheetView, title: String? ->
        println("Android Prop setter 'title' called with: $title")
        title?.let { view.setTitle(it) }
      }
      Prop("content") { view: NativeBottomSheetView, content: String? ->
        println("Android Prop setter 'content' called with: $content")
        content?.let { view.setContent(it) }
      }
      Events("onDismiss")
    }

  }
}

// Native Button View
class NativeButtonView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val button = Button(context)
  
  init {
    setupButton()
    addView(button)
  }
  
  private fun setupButton() {
    button.text = "Native Button"
    button.setBackgroundColor(android.graphics.Color.BLUE)
    button.setTextColor(android.graphics.Color.WHITE)
    button.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }
}

// Native Styled Text View
class NativeStyledTextView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val textView = TextView(context)
  
  init {
    setupTextView()
    addView(textView)
  }
  
  private fun setupTextView() {
    textView.text = "Hello from Native"
    textView.textSize = 18f
    textView.setTypeface(null, Typeface.BOLD)
    textView.setTextColor(android.graphics.Color.parseColor("#6A0DAD")) // Purple
    textView.gravity = Gravity.CENTER
    textView.setBackgroundColor(android.graphics.Color.LTGRAY)
    textView.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }
}

// Native Bottom Sheet View using custom Dialog
class NativeBottomSheetView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onDismiss by EventDispatcher()
  private var isSheetVisible = false
  private var sheetTitle = "Bottom Sheet"
  private var sheetContent = "This is a native bottom sheet"
  private var dialog: Dialog? = null
  
  init {
    println("Android NativeBottomSheetView initialized")
    // Invisible container view
    layoutParams = LayoutParams(1, 1)
  }
  
  fun setVisible(visible: Boolean) {
    println("Android setVisible called with: $visible")
    isSheetVisible = visible
    updateBottomSheet()
  }
  
  fun setTitle(title: String) {
    println("Android setTitle called with: $title")
    sheetTitle = title
  }
  
  fun setContent(content: String) {
    println("Android setContent called with: $content")
    sheetContent = content
  }
  
  private fun updateBottomSheet() {
    println("Android updateBottomSheet called - isSheetVisible: $isSheetVisible")
    if (isSheetVisible) {
      showBottomSheet()
    } else {
      hideBottomSheet()
    }
  }
  
  private fun showBottomSheet() {
    println("Android showBottomSheet called - title: $sheetTitle, content: $sheetContent")
    
    if (dialog?.isShowing == true) {
      println("Dialog already showing, returning")
      return
    }
    
    println("Creating new dialog")
    dialog = Dialog(context).apply {
      requestWindowFeature(Window.FEATURE_NO_TITLE)
      setContentView(createBottomSheetView())
      
      // Configure dialog to appear at bottom like a bottom sheet
      window?.apply {
        setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        setGravity(Gravity.BOTTOM)
        attributes?.apply {
          windowAnimations = android.R.style.Animation_Dialog
        }
      }
      
      setOnDismissListener {
        println("Android dialog dismissed")
        isSheetVisible = false
        onDismiss(mapOf("dismissed" to true))
      }
      
      println("About to show dialog")
      show()
      println("Dialog show() call completed")
    }
  }
  
  private fun hideBottomSheet() {
    dialog?.dismiss()
    dialog = null
  }
  
  private fun createBottomSheetView(): View {
    val container = LinearLayout(context).apply {
      orientation = LinearLayout.VERTICAL
      setPadding(48, 48, 48, 48)
      setBackgroundColor(Color.WHITE)
      layoutParams = ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.WRAP_CONTENT
      )
    }
    
    // Title TextView
    val titleView = TextView(context).apply {
      text = sheetTitle
      textSize = 20f
      setTypeface(null, Typeface.BOLD)
      gravity = Gravity.CENTER
      setPadding(0, 0, 0, 32)
      setTextColor(Color.BLACK)
    }
    
    // Content TextView
    val contentView = TextView(context).apply {
      text = sheetContent
      textSize = 16f
      gravity = Gravity.CENTER
      setPadding(0, 0, 0, 32)
      setTextColor(Color.DKGRAY)
    }
    
    // Close Button
    val closeButton = Button(context).apply {
      text = "Close"
      setOnClickListener {
        hideBottomSheet()
        onDismiss(mapOf("dismissed" to true))
      }
    }
    
    container.addView(titleView)
    container.addView(contentView)
    container.addView(closeButton)
    
    return container
  }
}
