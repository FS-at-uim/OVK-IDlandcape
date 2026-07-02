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
    { type: "desktop", coverage: 90 },
    { type: "mobile", coverage: 85 },
    { type: "ctv", coverage: 50 },
    { type: "app", coverage: 70 }
  ],
  supportedIds: ["utiq", "netid_utiq"]
});
