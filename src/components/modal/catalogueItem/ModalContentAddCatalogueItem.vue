<template>
  <div>
    <div class="field">
      <label class="label">Šifra kataloga</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.catalogueId"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Redni broj stavke</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.itemSeqNum"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Naziv</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.name"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Cena</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.price"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Jedinica mere</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.measurementUnit"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Popust</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.discount"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Šifra fabrike</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.factoryId"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addCatalogueItem">Dodaj</button>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/api/api";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      catalogueItem: {
        catalogueId: null,
        itemSeqNum: null,
        name: null,
        price: null,
        measurementUnit: null,
        discount: null,
        factoryId: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addCatalogueItem() {
      this.transformCatalogueItem();
      api
        .addCatalogueItem({ ...this.catalogueItem })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novu stavku kataloga ",
          });

          api
            .getAllCatalogueItems()
            .then((res) => {
              this.setTableColumns(res.data.tableColumns);
              this.setTableData(res.data.tableData);
            })
            .catch(() => {});

          this.closeModal();
        })
        .catch((error) => {
          this.addNotification({
            type: "is-danger",
            message: error.response.data.message,
          });
        });
    },
    transformCatalogueItem() {
      if (this.catalogueItem.catalogueId === "") {
        this.catalogueItem.catalogueId = null;
      }
      if (this.catalogueItem.itemSeqNum === "") {
        this.catalogueItem.itemSeqNum = null;
      }
      if (this.catalogueItem.name === "") {
        this.catalogueItem.name = null;
      }
      if (this.catalogueItem.price === "") {
        this.catalogueItem.price = null;
      }
      if (this.catalogueItem.discount === "") {
        this.catalogueItem.discount = null;
      }
      if (this.catalogueItem.factoryId === "") {
        this.catalogueItem.factoryId = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>