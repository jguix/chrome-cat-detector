const maxMeows = 6;
const meanDelay = 400;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    detectCats(tabId);
  }
});

chrome.tabs.onActivated.addListener((activeTab) => detectCats(activeTab.tabId));

const detectCats = (tabId) => {
  chrome.browserAction.setBadgeText({ text: "" });
  chrome.tabs.sendMessage(tabId, { text: "cat_count" }, onCatCount);
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
  // Limit meows, we don't want to play 1000 sounds
  let i = catNumber - maxMeows > 0 ? catNumber - maxMeows : 1;
  let j = 0;
  // Cats will meow at random times
  for (; i <= catNumber - 1; i++, j++) {
    updateBadge(i, j * Math.random() * meanDelay);
  }
  // Last cat should come last, let's give it a high delay without random weighing
  updateBadge(catNumber, j * meanDelay);
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
