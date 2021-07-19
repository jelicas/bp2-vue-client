<template>
  <div>
    <div class="field">
      <label class="label">Šifra</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="product.idProizvoda"
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
          v-model="product.nazivProizvoda"
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
          v-model="product.trenutnaCena"
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
          v-model="product.kolicina"
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
          v-model="product.nazivTipaPakovanja"
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
          v-model="product.idFabrike"
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
        idProizvoda: null,
        nazivProizvoda: null,
        trenutnaCena: null,
        kolicina: null,
        nazivTipaPakovanja: null,
        idFabrike: null,
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
      if (this.product.idProizvoda === "") {
        this.product.idProizvoda = null;
      }
      if (this.product.nazivProizvoda === "") {
        this.product.nazivProizvoda = null;
      }
      if (this.product.trenutnaCena === "") {
        this.product.trenutnaCena = null;
      }
      if (this.product.kolicina === "") {
        this.product.kolicina = null;
      }
      if (this.product.nazivTipaPakovanja === "") {
        this.product.nazivTipaPakovanja = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>