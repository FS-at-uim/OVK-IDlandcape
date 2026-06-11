if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "seven_one_media",
  name: "Seven.One Media",
  description: "Vermarkter der ProSiebenSat.1 Media SE.",
  publishers: [
    { id: "prosieben", name: "ProSieben.de", supportedInventoryTypes: ["desktop", "mobile", "ctv"], supportedIds: ["utiq", "netid_utiq"] },
    { id: "sat1", name: "Sat1.de", supportedInventoryTypes: ["desktop", "mobile", "ctv"], supportedIds: ["utiq", "netid_utiq"] },
    { id: "joyn", name: "Joyn.de", supportedInventoryTypes: ["desktop", "mobile", "app", "ctv"], supportedIds: ["utiq", "netid_utiq"] }
  ]
});
