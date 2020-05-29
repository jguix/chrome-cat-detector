chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === "cat_count") {
    sendResponse(countCats());
  }
});

const countCats = () => {
  var content =
    document.body["innerText" in document.body ? "innerText" : "textContent"];
  content = removeScriptsFromContent(content);
  var regex = /(cat|cats|kitten|kittens|kitty|kitties)[\s.,]/gi;

  return content.match(regex)?.length || 0;
};

const removeScriptsFromContent = (strCode) => {
  return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
};
