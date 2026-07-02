if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "uim",
  name: "United Internet Media",
  description: "Vermarkter für Web.de und GMX.",
  supportedInventoryTypes: [
    { type: "desktop", coverage: 100 },
    { type: "mobile", coverage: 95 },
    { type: "app", coverage: 80 }
  ],
  supportedIds: ["netid_utiq", "netid"]
});
