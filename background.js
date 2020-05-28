var lastTabId;

const playSound = (catIndex, delay) => {
  setTimeout(() => {
    console.log(`Playing audios/meow_${catIndex % 7}.mp3`);
    var meow = new Audio(
      chrome.runtime.getURL(`audios/meow_${catIndex % 7}.mp3`)
    );
    meow.play();
    chrome.browserAction.setBadgeText({ text: catIndex.toString() });
  }, delay);
};

// A function to use as callback
const onCatCount = (res) => {
  const { catNumber, tabId } = res;
  console.log(`${catNumber} cats spotted in tab ${tabId}`);

  if (!catNumber) {
    chrome.browserAction.disable(tabId);
    return;
  }

  // Limit sounds to maximum 6 cats
  let i = catNumber - 5 > 0 ? catNumber - 5 : 1;
  let j = 0;
  for (; i <= catNumber - 1; i++, j++) {
    playSound(i, j * Math.random() * 400);
  }
  // Last cat should come last
  playSound(catNumber, j * 500);

  // chrome.tabs.sendMessage(lastTabId, {
  //   text: "display_cats",
  //   catNumber: catNumber,
  // });
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active) {
    lastTabId = tab.id;
    chrome.tabs.sendMessage(tabId, { text: "cat_count", tabId }, onCatCount);
  }
});
