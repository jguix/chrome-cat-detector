const words = ["cat", "cats", "kitten", "kittens", "kitty", "kitties"];
const regex = new RegExp(`(${words.join("|")})\\b`, "gi");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === "cat_count") {
    sendResponse(countCats());
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
