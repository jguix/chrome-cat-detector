chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  if (msg.text === "display_cats") {
    document.getElementById("cat_number").innerHTML = 14;
    // Call the specified callback
    // sendResponse();
  }
});
