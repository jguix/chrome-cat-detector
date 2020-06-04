window.onload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    const tabId = activeTab[0].id;
    chrome.tabs.sendMessage(tabId, { text: "cat_count" }, onCatCount);
  });
};

const onCatCount = (catNumber) => {
  const displayedCat = catNumber % 5;
  document.getElementById("cat_number").innerHTML = catNumber;
  document.getElementById("cat_image").src = chrome.extension.getURL(
    `images/cat_${displayedCat}.jpg`
  );
};
