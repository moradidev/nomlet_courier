<template>
  <q-page padding>
    <campaign-detail :is-edit="false"></campaign-detail>
  </q-page>
</template>

<script>
  import CampaignDetail from './CampaignDetail'

  export default {
    name: 'CampaignCreate',
    components: {
      CampaignDetail
    }
  }
</script>

<style>
</style>
