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
        <button class="button is-link" @click="editPrice">Izmeni</button>
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
      datumPromene: null,
    };
  },
  created() {
    this.id = this.price.idProizvoda;
    this.datumPromene = this.price.datumPromene;
  },
  computed: {
    ...mapState("modal", ["price"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editPrice() {
      this.transformPrice();
      api
        .editPrice(this.id, {
          datumPromene: this.datumPromene,
          cena: this.price.cena,
        })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili cenu proizvoda sa šifrom " + this.id,
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