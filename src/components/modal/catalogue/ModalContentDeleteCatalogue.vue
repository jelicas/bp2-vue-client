<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete katalog sa šifrom
      {{ catalogue.idKataloga }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deleteCatalogue">Obriši</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["catalogue"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deleteCatalogue() {
      api
        .deleteCatalogue(this.catalogue.idKataloga)
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste obrisali katalog sa šifrom " +
              this.catalogue.idKataloga,
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
  },
};
</script>

<style lang="scss" scoped>
</style>