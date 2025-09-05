import ExpoModulesCore
import UIKit

// This view can be used for custom Razorpay UI components if needed
class RazorpayView: ExpoView {
  let onPaymentEvent = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    backgroundColor = UIColor.clear
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    // Custom layout logic if needed
  }

  func sendPaymentEvent(_ data: [String: Any]) {
    onPaymentEvent(data)
  }
}
