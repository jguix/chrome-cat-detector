function noscript(strCode) {
  return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  if (msg.text === "cat_count") {
    var content =
      document.body["innerText" in document.body ? "innerText" : "textContent"];
    content = noscript(content);
    var regex = /(cat|cats|kitten|kittens|kitty|kitties)[\s.,]/gi;
    var catNumber = content.match(regex)?.length;
    // Call the specified callback
    sendResponse({ catNumber, tabId: msg.tabId });
  }
});
