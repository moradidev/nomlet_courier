<template>
    <q-page padding>
        <zone-detail :is-edit="false"></zone-detail>
    </q-page>
</template>

<script>
  import ZoneDetail from './ZoneDetail'

  export default {
    name: 'ZoneCreate',
    components: {
      ZoneDetail
    }
  }
</script>

<style>
</style>
