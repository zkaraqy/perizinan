<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>Admin</b>LTE</a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to start your session</p>
        <p>{{ userStore.profile }}</p>
        <form action="../index3.html" method="post">
          <div class="input-group mb-3">
            <input v-model="credential.username" type="text" class="form-control" placeholder="Username" />
            <div class="input-group-text"><span class="bi bi-envelope"></span></div>
          </div>
          <div class="input-group mb-3">
            <input v-model="credential.password" type="password" class="form-control" placeholder="Password" />
            <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
          </div>
          <!--begin::Row-->
          <div class="row">
            <div class="col-8">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault"> Remember Me </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <div class="d-grid gap-2">
                <button type="button" @click="login" class="btn btn-primary"><i v-if="isLoading" class="bi bi-arrow-clockwise"></i> Sign In</button>
              </div>
            </div>
            <!-- /.col -->
          </div>
          <!--end::Row-->
        </form>
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import '~/assets/scss/adminlte.scss';
import '~/assets/css/bootstrap-icons.min.css';
definePageMeta({
  layout: false
})

useHead({
  bodyAttrs: {
    class: [
      "login-page bg-body-secondary"
    ]
  }
})

interface Credential {
  username: string;
  password: string;
}
const credential: Ref<Credential> = ref({
  username: "",
  password: ""
})
const isLoading = ref(false);

const userStore = useCurrentUserStore();
async function login() {
  console.log(credential.value)
  isLoading.value = true
  await userStore.authenticate(credential.value).then((res) => {
    navigateTo('/users')
  }).finally(() => {
    isLoading.value = false 
  })
}
</script>

<style lang="scss" scoped>
 @import '~/assets/scss/adminlte.scss';
 @import '~/assets/css/bootstrap-icons.min.css';
</style>