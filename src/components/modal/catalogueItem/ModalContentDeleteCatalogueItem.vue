<template>
  <div>
    <div class="subtitle is-4">
      Da li sigurno želite da obrišete stavku kataloga sa šifrom
      {{ catalogueItem.catalogueId }}?
    </div>
    <div class="control">
      <button class="button is-link" @click="deleteCatalogueItem">
        Obriši
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  computed: {
    ...mapState("modal", ["catalogueItem"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    deleteCatalogueItem() {
      api
        .deleteCatalogueItem(this.catalogueItem.catalogueId, {
          itemSeqNum: this.catalogueItem.itemSeqNum,
        })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste obrisali stavku kataloga sa šifrom " +
              this.catalogueItem.catalogueId,
          });

          api
            .getAllCatalogueItems()
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