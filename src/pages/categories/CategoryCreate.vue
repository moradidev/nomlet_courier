<template>
  <q-page padding>
    <category-detail :is-edit="false"></category-detail>
  </q-page>
</template>

<script>
  import CategoryDetail from './CategoryDetail'

  export default {
    name: 'CategoryCreate',
    components: {
      CategoryDetail
    }
  }
</script>

<style>
</style>
