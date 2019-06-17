<template>
  <q-page padding>
    <category-detail :is-edit="true"></category-detail>
  </q-page>
</template>

<script>
  import CategoryDetail from './CategoryDetail'

  export default {
    name: 'CategoryEdit',
    components: {
      CategoryDetail
    }
  }
</script>

<style>
</style>
