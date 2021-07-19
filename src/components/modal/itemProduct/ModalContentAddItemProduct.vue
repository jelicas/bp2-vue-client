<template>
  <div>
    <div class="field">
      <label class="label">Šifra kataloga</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="itemProduct.idKataloga"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Redni broj stavke</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="itemProduct.rbStavke"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Šifra proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="itemProduct.idProizvoda"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addItemProduct">Dodaj</button>
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
      itemProduct: {
        idKataloga: null,
        rbStavke: null,
        idProizvoda: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addItemProduct() {
      this.transformItemProduct();
      api
        .addItemProduct({ ...this.itemProduct })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novu vezu stavke kataloga i proizvoda ",
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
    transformItemProduct() {
      if (this.itemProduct.idKataloga === "") {
        this.itemProduct.idKataloga = null;
      }
      if (this.itemProduct.rbStavke === "") {
        this.itemProduct.rbStavke = null;
      }
      if (this.itemProduct.idProizvoda === "") {
        this.itemProduct.idProizvoda = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>