import mock from "../mock"
export let dataSync = [
  {
    id: 1,
    name: "Sync Categories",
    apiGet: "/api/ReportCat",
    apiPost: "/api/SyncPOSReportCats"
  },
  {
    id: 2,
    name: "Sync Products",
    apiGet: "/api/Product",
    apiPost: "/api/SyncPOSProducts"
  },
  {
    id: 3,
    name: "Sync Product Comboes",
    apiGet: "/api/ProductCombo",
    apiPost: "/api/SyncPOSProductCombos"
  },
  {
    id: 4,
    name: "Sync Questions",
    apiGet: "/api/Questions",
    apiPost: "/api/SyncPOSQuestions"
  },
  {
    id: 5,
    name: "Sync ForcedChoices",
    apiGet: "/api/ForcedChoices",
    apiPost: "/api/SyncPOSForcedChoices"
  }
]
