const routes = [
  {
    name: "MainLayout",
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Dashboard",
        path: "/Dashboard",
        component: () => import("pages/Dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "Dashboard2",
        path: "/Dashboard2",
        component: () => import("pages/Dashboard2.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "Consumables",
        path: "/Consumables",
        component: () => import("pages/consumables/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "Warehouse",
        path: "/Warehouse",
        component: () => import("pages/warehouse/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "Equipments",
        path: "/Equipments",
        component: () => import("pages/equipments/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      // Vehicle Management
      {
        name: "Vehicles",
        path: "/Vehicles",
        component: () => import("pages/vehicles/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "RequisitionSlipLogsheet",
        path: "/RequisitionSlipLogsheet",
        component: () => import("pages/reports/RequisitionSlipLogsheet.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "RequisitionForm",
        path: "/RequisitionForm",
        component: () => import("pages/ybc/RequisitionForm.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "ReceivingReport",
        path: "/ReceivingReport",
        component: () => import("pages/ybc/ReceivingReport.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "WithdrawalSlip",
        path: "/WithdrawalSlip",
        component: () => import("pages/ybc/WithdrawalSlip.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "StockCard",
        path: "/StockCard",
        component: () => import("pages/ybc/StockCard.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "ListToolsEquipmentFacilities",
        path: "/ListToolsEquipmentFacilities",
        component: () => import("pages/ybc/ListToolsEquipmentFacilities.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "DeliveryReceipt",
        path: "/DeliveryReceipt",
        component: () => import("pages/ybc/DeliveryReceipt.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "ToolsEquipmentTransferSlip",
        path: "/ToolsEquipmentTransferSlip",
        component: () => import("pages/ybc/ToolsEquipmentTransferSlip.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "InventoryReport",
        path: "/InventoryReport",
        component: () => import("pages/ybc/InventoryReport.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "GatePass",
        path: "/GatePass",
        component: () => import("pages/ybc/GatePass.vue"),
        meta: { requiresAuth: true },
      },
      // Requisition
      {
        name: "Requisition",
        path: "/Requisition",
        component: () => import("pages/requisition/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "AddRequisitionPage",
        path: "/AddRequisitionPage",
        component: () => import("pages/requisition/AddRequisitionPage.vue"),
        meta: { requiresAuth: true },
      },
      // Delivery Receipts
      {
        name: "DeliveryReceipts",
        path: "/DeliveryReceipts",
        component: () => import("pages/deliveryreceipt/IndexPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "AddDeliveryReceiptPage",
        path: "/AddDeliveryReceiptPage",
        component: () =>
          import("pages/deliveryreceipt/AddDeliveryReceiptPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    name: "Login",
    path: "/Login",
    component: () => import("pages/login/Login.vue"),
  },
];

export default routes;
