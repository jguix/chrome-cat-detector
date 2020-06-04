const setDefaults = () =>
  chrome.storage.sync.get(["autodetect"], ({ autodetect }) => {
    if (autodetect === undefined) {
      chrome.storage.sync.set({ autodetect: false });
    }
  });

const setMenuItems = () => {
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: "DETECT_CATS",
    title: "Detect cats",
    contexts: ["browser_action"],
  });
  chrome.contextMenus.create({
    id: "AUTO_DETECT",
    title: "Auto-detect",
    type: "checkbox",
    checked: false,
    contexts: ["browser_action"],
  });
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "DETECT_CATS") {
    detectCats(tab.id);
    highlightCats(tab.id);
  } else if (info.menuItemId === "AUTO_DETECT") {
    chrome.storage.sync.set({ autodetect: info.checked });
  }
});

setDefaults();
setMenuItems();
