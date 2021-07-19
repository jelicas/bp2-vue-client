<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete stanje proizvoda {{ state.idProizvoda }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deleteState">Obriši</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["state"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deleteState() {
      api
        .deleteState(this.state.idProizvoda, {
          datumPromene: this.state.datumPromene,
          idSkladisneJedinice: this.state.idSkladisneJedinice,
        })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste obrisali stanje proizvoda sa šifrom " +
              this.state.idProizvoda,
          });

          api
            .getAllPrices()
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