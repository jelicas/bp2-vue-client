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
      <label class="label">name</label>
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
      <label class="label">price</label>
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
        <button class="button is-link" @click="editCatalogueItem">
          Izmeni
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";

export default {
  data() {
    return {
      id: null,
      itemSeqNum: null,
    };
  },
  created() {
    this.id = this.catalogueItem.catalogueId;
    this.itemSeqNum = this.catalogueItem.itemSeqNum;
  },
  computed: {
    ...mapState("modal", ["catalogueItem"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editCatalogueItem() {
      this.transformCatalogueItem();
      api
        .editCatalogueItem(this.id, { ...this.catalogueItem })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili katalog sa šifrom " + this.id,
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