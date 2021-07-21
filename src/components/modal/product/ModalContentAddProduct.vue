<template>
  <div>
    <div class="field">
      <label class="label">Šifra</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="product.id"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Naziv</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="product.name"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Trenutna cena</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="product.currentPrice"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Količina</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="product.amount"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Naziv tipa pakovanja</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="product.packageType"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Šifra fabrike</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="product.factoryId"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addProduct">Dodaj</button>
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
      product: {
        id: null,
        name: null,
        currentPrice: null,
        amount: null,
        packageType: null,
        factoryId: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addProduct() {
      this.transformProduct();
      api
        .addProduct({ ...this.product })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novi proizvod ",
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
    transformProduct() {
      if (this.product.id === "") {
        this.product.id = null;
      }
      if (this.product.name === "") {
        this.product.name = null;
      }
      if (this.product.currentPrice === "") {
        this.product.currentPrice = null;
      }
      if (this.product.amount === "") {
        this.product.amount = null;
      }
      if (this.product.packageType === "") {
        this.product.packageType = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>