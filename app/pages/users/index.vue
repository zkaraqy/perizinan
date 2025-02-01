<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1>User Page</h1>
      <NuxtLink to="/users/form" class="btn btn-primary h-100">
        Tambah User
      </NuxtLink>
    </div>
    <div class="col-md-12">
      <DataGrid :headers="headers" sort-by="username" sort-type="asc" url-fetch="/api/users">
        <template #item-role="{ role }: { role: 1 | 2 }">
          <span class="badge" :class="UserType.roleList[role] === 'Administrator' ? 'bg-success' : 'bg-info'">{{
            UserType.roleList[role] }}</span>
        </template>
        <template #item-createdAt="{ createdAt }: { createdAt: string }">
          <span>{{ formatISODate(createdAt) }}</span>
        </template>
        <template #item-id="{ id }">
          <button class="btn btn-danger">Hapus</button>
          <button class="btn btn-info mx-1">Detail</button>
        </template>
      </DataGrid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Header } from 'vue3-easy-data-table';
import { UserType } from '~~/types/user';

const headers: Header[] = [
  { text: "Username", value: "username", sortable: true },
  { text: "Role", value: "role", sortable: true },
  { text: "Tanggal Terdaftar", value: "createdAt", sortable: true },
  { text: "Aksi", value: "id" },
];
</script>

<style></style>