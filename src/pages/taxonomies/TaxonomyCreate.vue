<template>
  <q-page padding>
    <taxonomy-detail :is-edit="false"></taxonomy-detail>
  </q-page>
</template>

<script>
  import TaxonomyDetail from './TaxonomyDetail'

  export default {
    name: 'TaxonomyCreate',
    components: {
      TaxonomyDetail
    }
  }
</script>

<style>
</style>
