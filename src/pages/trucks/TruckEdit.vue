<template>
  <q-page padding>
    <truck-detail :is-edit="true"></truck-detail>
  </q-page>
</template>

<script>
  import TruckDetail from './TruckDetail'

  export default {
    name: 'TruckEdit',
    components: {
      TruckDetail
    }
  }
</script>

<style>
</style>
