import ExpoModulesCore

public class CalculatorModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Calculator')` in JavaScript.
    Name("Calculator")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(CalculatorView.self) {
      // Defines a setter for the `url` prop.
      Prop("url") { (view: CalculatorView, url: URL) in
        if view.webView.url != url {
          view.webView.load(URLRequest(url: url))
        }
      }

      Events("onLoad")
    }

    View(NativeButtonView.self) {
      // No props or events needed
    }

    View(NativeStyledTextView.self) {
      // No props or events needed  
    }
  }
}

// Native Button View
class NativeButtonView: ExpoView {
  private let button = UIButton(type: .system)
  
  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    setupButton()
  }
  
  private func setupButton() {
    button.setTitle("Native Button", for: .normal)
    button.backgroundColor = UIColor.systemBlue
    button.setTitleColor(.white, for: .normal)
    button.layer.cornerRadius = 8
    button.titleLabel?.font = UIFont.systemFont(ofSize: 16, weight: .medium)
    addSubview(button)
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    button.frame = bounds
  }
}

// Native Styled Text View
class NativeStyledTextView: ExpoView {
  private let label = UILabel()
  
  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    setupLabel()
  }
  
  private func setupLabel() {
    label.text = "Hello from Native"
    label.font = UIFont.systemFont(ofSize: 18, weight: .bold)
    label.textColor = UIColor.systemPurple
    label.textAlignment = .center
    label.backgroundColor = UIColor.systemGray6
    label.layer.cornerRadius = 8
    label.clipsToBounds = true
    addSubview(label)
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    label.frame = bounds
  }
}
