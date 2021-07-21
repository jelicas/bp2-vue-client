<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete prozvod "{{ product.name }}" sa šifrom
      {{ product.id }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deleteProduct">Obriši</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["product"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deleteProduct() {
      console.log(this.product);
      api
        .deleteProduct(this.product.id)
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste obrisali proizvod sa šifrom " + this.product.id,
          });

          api
            .getAllProducts()
            .then((res) => {
              console.log(res);
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