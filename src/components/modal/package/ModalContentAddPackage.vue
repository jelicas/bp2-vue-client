<template>
  <div>
    <div class="field">
      <label class="label">Šifra</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="packageType.id"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">name tipa pakovanja</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="packageType.name"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addPackage">Dodaj</button>
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
      packageType: {
        id: null,
        name: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addPackage() {
      this.transformPackage();
      api
        .addPackage({ ...this.packageType })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novi tip pakovanja",
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
      if (this.packageType.id === "") {
        this.packageType.id = null;
      }
      if (this.packageType.name === "") {
        this.packageType.name = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>