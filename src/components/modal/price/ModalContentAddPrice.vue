<template>
  <div>
    <div class="field">
      <label class="label">Šifra proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="price.productId"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">price proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="price.price"
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
          v-model="price.dateOfChanf"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addPrice">Dodaj</button>
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
      price: {
        productId: null,
        dateOfChange: null,
        price: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addPrice() {
      this.transformPrice();
      api
        .addPrice({ ...this.price })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novu cenu ",
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
    transformPrice() {
      if (this.price.productId === "") {
        this.price.productId = null;
      }
      if (this.price.dateOfChange === "") {
        this.price.dateOfChange = null;
      }
      if (this.price.price === "") {
        this.price.price = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>