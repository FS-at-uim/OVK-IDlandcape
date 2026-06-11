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
  publishers: [
    { id: "rtl", name: "RTL.de", supportedInventoryTypes: ["desktop", "mobile", "ctv"], supportedIds: ["UTIQ", "netID_Utiq"] },
    { id: "ntv", name: "n-tv.de", supportedInventoryTypes: ["desktop", "mobile", "ctv"], supportedIds: ["utiq", "netid_utiq"] },
    { id: "stern", name: "stern.de", supportedInventoryTypes: ["desktop", "mobile", "app"], supportedIds: ["utiq", "netid_utiq"] }
  ]
});
