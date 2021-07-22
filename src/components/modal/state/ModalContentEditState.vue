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
      productId: null,
      dateOfChange: null,
      warehouseId: null,
    };
  },
  created() {
    this.productId = this.state.productId;
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
        .editState(this.productId, {
          productId: this.state.productId,
          warehouseId: this.state.warehouseId,
          dateOfChange: this.state.dateOfChange,
          amount: this.state.amount,
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
      if (this.state.productId === "") {
        this.state.productId = null;
      }
      if (this.state.warehouseId === "") {
        this.state.warehouseId = null;
      }
      if (this.state.dateOfChange === "") {
        this.state.dateOfChange = null;
      }
      if (this.state.amount === "") {
        this.state.amount = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>