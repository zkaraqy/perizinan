<template>
  <section class="row g-4">
    <div class="card card-primary card-outline mb-4">
      <!--begin::Header-->
      <div class="card-header">
        <div class="card-title">Form Pegawai</div>
      </div>
      <!--end::Header-->
      <!--begin::Form-->
      <form>
        <!--begin::Body-->
        <div class="card-body">
          <FormInput v-model="model.nama" :invalid-feedback="validation.nama" :label="'Nama'" />
          <div class="d-flex gap-2">
            <p class="mb-0">Jenis Kelamin</p>
            <div class="d-flex gap-2">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                  value="Laki-laki" v-model="model.jenisKelamin">
                <label class="form-check-label" for="flexRadioDefault1">
                  Laki-laki
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                  value="Perempuan" v-model="model.jenisKelamin">
                <label class="form-check-label" for="flexRadioDefault2">
                  Perempuan
                </label>
              </div>
            </div>
          </div>
          <FormInput class="mt-3" v-model="model.tanggalLahir" type="date" :invalid-feedback="validation.tanggalLahir"
            :label="'Tanggal Lahir'" />

        </div>
        <!--end::Body-->
        <!--begin::Footer-->
        <div class="card-footer d-flex justify-content-end gap-2">
          <NuxtLink to="/pegawai" class="btn btn-secondary" v-bind:disabled="isLoading">
            Kembali
          </NuxtLink>
          <button @click="onSave" type="button" class="btn btn-primary" v-bind:disabled="isLoading">
            <div v-if="isLoading" class="spinner-border text-warning" role="status">
            </div>Submit
          </button>
        </div>
        <!--end::Footer-->
      </form>
      <!--end::Form-->
    </div>
  </section>
</template>

<script lang="ts" setup>

import Swal from "sweetalert2";
import { UserType } from "~~/types/user"

definePageMeta({
  breadcrumbs: "Pegawai Form"
})

const isLoading = ref(false)

const model: Ref<{
  nama?: string;
  jenisKelamin?: string;
  tanggalLahir?: string;
}> = ref({})
const validation: Ref<{
  nama?: string;
  jenisKelamin?: string;
  tanggalLahir?: string;
}> = ref({})

const onSave = () => {
  console.log(model.value);
  // return
  isLoading.value = true
  validation.value = {}
  $fetch("/api/pegawai", { method: "POST", body: model.value })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Pegawai Berhasil Ditambahkan"
      })
      model.value = {}
    })
    .catch((err) => {
      if (err.data.statusCode === 422) {
        validation.value = {}
        for (let index = 0; index < err.data.data.length; index++) {
          validation.value[err.data.data[index].path[0]] = err.data.data[index].message
        }
      } else {
        Swal.fire("Peringatan", err.data.message, "warning")
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}

</script>

<style></style>