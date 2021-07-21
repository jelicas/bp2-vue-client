<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete vrstu pakovanja "{{ packageType.name }}"
      sa šifrom {{ packageType.id }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deletePackage">Obriši</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["packageType"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deletePackage() {
      api
        .deletePackage(this.packageType.id)
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste obrisali tip pakovanja sa šifrom " +
              this.packageType.id,
          });

          api
            .getAllTypesOfPackages()
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