<template>
  <q-page padding>
    <food-detail :is-edit="false"></food-detail>
  </q-page>
</template>

<script>
  import FoodDetail from './FoodDetail'

  export default {
    name: 'FoodCreate',
    components: {
      FoodDetail
    }
  }
</script>

<style>
</style>
