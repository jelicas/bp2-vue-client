<template>
  <div>
    <div class="field">
      <label class="label">Šifra dobavljača</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.id"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">PIB</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.pib"
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
          v-model="supplier.naziv"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Adresa</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.adresa"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.email"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Matični broj</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.maticniBroj"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Naziv banke</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.nazivBanke"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Broj računa</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.brojRacuna"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Telefon</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.telefon"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="editSupplier">Izmeni</button>
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
    this.id = this.supplier.id;
  },
  computed: {
    ...mapState("modal", ["supplier"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editSupplier() {
      this.transformSupplier();
      api
        .editSupplier(this.id, { ...this.supplier })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili dobavljača sa šifrom " + this.id,
          });

          api
            .getAllSuppliers()
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
    transformSupplier() {
      if (this.supplier.id === "") {
        this.supplier.id = null;
      }
      if (this.supplier.pib === "") {
        this.supplier.pib = null;
      }
      if (this.supplier.naziv === "") {
        this.supplier.naziv = null;
      }
      if (this.supplier.adresa === "") {
        this.supplier.adresa = null;
      }
      if (this.supplier.maticniBroj === "") {
        this.supplier.maticniBroj = null;
      }
      if (this.supplier.email === "") {
        this.supplier.email = null;
      }
      if (this.supplier.nazivBanke === "") {
        this.supplier.nazivBanke = null;
      }
      if (this.supplier.brojRacuna === "") {
        this.supplier.brojRacuna = null;
      }
      if (this.supplier.telefon === "") {
        this.supplier.telefon = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>