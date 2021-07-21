<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete zaposlenog sa šifrom
      {{ employee.id }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deleteEmployee">Obriši</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["employee"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deleteEmployee() {
      api
        .deleteEmployee(this.employee.id)
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste obrisali zaposlenog sa šifrom " + this.employee.id,
          });

          api
            .getAllEmployees()
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