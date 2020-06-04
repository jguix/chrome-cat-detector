// https://github.com/WindzCUHK/chrome-highlight-extension
// https://github.com/padolsey/findAndReplaceDOMText/blob/master/src/findAndReplaceDOMText.js

const words = ["cat", "cats", "kitten", "kittens", "kitty", "kitties"];
const regex = new RegExp(`(${words.join("|")})\\b`, "gi");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === "cat_count") {
    sendResponse(countCats());
  }

  if (msg.text === "cat_highlight") {
    highlightCats();
  }
});

const countCats = () => {
  var content =
    document.body["innerText" in document.body ? "innerText" : "textContent"];
  content = removeScriptsFromContent(content);

  return content.match(regex)?.length || 0;
};

const removeScriptsFromContent = (strCode) => {
  return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
};

const highlightCats = () => {
  findAndReplaceDOMText(document.body, {
    preset: "prose",
    find: regex,
    wrap: "span",
    wrapClass: "highlight",
  });
};
