if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "funke",
  name: "FUNKE Digital GmbH",
  description: "Vermarkter der Portale der FUNKE Mediengruppe",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq"
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq"
        }
      ]
    }
  ]
});