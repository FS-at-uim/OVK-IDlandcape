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
  publishers: [
    { id: "webde", name: "Web.de", supportedInventoryTypes: ["desktop", "mobile", "app"], supportedIds: ["netid_utiq", "netid"] },
    { id: "gmx", name: "GMX.de", supportedInventoryTypes: ["desktop", "mobile", "app"], supportedIds: ["netid_utiq", "netid"] }
  ]
});
