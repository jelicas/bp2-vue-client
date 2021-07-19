<template>
  <div>
    <div class="field">
      <label class="label">Šifra kataloga</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.idKataloga"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Redni broj stavke</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.rbStavke"
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
          v-model="catalogueItem.naziv"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Cena</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.cena"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Jedinica mere</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.jm"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Popust</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="catalogueItem.popust"
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
          v-model="catalogueItem.idFabrike"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addCatalogueItem">Dodaj</button>
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
      catalogueItem: {
        idKataloga: null,
        rbStavke: null,
        naziv: null,
        cena: null,
        jm: null,
        popust: null,
        idFabrike: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addCatalogueItem() {
      this.transformCatalogueItem();
      api
        .addCatalogueItem({ ...this.catalogueItem })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novu stavku kataloga ",
          });

          api
            .getAllCatalogueItems()
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
    transformCatalogueItem() {
      if (this.catalogueItem.idKataloga === "") {
        this.catalogueItem.idKataloga = null;
      }
      if (this.catalogueItem.rbStavke === "") {
        this.catalogueItem.rbStavke = null;
      }
      if (this.catalogueItem.naziv === "") {
        this.catalogueItem.naziv = null;
      }
      if (this.catalogueItem.cena === "") {
        this.catalogueItem.cena = null;
      }
      if (this.catalogueItem.popust === "") {
        this.catalogueItem.popust = null;
      }
      if (this.catalogueItem.idFabrike === "") {
        this.catalogueItem.idFabrike = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>