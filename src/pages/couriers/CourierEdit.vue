<template>
  <q-page padding>
    <courier-detail :is-edit="true"></courier-detail>
  </q-page>
</template>

<script>
  import CourierDetail from './CourierDetail'

  export default {
    name: 'CourierCreate',
    components: {
      CourierDetail
    }
  }
</script>

<style>
</style>
