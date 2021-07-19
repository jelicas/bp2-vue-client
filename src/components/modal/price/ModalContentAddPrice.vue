<template>
  <div>
    <div class="field">
      <label class="label">Šifra proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="price.idProizvoda"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Cena proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="price.cena"
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
          v-model="price.datumPromene"
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
        idProizvoda: null,
        datumPromene: null,
        cena: null,
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
      if (this.price.idProizvoda === "") {
        this.price.idProizvoda = null;
      }
      if (this.price.datumPromene === "") {
        this.price.datumPromene = null;
      }
      if (this.price.cena === "") {
        this.price.cena = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>