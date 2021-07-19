<template>
  <div>
    <div class="field">
      <label class="label">Šifra zaposlenog</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="employee.idZaposlenog"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Ime</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="employee.ime"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Prezime</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="employee.prezime"
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
          v-model="employee.adresa"
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
          v-model="employee.email"
        />
      </div>

      <div class="field">
        <label class="label">Telefon</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="employee.telefon"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">JMBG</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="employee.jmbg"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Tip zaposlenog</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="employee.tipZaposlenog"
          />
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addEmployee">Dodaj</button>
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
      employee: {
        idZaposlenog: null,
        ime: null,
        prezime: null,
        adresa: null,
        email: null,
        telefon: null,
        jmbg: null,
        tipZaposlenog: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addEmployee() {
      this.transformEmployee();
      api
        .addEmployee({ ...this.employee })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novog zaposlenog ",
          });

          api
            .getAllEmployees()
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
    transformEmployee() {
      if (this.employee.ime === "") {
        this.employee.ime = null;
      }
      if (this.employee.prezime === "") {
        this.employee.prezime = null;
      }
      if (this.employee.adresa === "") {
        this.employee.adresa = null;
      }
      if (this.employee.email === "") {
        this.employee.email = null;
      }

      if (this.employee.telefon === "") {
        this.employee.telefon = null;
      }

      if (this.employee.jmbg === "") {
        this.employee.jmbg = null;
      }

      if (this.employee.tipZaposlenog === "") {
        this.employee.tipZaposlenog = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>