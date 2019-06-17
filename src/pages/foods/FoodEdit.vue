<template>
  <q-page padding>
    <food-detail :is-edit="true"></food-detail>
  </q-page>
</template>

<script>
  import FoodDetail from './FoodDetail'

  export default {
    name: 'FoodEdit',
    components: {
      FoodDetail
    }
  }
</script>

<style>
</style>
