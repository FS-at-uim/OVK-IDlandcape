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
    { type: "desktop", coverage: 83 },
    { type: "mobile", coverage: 83 },
    { type: "app", coverage: 97 }
  ],
  supportedIds: [
    { id: "netid_utiq", coverage: 70 },
    { id: "netid", coverage: 97 }
  ]
});  
