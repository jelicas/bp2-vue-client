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
        <button class="button is-link" @click="editCatalogue">Izmeni</button>
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
    };
  },
  created() {
    this.id = this.catalogue.id;
  },
  computed: {
    ...mapState("modal", ["catalogue"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editCatalogue() {
      this.transformEmptyFieldsToNull();
      api
        .editCatalogue(this.id, { ...this.catalogue })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili katalog sa šifrom " + this.id,
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