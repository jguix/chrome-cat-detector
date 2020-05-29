chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete" && tab.active) {
    detectCats(tabId);
  }
});

chrome.tabs.onActivated.addListener((activeTab) => detectCats(activeTab.tabId));

const detectCats = (tabId) => {
  chrome.browserAction.setBadgeText({ text: "" });
  chrome.tabs.sendMessage(tabId, { text: "cat_count", tabId }, onCatCount);
};

const onCatCount = (res) => {
  if (!res) return;
  const { catNumber, tabId } = res;

  if (!catNumber) {
    chrome.browserAction.disable(tabId);
    return;
  }

  animateBadge(catNumber);
};

const animateBadge = (catNumber) => {
  // Limit sounds to maximum 6 cats
  let i = catNumber - 5 > 0 ? catNumber - 5 : 1;
  let j = 0;
  for (; i <= catNumber - 1; i++, j++) {
    updateBadge(i, j * Math.random() * 400);
  }
  // Last cat should come last
  updateBadge(catNumber, j * 500);
};

const updateBadge = (catIndex, delay) => {
  setTimeout(() => {
    var meow = new Audio(
      chrome.runtime.getURL(`audios/meow_${catIndex % 7}.mp3`)
    );
    meow.play();
    chrome.browserAction.setBadgeText({ text: catIndex.toString() });
  }, delay);
};
