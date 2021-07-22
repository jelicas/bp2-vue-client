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
      <label class="label">Cena proizvoda</label>
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
          v-model="price.dateOfChange"
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
      productId: null,
      dateOfChange: null,
    };
  },
  created() {
    this.productId = this.price.productId;
    this.dateOfChange = this.price.dateOfChange;
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
        .editPrice(this.productId, {
          dateOfChange: this.dateOfChange,
          price: this.price.price,
        })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste izmenili cenu proizvoda sa šifrom " + this.productId,
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