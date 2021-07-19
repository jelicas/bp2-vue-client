<template>
  <div>
    <div class="field">
      <label class="label">Šifra</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="packageType.idTipaPakovanja"
          readonly
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
          v-model="packageType.nazivTipaPakovanja"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="editPackage">Izmeni</button>
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
    this.id = this.packageType.idTipaPakovanja;
  },
  computed: {
    ...mapState("modal", ["packageType"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editPackage() {
      this.transformPackage();
      api
        .editPackage(this.id, { ...this.packageType })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili tip pakovanja sa šifrom " + this.id,
          });

          api
            .getAllTypesOfPackages()
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
    transformPackage() {
      if (this.packageType.idTipaPakovanja === "") {
        this.packageType.idTipaPakovanja = null;
      }
      if (this.packageType.nazivTipaPakovanja === "") {
        this.packageType.nazivTipaPakovanja = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>