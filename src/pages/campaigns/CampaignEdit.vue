<template>
  <q-page padding>
    <campaign-detail :is-edit="true"></campaign-detail>
  </q-page>
</template>

<script>
  import CampaignDetail from './CampaignDetail'

  export default {
    name: 'CampaignEdit',
    components: {
      CampaignDetail
    }
  }
</script>

<style>
</style>
