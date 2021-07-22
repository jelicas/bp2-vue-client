<template>
  <div class="modal-container--supplier">
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
          v-model="supplier.name"
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
          v-model="supplier.address"
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
          v-model="supplier.nationalId"
        />
      </div>
    </div>

    <div style="display: flex">
      <div class="field">
        <label class="label">Ime banke</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="supplier.bankName"
          />
        </div>
      </div>

      <div class="field" style="margin-left: auto">
        <label class="label">Broj računa</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Text input"
            v-model="supplier.bankAccountNumber"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Broj telefona</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          v-model="supplier.telephoneNumber"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="addSupplier">Dodaj</button>
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
      supplier: {
        pib: null,
        name: null,
        address: null,
        email: null,
        nationalId: null,
        bankName: null,
        bankAccountNumber: null,
        telephoneNumber: null,
      },
    };
  },
  methods: {
    ...mapMutations("table", ["setTableData", "setTableColumns"]),
    ...mapMutations("modal", ["closeModal"]),
    ...mapMutations("notification", ["addNotification"]),
    addSupplier() {
      this.transformSupplier();
      api
        .addSupplier({ ...this.supplier })
        .then(() => {
          this.addNotification({
            type: "is-success",
            message: "Uspešno ste uneli novog dobavljaca ",
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
      if (this.supplier.pib === "") {
        this.supplier.pib = null;
      }
      if (this.supplier.name === "") {
        this.supplier.name = null;
      }
      if (this.supplier.address === "") {
        this.supplier.address = null;
      }
      if (this.supplier.nationalId === "") {
        this.supplier.nationalId = null;
      }
      if (this.supplier.email === "") {
        this.supplier.email = null;
      }
      if (this.supplier.bankName === "") {
        this.supplier.bankName = null;
      }
      if (this.supplier.bankAccountNumber === "") {
        this.supplier.bankAccountNumber = null;
      }
      if (this.supplier.telephoneNumber === "") {
        this.supplier.telephoneNumber = null;
      }
    },
  },
};
</script>

<style lang="scss">
.modal-container {
  width: 600px !important;
}
</style>