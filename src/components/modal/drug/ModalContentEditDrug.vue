<template>
  <div>
    <div class="field">
      <label class="label">Šifra</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="drug.id"
          readonly
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Doza</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="drug.dosePerPackage"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Broj komada</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="drug.piecesPerPackage"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">JKL</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="drug.jkl"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Šifra tipa pakovanja</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="drug.packageId"
        />
      </div>

      <div class="field">
        <label class="label">Šifra jedinice mere</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="drug.measurementUnitId"
          />
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="editDrug">Izmeni</button>
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
    this.id = this.drug.id;
  },
  computed: {
    ...mapState("modal", ["drug"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editDrug() {
      this.setToNullEmptyDrugFields();
      api
        .editDrug(this.id, { ...this.drug })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili lek sa šifrom " + this.id,
          });

          api
            .getAllDrugs()
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
    setToNullEmptyDrugFields() {
      if (this.drug.dosePerPackage === "") {
        this.drug.dosePerPackage = null;
      }
      if (this.drug.id === "") {
        this.drug.id = null;
      }
      if (this.drug.piecesPerPackage === "") {
        this.drug.piecesPerPackage = null;
      }
      if (this.drug.jkl === "") {
        this.drug.jkl = null;
      }

      if (this.drug.measurementUnitId === "") {
        this.drug.measurementUnitId = null;
      }

      if (this.drug.packageId === "") {
        this.drug.packageId = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>