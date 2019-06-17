<template>
  <q-page padding>
    <truck-detail :is-edit="false"></truck-detail>
  </q-page>
</template>

<script>
  import TruckDetail from './TruckDetail'

  export default {
    name: 'TruckCreate',
    components: {
      TruckDetail
    }
  }
</script>

<style>
</style>
