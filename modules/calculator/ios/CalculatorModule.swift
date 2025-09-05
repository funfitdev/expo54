import ExpoModulesCore
import UIKit
import SwiftUI

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

    View(NativeBottomSheetView.self) {
      // Test with a simple string prop first
      Prop("testProp") { (view: NativeBottomSheetView, testValue: String) in
        print("iOS TEST PROP CALLED with: \(testValue)")
      }
      
      Prop("isVisible") { (view: NativeBottomSheetView, isVisible: Bool?) in
        print("iOS Prop setter 'isVisible' called with: \(String(describing: isVisible))")
        if let visible = isVisible {
          view.setVisible(visible)
        }
      }
      Prop("title") { (view: NativeBottomSheetView, title: String?) in
        print("iOS Prop setter 'title' called with: \(String(describing: title))")
        if let titleString = title {
          view.setTitle(titleString)
        }
      }
      Prop("content") { (view: NativeBottomSheetView, content: String?) in
        print("iOS Prop setter 'content' called with: \(String(describing: content))")
        if let contentString = content {
          view.setContent(contentString)
        }
      }
      Events("onDismiss")
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

// Native Bottom Sheet View using SwiftUI
class NativeBottomSheetView: ExpoView {
  private var isSheetVisible = false
  private var sheetTitle = "Bottom Sheet"
  private var sheetContent = "This is a native bottom sheet"
  private var hostingController: UIHostingController<BottomSheetContentView>?
  let onDismiss = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    print("iOS NativeBottomSheetView initialized")
    setupView()
  }
  
  private func setupView() {
    backgroundColor = UIColor.clear
  }
  
  func setVisible(_ visible: Bool) {
    print("iOS setVisible called with: \(visible)")
    isSheetVisible = visible
    updateSheet()
  }
  
  func setTitle(_ title: String) {
    print("iOS setTitle called with: \(title)")
    sheetTitle = title
    updateSheet()
  }
  
  func setContent(_ content: String) {
    print("iOS setContent called with: \(content)")
    sheetContent = content
    updateSheet()
  }
  
  private func updateSheet() {
    if isSheetVisible {
      presentSheet()
    } else {
      dismissSheet()
    }
  }
  
  private func presentSheet() {
    print("Attempting to present sheet - title: \(sheetTitle), content: \(sheetContent)")
    
    guard let parentViewController = findViewController() else { 
      print("Could not find parent view controller")
      return 
    }
    
    print("Found parent view controller: \(parentViewController)")
    
    let contentView = BottomSheetContentView(
      title: sheetTitle,
      content: sheetContent,
      onDismiss: {
        print("Bottom sheet dismissed from iOS")
        self.onDismiss(["dismissed": true])
      }
    )
    
    hostingController = UIHostingController(rootView: contentView)
    
    if let sheet = hostingController?.sheetPresentationController {
      sheet.detents = [.medium(), .large()]
      sheet.preferredCornerRadius = 16
    }
    
    print("About to present hostingController")
    parentViewController.present(hostingController!, animated: true)
    print("Present call completed")
  }
  
  private func dismissSheet() {
    hostingController?.dismiss(animated: true)
    hostingController = nil
  }
}

// SwiftUI Content View for the Bottom Sheet
struct BottomSheetContentView: View {
  let title: String
  let content: String
  let onDismiss: () -> Void
  
  var body: some View {
    NavigationView {
      VStack(spacing: 20) {
        Text(title)
          .font(.title2)
          .fontWeight(.semibold)
          .padding(.top)
        
        Text(content)
          .font(.body)
          .multilineTextAlignment(.center)
          .padding(.horizontal)
        
        Spacer()
        
        Button("Close") {
          onDismiss()
        }
        .buttonStyle(.borderedProminent)
        .padding(.bottom)
      }
      .navigationBarTitleDisplayMode(.inline)
      .toolbar {
        ToolbarItem(placement: .navigationBarTrailing) {
          Button("Done") {
            onDismiss()
          }
        }
      }
    }
  }
}

// Helper extension to find the parent view controller
extension UIView {
  func findViewController() -> UIViewController? {
    if let nextResponder = next as? UIViewController {
      return nextResponder
    } else if let nextResponder = next as? UIView {
      return nextResponder.findViewController()
    } else {
      return nil
    }
  }
}
