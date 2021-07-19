<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete lek sa šifrom {{ drug.drugId }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deleteDrug">Obriši</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["drug"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deleteDrug() {
      api
        .deleteDrug(this.drug.drugId)
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste obrisali lek sa šifrom " + this.drug.drugId,
          });

          api
            .getAllDrugs()
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