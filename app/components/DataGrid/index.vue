<template>
  <EasyDataTable show-index :rows-items="[10, 25, 50, 100]" :headers="props.headers" :items="items"
    table-class-name="customize-table" v-model:server-options="serverOptions" :server-items-length="serverItemsLength"
    :button-pagination="true" :loading="loading">
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
  </EasyDataTable>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import type { Header, Item, ServerOptions, SortType } from "vue3-easy-data-table";
import EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const props = defineProps<{
  headers: Header[];
  sortBy: string;
  sortType: SortType;
  urlFetch: string;
}>()

const items = ref<Item[]>([]);
const loading = ref(false);
const serverItemsLength = ref(0);
const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 10,
  sortBy: props.sortBy,
  sortType: props.sortType,
});

const loadFromServer = async () => {
  loading.value = true;
  try {
    const result = await $fetch(props.urlFetch, { params: serverOptions.value }) as any;
    items.value = result.data;
    serverItemsLength.value = result.count;
  } catch (err) {
    const error = err as unknown as any
    Swal.fire({
      icon: "warning",
      text: error.data?.message ?? error.textMessage,
      title: "ERROR"
    })
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  loadFromServer();
});

watch(serverOptions, (value) => { loadFromServer(); }, { deep: true });

</script>

<style scoped>
.customize-table {
  font-family: var(--bs-body-font-family) !important;
  --easy-table-header-font-size: 16px !important;
  --easy-table-body-row-font-size: 16px !important;
  --easy-table-header-height: 64px !important;
  --easy-table-footer-height:    64px !important;
  --easy-table-body-row-height:  64px !important;
  --easy-table-footer-font-size: 16px !important;
}
</style>
