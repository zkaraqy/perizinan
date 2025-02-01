<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1>Pegawai Page</h1>
      <NuxtLink to="/pegawai/form" class="btn btn-primary h-100">
        Tambah Pegawai
      </NuxtLink>
    </div>
    <div class="mt-2 col-md-12">
      <DataGrid :headers="headers" sort-by="nama" sort-type="asc" url-fetch="/api/pegawai">
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

const headers: Header[] = [
  { text: "Nama", value: "nama", sortable: true },
  { text: "Jenis kelamin", value: "jenisKelamin", sortable: true },
  { text: "Tanggal Terdaftar", value: "createdAt", sortable: true },
  { text: "Aksi", value: "id" },
];
</script>

<style>

</style>