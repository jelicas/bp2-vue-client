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
        <button class="button is-link" @click="addDrug">Dodaj</button>
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
      drug: {
        id: null,
        dosePerPackage: null,
        piecesPerPackage: null,
        jkl: null,
        measurementUnitId: null,
        packageId: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addDrug() {
      this.setToNullEmptyDrugFields();
      api
        .addDrug({ ...this.drug })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novi lek ",
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