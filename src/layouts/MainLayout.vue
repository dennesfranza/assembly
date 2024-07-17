<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title v-if="$q.platform.is.desktop">
          Young Builders Corporation
        </q-toolbar-title>
        <q-toolbar-title v-if="$q.platform.is.mobile"> YBC </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat @click="loginstore.userRefreshToken()">
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/Dashboard" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>CRM Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Consumables" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Consumables</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Warehouse" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="engineering" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Project/Site</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Vehicles" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="garage" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Vehicles</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/GatePass" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fence" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Gate Pass</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="build" label="Equipments">
          <q-item
            to="/Equipments"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Equipments List</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/EquipmentTransferSlip"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="engineering" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Equipments Transfer Slip</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/AddEquipmentTransferSlip"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="engineering" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Create Equipments Transfer Slip</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item icon="inventory" label="Reports">
          <q-item
            to="/RequisitionSlipLogsheet"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="garage" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Requisition Slip Logsheet</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/InventoryReport"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="local_shipping" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Inventory Report</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item icon="task" label="Requisition Slip">
          <q-item
            to="/Requisition"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Requisitions List</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/AddRequisitionPage"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Create Request</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item icon="local_shipping" label="Delivery Receipts">
          <q-item
            to="/DeliveryReceipts"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Delivery Receipts List</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/AddDeliveryReceiptPage"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Create Delivery Receipt</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item icon="back_hand" label="Withdrawal Slip">
          <q-item
            to="/WithdrawalSlip"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Withdrawal Slip List</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/AddWithdrawalSlipPage"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Create Withdrawal Slip</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item icon="handshake" label="Receiving Report">
          <q-item
            to="/ReceivingReport"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="list" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Receiving Report List</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/AddReceivingReportPage"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="edit" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Create Receiving Report</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>


        <!-- YBC Forms -->
        <q-expansion-item icon="menu_open" label="Forms">
          <q-item
            to="/RequisitionForm"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section avatar>
              <q-icon color="white" name="bluetooth" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Requisition Slip</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/ReceivingReport"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Recieving Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/WithdrawalSlip2"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Withdrawal Slip</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/StockCard"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Stock Card</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/ListToolsEquipmentFacilities"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>List Tools/Equipment/Facilities</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/DeliveryReceipt"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Delivery Receipt</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/ToolsEquipmentTransferSlip"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Tools/Equipment Transfer Slip</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/InventoryReport"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Inventory Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/GatePass"
            class="q-ml-xl"
            active-class="q-item-no-link-highlighting"
          >
            <q-item-section>
              <q-item-label>Gate Pass</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <!--  -->
        <q-item @click="loginstore.userLogout()" :clickable="true" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Messages from "./Messages.vue";

import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useLoginStore } from "src/stores/login/index";

export default defineComponent({
  name: "MainLayout",

  components: {
    Messages,
  },

  setup() {
    const loginstore = useLoginStore();
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();

    return {
      $q,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      loginstore
    };
  }
});
</script>

<style>
/* FONT AWESOME GENERIC BEAT */
.fa-beat {
  animation: fa-beat 5s ease infinite;
}

@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>
