const onCatCount = (res) => {
  if (!res) return;
  const { catNumber } = res;
  document.getElementById(
    "cat_image"
  ).src = `https://cataas.com/c/s/${catNumber}%20happy%20cats%20detected?t=sq&width=350`;
};

window.onload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    const tabId = activeTab[0].id;
    chrome.tabs.sendMessage(tabId, { text: "cat_count", tabId }, onCatCount);
  });
};
