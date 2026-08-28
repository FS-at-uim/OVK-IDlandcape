if (!window.OVK_LANDSCAPE_CONFIG) {
  window.OVK_LANDSCAPE_CONFIG = {};
}
if (!window.OVK_LANDSCAPE_CONFIG.vermarkter) {
  window.OVK_LANDSCAPE_CONFIG.vermarkter = [];
}

window.OVK_LANDSCAPE_CONFIG.vermarkter.push({
  id: "ad_alliance",
  name: "Ad Alliance GmbH",
  description: " Vermarkter für RTL, HBOmax, Bauer, Funke, Media Impact",
  supportedInventoryTypes: [
    {
      type: "desktop",
      supportedIds: [
        {
          id: "utiq"
        },
        {
          id: "netid_utiq",
          coverage: 30
        }
      ]
    },
    {
      type: "mobile",
      supportedIds: [
        {
          id: "utiq",
          coverage: 30
        },
        {
          id: "netid_utiq",
          coverage: 30
        }
      ]
    },
    {
      type: "ctv",
      supportedIds: [
        {
          id: "netid_utiq",
          coverage: 30
        }
      ]
    }
  ]
});