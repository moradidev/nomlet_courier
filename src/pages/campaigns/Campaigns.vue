<template>
  <q-page padding>
    <q-table
            :data="campaigns"
            :columns="columns"
            row-key="id"
            ref="table"
            color="primary"
            :class="tableClass"
            :dark="dark"
            :pagination.sync="pagination"
            :loading="loading"
            :rows-per-page-options="pagination.options"
            binary-state-sort
            @request="request"
    >
      <template slot="top-left" slot-scope="props">
        <div class="text-h5">
          {{$t('campaigns.campaigns')}}
        </div>
      </template>
      <template slot="top-right" slot-scope="props">
        <div>
          <q-btn
                  @click.native="$router.push({path:'/campaigns/create'})"
                  rounded
                  round
                  color="positive"
                  icon="add"
          ></q-btn>
        </div>
      </template>
      <q-td slot="body-cell-action" slot-scope="props" :props="props">
        <q-btn flat
               round
               rounded
               dense
               icon="more_vert"
        >
          <q-menu>
            <q-list link>
              <q-item clickable @click.native="editCampaign(props.row.id)">
                <q-item-section avatar color="primary" icon="edit">
                  <q-icon name="edit"/>
                </q-item-section>
                <q-item-section color="secondary">
                  <q-item-label>{{$t('general.edit')}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable @click.native="deleteCampaign(props.row.id)">
                <q-item-section avatar color="negative" icon="edit">
                  <q-icon name="delete"/>
                </q-item-section>
                <q-item-section color="negative">
                  <q-item-label>{{$t('general.delete')}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
  export default {
    name: 'Campaigns',
    data() {
      return {
        loading: true,
        columns: [
          {name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left'},
          {name: 'name', field: 'title', label: this.$t('tables.name'), align: 'left'},
          {name: 'status', field: row => row.status.name, label:this.$t('tables.status'), align: 'left'},
          {name: 'expire_at', field: row => row.jalaali_expire_at, label: this.$t('tables.expire_at'), align: 'left'},
          {name: 'action', field: 'action', label: '', align: 'left'},
        ],
        serverData:[],
        dark: false
      }

    },
    created() {
      this.request({pagination: this.pagination, filter: this.filter})
    },
    methods: {
      editCampaign: function (id) {
        this.$router.push({path: 'campaigns/edit/' + id})
      },
      deleteCampaign(id) {
        this.$q.dialog({
          title: this.$t('campaigns .delete_campaign_title'),
          message: this.$t('general.delete_item_message'),
          ok: this.$t('general.yes'),
          cancel: this.$t('general.no')
        }).onOk(() => {
          this.$campaigns.delete(id)
        }).onCancel(() => {

        })
      },
      request({pagination, filter}) {
        this.loading = true
        this.$campaigns.getCampaigns(pagination, filter).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    computed: {
      pagination: {
        get() {
          return this.$store.state.campaigns.paginate
        },
        set(valUse) {

        }
      },
      campaigns:{
        get() {
          return this.$store.state.campaigns.campaigns
        }
      },
      tableClass() {
        if (this.dark) {
          return 'bg-black'
        }
      }
    }
  }
</script>
