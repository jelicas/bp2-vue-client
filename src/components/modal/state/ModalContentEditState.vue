<template>
  <div>
    <div class="field">
      <label class="label">Šifra proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="state.productId"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Šifra skladišta</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="state.warehouseId"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Količina proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="state.amount"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Datum promene</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="state.dateOfChange"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="editState">Izmeni</button>
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
      productId: null,
      warehouseId: null,
    };
  },
  created() {
    this.id = this.state.productId;
    this.warehouseId = this.state.warehouseId;
    this.dateOfChange = this.state.dateOfChange;
  },
  computed: {
    ...mapState("modal", ["state"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editState() {
      this.transformState();
      api
        .editState(this.id, {
          warehouseId: this.warehouseId,
          dateOfChange: this.dateOfChange,
        })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message:
              "Uspešno ste izmenili stanje proizvoda sa šifrom " + this.id,
          });

          api
            .getAllStates()
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
    transformState() {
      if (this.price.productId === "") {
        this.price.productId = null;
      }
      if (this.price.warehouseId === "") {
        this.price.warehouseId = null;
      }
      if (this.price.dateOfChange === "") {
        this.price.dateOfChange = null;
      }
      if (this.price.amount === "") {
        this.price.amount = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>