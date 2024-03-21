import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    showCart: false
  },
  {
    type: "groupHeader",
    permissions: ["PATIENT_ORDERS","ORDER_ALACARTE"],
    groupTitle: "ORDERS"
  },
  {
    id: "patientOrders",
    title: "IPD Menu",
    type: "item",
    icon: <Icon.Tablet size={20} />,
    permissions: ["PATIENT_ORDERS"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "orderAlacart",
    title: "Alacarte Menu",
    type: "item",
    icon: <Icon.Monitor size={20} />,
    permissions: ["ORDER_ALACARTE"],
    navLink: "/orders/patient-list-alacarte",
    showCart: false
  },
  {
    type: "groupHeader",
    permissions: ["SUMMARY_ORDERS", "CHECKLIST_ANALYSIS"],
    groupTitle: "ANALYSIS"
  },
  {
    id: "sumaryOrder",
    title: "Summary Orders",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["SUMMARY_ORDERS"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "checkListAnalysis",
    title: "Check List Analysis",
    type: "item",
    icon: <Icon.CheckCircle size={20} />,
    permissions: ["CHECKLIST_ANALYSIS"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    type: "groupHeader",
    permissions: ["SYNC_DATA", "POS_SETTING", "API_SETTING", "SETUP_MENU_ALACARTE", "SETUP_QUESTION_ALACARTE", "SETUP_FORCEDCHOICES_ALACARTE"],
    groupTitle: "ALACART CONFIG"
  },
  {
    id: "syncData",
    title: "Sync Data",
    type: "item",
    icon: <Icon.GitPullRequest size={20} />,
    permissions: ["SYNC_DATA"],
    navLink: "/alacate-config/sync-data",
    filterBase: "/alacate-config/sync-data",
    showCart: false
  },
  {
    id: "posSettings",
    title: "POS Settings",
    type: "item",
    icon: <Icon.Settings size={20} />,
    permissions: ["POS_SETTING"],
    navLink: "/alacate-config/pos-setting",
    showCart: false
  },
  {
    id: "apiSettings",
    title: "API Settings",
    type: "item",
    icon: <Icon.Zap size={20} />,
    permissions: ["API_SETTING"],
    navLink: "/misc/coming-soon",
    filterBase: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "menuSettings",
    title: "Menu Settings",
    type: "collapse",
    icon: <Icon.Layout size={20} />,
    permissions: ["SETUP_MENU_ALACARTE","SETUP_QUESTION_ALACARTE", "SETUP_FORCEDCHOICES_ALACARTE"],
    children: [
      {
        id: "menu",
        title: "Menu",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["SETUP_MENU_ALACARTE"],
        navLink: "/alacate-config/setup-report-category",
        showCart: false
      },
      {
        id: "questions",
        title: "Questions",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["SETUP_QUESTION_ALACARTE"],
        navLink: "/alacate-config/setup-question",
        showCart: false
      },
      {
        id: "forcedChoices",
        title: "Forced Choices",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["SETUP_FORCEDCHOICES_ALACARTE"],
        navLink: "/alacate-config/setup-forced-choice",
        showCart: false
      }
    ]
  },
  {
    type: "groupHeader",
    permissions: ["SETUP_DIET_PATIENTS", "SETUP_PRODUCT_PATIENTS", "SETUP_SUBCATEGORY_PATIENTS","SETUP_MENU_PATIENTS","SETUP_WARD", "SETUP_ROOM", "SETUP_FOOD", "SETUP_KITCHEN", "SETUP_CHECKLIST"],
    groupTitle: "PATIENTS ORDER CONFIG"
  },
  {
    id: "diets",
    title: "Diets",
    type: "item",
    icon: <Icon.List size={20} />,
    permissions: ["SETUP_DIET_PATIENTS"],
    navLink: "/misc/coming-soon",
    filterBase: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "products",
    title: "Products",
    type: "item",
    icon: <Icon.Box size={20} />,
    permissions: ["SETUP_PRODUCT_PATIENTS"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "categorys",
    title: "Categorys",
    type: "item",
    icon: <Icon.Copy size={20} />,
    permissions: ["SETUP_CATEGORY_PATIENTS"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "subCategorys",
    title: "Sub Categorys",
    type: "item",
    icon: <Icon.Copy size={20} />,
    permissions: ["SETUP_SUBCATEGORY_PATIENTS"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "foods",
    title: "Foods",
    type: "item",
    icon: <Icon.Droplet size={20} />,
    permissions: ["SETUP_FOOD"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "wards",
    title: "Wards",
    type: "item",
    icon: <Icon.Navigation size={20} />,
    permissions: ["SETUP_WARD"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "rooms",
    title: "Rooms",
    type: "item",
    icon: <Icon.Menu size={20} />,
    permissions: ["SETUP_ROOM"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "kitchens",
    title: "Kitchens",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["SETUP_KITCHEN"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "checklists",
    title: "Check lists",
    type: "item",
    icon: <Icon.Edit size={20} />,
    permissions: ["SETUP_CHECKLIST"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    type: "groupHeader",
    permissions: ["SETUP_ACCOUNT","SETUP_FUNCTION"],
    groupTitle: "OTHER"
  },
  {
    id: "accountSettings",
    title: "Account Settings",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["SETUP_ACCOUNT"],
    navLink: "/misc/coming-soon",
    showCart: false
  },
  {
    id: "functionSettings",
    title: "Function Settings",
    type: "item",
    icon: <Icon.Unlock size={20} />,
    permissions: ["SETUP_FUNCTION"],
    navLink: "/misc/coming-soon",
    showCart: false
  }
]

export default navigationConfig
