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

const onCatCount = (catNumber) => {
  if (!catNumber) {
    deactivateIcon();
  } else {
    animateBadge(catNumber);
  }
};

const deactivateIcon = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    chrome.browserAction.disable(activeTab[0].id);
  });
};

const animateBadge = (catNumber) => {
  // Limit sounds to maximum 6 cats
  let i = catNumber - 5 > 0 ? catNumber - 5 : 1;
  let j = 0;
  // Cats will meow at random times
  for (; i <= catNumber - 1; i++, j++) {
    updateBadge(i, j * Math.random() * 400);
  }
  // Last cat should come last, let's give it the highest delay
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
