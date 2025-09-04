package expo.modules.calculator

import android.content.Context
import android.graphics.Typeface
import android.view.Gravity
import android.widget.Button
import android.widget.TextView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
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
