<template>
  <div>
    <div class="field">
      <label class="label">Šifra</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogue.id"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">date</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogue.date"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Redni broj</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogue.catalogueSeqNum"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Šifra dobavljača</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogue.supplierId"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addCatalogue">Dodaj</button>
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
      catalogue: {
        id: null,
        date: null,
        catalogueSeqNum: null,
        supplierId: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addCatalogue() {
      this.transformEmptyFieldsToNull();
      api
        .addCatalogue({ ...this.catalogue })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novi katalog ",
          });

          api
            .getAllCatalogues()
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
    transformEmptyFieldsToNull() {
      if (this.catalogue.date === "") {
        this.catalogue.date = null;
      }
      if (this.catalogue.catalogueSeqNum === "") {
        this.catalogue.catalogueSeqNum = null;
      }
      if (this.catalogue.supplierId === "") {
        this.catalogue.supplierId = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>