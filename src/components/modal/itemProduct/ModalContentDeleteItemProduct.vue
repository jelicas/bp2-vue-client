<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete vezu kataloga i prozvoda
      {{ itemProduct.idKataloga }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deleteItemProduct">Obriši</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["itemProduct"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deleteItemProduct() {
      api
        .deleteItemProduct(this.itemProduct.idKataloga, {
          rbStavke: this.itemProduct.rbStavke,
        })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste obrisali vezu stavke i proizvoda" +
              this.itemProduct.idKataloga,
          });

          api
            .getAllItemProducts()
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