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
        <button class="button is-link" @click="editEmployee">Izmeni</button>
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
    this.id = this.employee.idZaposlenog;
  },
  computed: {
    ...mapState("modal", ["employee"]),
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    editEmployee() {
      this.transformEmployee();
      api
        .editEmployee(this.id, { ...this.employee })
        .then((res) => {
          console.log(res);
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste izmenili lek sa šifrom " + this.id,
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