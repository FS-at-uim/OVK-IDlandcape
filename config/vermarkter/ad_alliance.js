if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "ad_alliance",
  name: "Ad Alliance",
  description: "Vermarkter von RTL Deutschland, Gruner + Jahr etc.",
  supportedInventoryTypes: [
    { type: "desktop", coverage: 30 },
    { type: "mobile", coverage: 30 },
    { type: "ctv", coverage: 30 }
  ],
  supportedIds: [
    { id: "utiq", coverage: 30 },
    { id: "netid_utiq", coverage: 30 }
  ]
});
