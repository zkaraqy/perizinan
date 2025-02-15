<template>
  <section class="row g-4">
    <div class="card card-primary card-outline mb-4">
      <!--begin::Header-->
      <div class="card-header">
        <div class="card-title">Form User</div>
      </div>
      <!--end::Header-->
      <!--begin::Form-->
      <form>
        <!--begin::Body-->
        <div class="card-body">
          <FormInput v-model="user.fullName" :invalid-feedback="validation.fullName" :label="'Full Name'" />
          <FormInput v-model="user.username" :invalid-feedback="validation.username" :label="'Username'" />
          <FormInput v-if="!$route.params.id" v-model="user.password" type="password" :invalid-feedback="validation.password" :label="'Password'" />
          <FormInput v-if="!$route.params.id" v-model="user.confirmPassword" type="password" :invalid-feedback="validation.confirmPassword" :label="'Konfirmasi Password'" />
          <!-- <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="user.password" type="password" class="form-control"
              :class="{ 'is-invalid': validation.password }" id="exampleInputPassword1" />
            <div id="exampleInputEmail1" class="invalid-feedback">
              {{ validation.password }}
            </div>
          </div> -->
          <!-- <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Konfirmasi Password</label>
            <input v-model="user.confirmPassword" type="password" class="form-control"
              :class="{ 'is-invalid': validation.confirmPassword }" id="exampleInputPassword2" />
            <div id="exampleInputEmail1" class="invalid-feedback">
              {{ validation.confirmPassword }}
            </div>
          </div> -->
          <div class="mb-3">
            <label class="form-label">Role</label>
            <select class="form-select" v-model="user.role" :class="{ 'is-invalid': validation.role }">
              <option selected disabled>Pilih role</option>
              <option v-for="(name, id) in UserType.roleList" :value="id">
                {{ name }}
              </option>
              <!-- <option selected disabled>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option> -->
            </select>
            <div class="invalid-feedback">
              {{ validation.role }}
            </div>
            <!-- <div id="exampleInputEmail1" class="invalid-feedback">
              Please provide a valid username.
            </div> -->
          </div>
        </div>
        <!--end::Body-->
        <!--begin::Footer-->
        <div class="card-footer d-flex justify-content-end gap-2" >
          <NuxtLink to="/users" class="btn btn-secondary" v-bind:disabled="isLoading">
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
  breadcrumbs: "User Form"
})

const isLoading = ref(false)

const user: Ref<{
  fullName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  role?: number;
}> = ref({})
const validation: Ref<{
  fullName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  role?: number;
}> = ref({})

const onSave = () => {
  isLoading.value = true
  validation.value = {}
  $fetch("/api/users", { method: "POST", body: user.value })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User Berhasil Ditambahkan"
      })
      user.value = {}
    })
    .catch((err) => {
      console.log(err.data)
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

onMounted(() => {
  const id = useRoute().params?.id;
  if (id) {
    isLoading.value = true
    $fetch('/api/users/' + id)
      .then((result: any) => {
        user.value = result;
      })
      .finally(() => {
        isLoading.value = false
      })
  }
})

</script>

<style></style>