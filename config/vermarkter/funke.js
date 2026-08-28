if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "funke",
  name: "FUNKE Digital GmbH",
  description: "Vermarkter der Portale der FUNKE Mediengruppennnn",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq",
          excludedDSPs: []
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq",
          excludedDSPs: []
        }
      ]
    }
  ],
  supportedSSPs: [
    "equativ",
    "pubmatic",
    "index_exchange",
    "magnite",
    "xandr",
    "yieldlab",
    "smartclip",
    "adform"
  ]
});