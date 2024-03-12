import mock from "../mock"

export const searchResult = [
  {
    groupTitle: "Pages",
    searchLimit: 4,
    data: [
      {
        id: 1,
        target: "Home",
        title: "Home",
        link: "/",
        icon: "Home"
      },
      {
        id: 2,
        target: "PatientOrders",
        title: "Patient Orders",
        link: "/misc/coming-soon",
        icon: "Tablet"
      },
      {
        id: 3,
        target: "OrderAlacarte",
        title: "Order Alacarte",
        link: "/misc/coming-soon",
        icon: "Monitor"
      },
      {
        id: 4,
        target: "SummaryOrders",
        title: "Summary Orders",
        link: "/misc/coming-soon",
        icon: "List"
      },
      {
        id: 5,
        target: "checkListAnalysis",
        title: "Check List Analysis",
        link: "/misc/coming-soon",
        icon: "CheckCircle"
      },
      {
        id: 6,
        target: "SyncData",
        title: "Sync Data",
        link: "/alacate-config/sync-data",
        icon: "GitPullRequest"
      },
      {
        id: 7,
        target: "POSSettings",
        title: "POS Settings",
        link: "/misc/coming-soon",
        icon: "Settings"
      },
      {
        id: 8,
        target: "APISettings",
        title: "API Settings",
        link: "/misc/coming-soon",
        icon: "Zap"
      },
      {
        id: 9,
        target: "MenuSettings",
        title: "Menu Settings",
        link: "/alacate-config/setup-report-category",
        icon: "Circle"
      },
      {
        id: 12,
        target: "Questions",
        title: "Questions",
        link: "/alacate-config/setup-question",
        icon: "Circle"
      },
      {
        id: 13,
        target: "ForceChoices",
        title: "Force Choices",
        link: "/alacate-config/setup-forced-choice",
        icon: "Circle"
      },
      {
        id: 14,
        target: "Diets",
        title: "Diets",
        link: "/misc/coming-soon",
        icon: "List"
      },
      {
        id: 15,
        target: "Products",
        title: "Products",
        link: "/misc/coming-soon",
        icon: "Box"
      },
      {
        id: 16,
        target: "SubCategorys",
        title: "Sub Categorys",
        link: "/misc/coming-soon",
        icon: "Copy"
      },
      {
        id: 17,
        target: "MenuSettings",
        title: "Menu Settings",
        link: "/misc/coming-soon",
        icon: "Layout"
      },
      {
        id: 18,
        target: "Wards",
        title: "Wards",
        link: "/misc/coming-soon",
        icon: "Navigation"
      },
      {
        id: 19,
        target: "Rooms",
        title: "Rooms",
        link: "/misc/coming-soon",
        icon: "Menu"
      },
      {
        id: 20,
        target: "Foods",
        title: "Foods",
        link: "/misc/coming-soon",
        icon: "Droplet"
      },
      {
        id: 21,
        target: "Kitchens",
        title: "Kitchens",
        link: "/misc/coming-soon",
        icon: "Home"
      },
      {
        id: 22,
        target: "Checklists",
        title: "Check lists",
        link: "/misc/coming-soon",
        icon: "Edit"
      },
      {
        id: 23,
        target: "AccountSettings",
        title: "Account Settings",
        link: "/misc/coming-soon",
        icon: "User"
      },
      {
        id: 24,
        target: "FunctionSetting",
        title: "Function Setting",
        link: "/misc/coming-soon",
        icon: "Unlock"
      }
    ]
  }
]

mock.onGet("/api/main-search/data").reply(200, {
  searchResult
})
