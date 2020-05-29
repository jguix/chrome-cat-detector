window.onload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    const tabId = activeTab[0].id;
    chrome.tabs.sendMessage(tabId, { text: "cat_count" }, onCatCount);
  });
};

const onCatCount = (catNumber) => {
  document.getElementById(
    "cat_image"
  ).src = `https://cataas.com/c/s/${catNumber}%20happy%20cats%20detected?t=sq&width=350`;
};
