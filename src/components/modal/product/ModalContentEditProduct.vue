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
          readonly
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
          v-model="product.supplierId"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="editProduct">Izmeni</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { api } from "@/api/api";
export default {
  data() {
    return {
      id: null,
    };
  },
  created() {
    this.id = this.product.id;
    console.log(this.product);
  },
  computed: {
    ...mapState("modal", ["product"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editProduct() {
      this.transformProduct();
      api
        .editProduct(this.id, { ...this.product })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili proizvod sa šifrom " + this.id,
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
      if (this.product.supplierId === "") {
        this.product.supplierId = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>