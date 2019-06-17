<template>
  <q-page padding>
    <taxonomy-detail :is-edit="true"></taxonomy-detail>
  </q-page>
</template>

<script>
  import TaxonomyDetail from './TaxonomyDetail'

  export default {
    name: 'TaxonomyEdit',
    components: {
      TaxonomyDetail
    }
  }
</script>

<style>
</style>
