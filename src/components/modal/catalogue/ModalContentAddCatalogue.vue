<template>
  <div>
    <div class="field">
      <label class="label">Šifra</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogue.idKataloga"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Datum</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogue.datum"
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
          v-model="catalogue.rb"
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
          v-model="catalogue.idDobavljaca"
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
        idKataloga: null,
        datum: null,
        rb: null,
        idDobavljaca: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addCatalogue() {
      this.transformCatalogue();
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
    transformCatalogue() {
      if (this.catalogue.datum === "") {
        this.catalogue.datum = null;
      }
      if (this.catalogue.rb === "") {
        this.catalogue.rb = null;
      }
      if (this.catalogue.idDobavljaca === "") {
        this.catalogue.idDobavljaca = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>