<template>
  <div>
    <div class="tabs is-boxed">
      <ul>
        <template v-for="(tab, i) in tabs">
          <li
            @click="populateDataForSelectedTab(i)"
            :class="{ 'is-active': selectedTab == i }"
            :key="i"
          >
            <a>
              <span class="icon is-small"
                ><i :class="tab.icon" aria-hidden="true"></i
              ></span>
              <span>{{ tab.name }}</span>
            </a>
          </li>
        </template>
      </ul>
    </div>

    <button class="button is-primary" @click="addRow">
      Dodaj novi {{ tabs[selectedTab].name }}
    </button>

    <Table @editRow="editRow" @deleteRow="deleteRow"></Table>
  </div>
</template>

<script>
import Table from "@/components/Table";
import { api } from "@/api/api";
import { mapMutations } from "vuex";

export default {
  props: {
    tabs: Array,
  },
  components: {
    Table,
  },
  data() {
    return {
      selectedTab: 0,
    };
  },
  created() {
    this.populateDataForSelectedTab(this.selectedTab);
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", [
      "showModal",
      "setPackage",
      "setProduct",
      "setDrug",
      "setPrice",
      "setState",
      "setSupplier",
      "setCatalogue",
      "setCatalogueItem",
      "setEmployee",
      "setItemProduct",
    ]),
    populateDataForSelectedTab(i) {
      switch (i) {
        case 0:
          api
            .getAllProducts()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 1:
          api
            .getAllDrugs()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 2:
          api
            .getAllTypesOfPackages()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 3:
          api
            .getAllPrices()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 4:
          api
            .getAllStates()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 5:
          api
            .getAllSuppliers()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 6:
          api
            .getAllEmployees()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 7:
          api
            .getAllCatalogues()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 8:
          api
            .getAllCatalogueItems()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
        case 9:
          api
            .getAllItemProducts()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});
          break;
      }

      this.selectedTab = i;
    },
    addRow() {
      switch (this.selectedTab) {
        case 0:
          this.showModal("product/ModalContentAddProduct");
          break;
        case 1:
          this.showModal("drug/ModalContentAddDrug");
          break;
        case 2:
          this.showModal("package/ModalContentAddPackage");
          break;
        case 3:
          this.showModal("price/ModalContentAddPrice");
          break;
        case 4:
          this.showModal("state/ModalContentAddState");
          break;
        case 5:
          this.showModal("supplier/ModalContentAddSupplier");
          break;
        case 6:
          this.showModal("employee/ModalContentAddEmployee");
          break;
        case 7:
          this.showModal("catalogue/ModalContentAddCatalogue");
          break;
        case 8:
          this.showModal("catalogueItem/ModalContentAddCatalogueItem");
          break;
        case 9:
          this.showModal("itemProduct/ModalContentAddItemProduct");
          break;
      }
    },
    editRow(row) {
      switch (this.selectedTab) {
        case 0:
          this.showModal("product/ModalContentEditProduct");
          this.setProduct(row);
          break;
        case 1:
          this.showModal("drug/ModalContentEditDrug");
          this.setDrug(row);
          break;
        case 2:
          this.showModal("package/ModalContentEditPackage");
          this.setPackage(row);
          break;
        case 3:
          this.showModal("price/ModalContentEditPrice");
          this.setPrice(row);
          break;
        case 4:
          this.showModal("state/ModalContentEditState");
          this.setState(row);
          break;
        case 5:
          this.showModal("supplier/ModalContentEditSupplier");
          this.setSupplier(row);
          break;
        case 6:
          this.showModal("employee/ModalContentEditEmployee");
          this.setEmployee(row);
          break;
        case 7:
          this.showModal("catalogue/ModalContentEditCatalogue");
          this.setCatalogue(row);
          break;
        case 8:
          this.showModal("catalogueItem/ModalContentEditCatalogueItem");
          this.setCatalogueItem(row);
          break;
        case 9:
          this.showModal("itemProduct/ModalContentEditItemProduct");
          this.setItemProduct(row);
          break;
      }
    },
    deleteRow(row) {
      switch (this.selectedTab) {
        case 0:
          this.showModal("product/ModalContentDeleteProduct");
          this.setProduct(row);
          break;
        case 1:
          this.showModal("drug/ModalContentDeleteDrug");
          this.setDrug(row);
          break;
        case 2:
          this.showModal("package/ModalContentDeletePackage");
          this.setPackage(row);
          break;
        case 3:
          this.showModal("price/ModalContentDeletePrice");
          this.setPrice(row);
          break;
        case 4:
          this.showModal("state/ModalContentDeleteState");
          this.setState(row);
          break;
        case 5:
          this.showModal("supplier/ModalContentDeleteSupplier");
          this.setSupplier(row);
          break;
        case 6:
          this.showModal("employee/ModalContentDeleteEmployee");
          this.setEmployee(row);
          break;
        case 7:
          this.showModal("catalogue/ModalContentDeleteCatalogue");
          this.setCatalogue(row);
          break;
        case 8:
          this.showModal("catalogueItem/ModalContentDeleteCatalogueItem");
          this.setCatalogueItem(row);
          break;
        case 9:
          this.showModal("itemProduct/ModalContentDeleteItemProduct");
          this.setItemProduct(row);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
