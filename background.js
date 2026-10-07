async function setTimerForTab(e, t) {
  const { timers: a = {} } = await chrome.storage.local.get("timers");
  let r = t.intervalSeconds;
  (t.isRandom &&
    (r = Math.floor(Math.random() * (t.maxTime - t.minTime + 1)) + t.minTime),
    (a[e] = {
      ...t,
      interval: r,
      timesRefreshed: 0,
      startTime: Date.now(),
      running: !0,
    }),
    await chrome.storage.local.set({ timers: a }),
    scheduleAlarm(e, r),
    startBadgeUpdateLoop());
}
function scheduleAlarm(e, t) {
  chrome.alarms.create(`refresh_${e}`, { delayInMinutes: t / 60 });
}
(chrome.runtime.onInstalled.addListener((e) => {
  (chrome.storage.local.set({ timers: {} }),
    ("update" !== e.reason && "install" !== e.reason) ||
      chrome.tabs.query({}, (e) => {
        e.forEach((e) => {
          !e.url ||
            e.url.startsWith("chrome://") ||
            e.url.startsWith("about:") ||
            chrome.scripting
              .executeScript({ target: { tabId: e.id }, files: ["content.js"] })
              .catch((e) => {});
        });
      }));
}),
  chrome.runtime.onStartup.addListener(async () => {
    (await chrome.alarms.clearAll(),
      await chrome.storage.local.set({ timers: {} }),
      chrome.action.setBadgeText({ text: "" }));
  }),
  chrome.runtime.onMessage.addListener((e, t, a) =>
    "setTimer" === e.action
      ? (setTimerForTab(e.tabId, e.config).then(() => a({ success: !0 })), !0)
      : "getTimer" === e.action
        ? (getTimerForTab(e.tabId).then(a), !0)
        : "stopActive" === e.action
          ? (stopTimerForTab(e.tabId).then(() => a({ success: !0 })), !0)
          : "resetActive" === e.action
            ? (resetTimerForTab(e.tabId).then(() => a({ success: !0 })), !0)
            : "getTimerForCurrentTab" === e.action && t.tab
              ? (getTimerForTab(t.tab.id).then(a), !0)
              : void 0,
  ),
  chrome.alarms.onAlarm.addListener(async (e) => {
    const t = parseInt(e.name.split("_")[1]),
      { timers: a = {} } = await chrome.storage.local.get("timers"),
      r = a[t];
    r &&
      r.running &&
      (chrome.tabs.reload(t, { bypassCache: r.hardRefresh }, () => {
        chrome.runtime.lastError && stopTimerForTab(t);
      }),
      r.timesRefreshed++,
      r.refreshTimes > 0 && r.timesRefreshed >= r.refreshTimes
        ? ((r.running = !1), chrome.alarms.clear(e.name))
        : (r.isRandom &&
            (r.interval =
              Math.floor(Math.random() * (r.maxTime - r.minTime + 1)) +
              r.minTime),
          (r.startTime = Date.now()),
          scheduleAlarm(t, r.interval)),
      await chrome.storage.local.set({ timers: a }));
  }));
let badgeIntervalId = null;
function startBadgeUpdateLoop() {
  badgeIntervalId ||
    (badgeIntervalId = setInterval(async () => {
      const [e] = await chrome.tabs.query({ active: !0, currentWindow: !0 });
      if (!e) return;
      const { timers: t = {} } = await chrome.storage.local.get("timers"),
        a = t[e.id];
      if (a && a.running) {
        const e = Math.floor((Date.now() - a.startTime) / 1e3),
          t = Math.max(0, a.interval - e);
        (chrome.action.setBadgeText({ text: t > 0 ? `${t}s` : "0" }),
          chrome.action.setBadgeBackgroundColor({ color: "#3b82f6" }));
      } else chrome.action.setBadgeText({ text: "" });
      Object.values(t).some((e) => e.running) ||
        (clearInterval(badgeIntervalId), (badgeIntervalId = null));
    }, 1e3));
}
async function getTimerForTab(e) {
  const { timers: t = {} } = await chrome.storage.local.get("timers");
  return t[e] || null;
}
async function stopTimerForTab(e) {
  const { timers: t = {} } = await chrome.storage.local.get("timers");
  (t[e] &&
    ((t[e].running = !1),
    chrome.alarms.clear(`refresh_${e}`),
    await chrome.storage.local.set({ timers: t })),
    chrome.action.setBadgeText({ text: "" }));
}
async function resetTimerForTab(e) {
  const { timers: t = {} } = await chrome.storage.local.get("timers"),
    a = t[e];
  a &&
    a.running &&
    ((a.startTime = Date.now()),
    (a.timesRefreshed = 0),
    a.isRandom &&
      (a.interval =
        Math.floor(Math.random() * (a.maxTime - a.minTime + 1)) + a.minTime),
    chrome.alarms.clear(`refresh_${e}`, () => {
      scheduleAlarm(e, a.interval);
    }),
    await chrome.storage.local.set({ timers: t }),
    startBadgeUpdateLoop());
}
(chrome.tabs.onRemoved.addListener(async (e) => {
  const { timers: t = {} } = await chrome.storage.local.get("timers");
  (delete t[e],
    await chrome.storage.local.set({ timers: t }),
    chrome.alarms.clear(`refresh_${e}`));
}),
  chrome.tabs.onActivated.addListener(startBadgeUpdateLoop));
