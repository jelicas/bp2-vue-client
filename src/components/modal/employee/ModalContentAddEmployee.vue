<template>
  <div>
    <div class="field">
      <label class="label">Šifra zaposlenog</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="employee.id"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="employee.name"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">surname</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="employee.surname"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">address</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="employee.address"
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
        <label class="label">telephoneNumber</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="employee.telephoneNumber"
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
            v-model="employee.typeOfEmployee"
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
        id: null,
        name: null,
        surname: null,
        address: null,
        email: null,
        telephoneNumber: null,
        jmbg: null,
        typeOfEmployee: null,
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
      if (this.employee.name === "") {
        this.employee.name = null;
      }
      if (this.employee.surname === "") {
        this.employee.surname = null;
      }
      if (this.employee.address === "") {
        this.employee.address = null;
      }
      if (this.employee.email === "") {
        this.employee.email = null;
      }

      if (this.employee.telephoneNumber === "") {
        this.employee.telephoneNumber = null;
      }

      if (this.employee.jmbg === "") {
        this.employee.jmbg = null;
      }

      if (this.employee.typeOfEmployee === "") {
        this.employee.typeOfEmployee = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>