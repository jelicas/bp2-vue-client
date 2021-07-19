<template>
  <div>
    <div class="field">
      <label class="label">Šifra proizvoda</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="state.idProizvoda"
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
          v-model="state.idSkladisneJedinice"
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
          v-model="state.kolicina"
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
          v-model="state.datumPromene"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addState">Dodaj</button>
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
      state: {
        idProizvoda: null,
        idSkladisneJedinice: null,
        datumPromene: null,
        kolicina: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addState() {
      this.transformState();
      api
        .addState({ ...this.state })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novu kolicinu ",
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
      if (this.price.idProizvoda === "") {
        this.price.idProizvoda = null;
      }
      if (this.price.idSkladisneJedinice === "") {
        this.price.idSkladisneJedinice = null;
      }
      if (this.price.datumPromene === "") {
        this.price.datumPromene = null;
      }
      if (this.price.kolicina === "") {
        this.price.kolicina = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>