<template>
  <q-page padding>
    <q-table
            :data="zones"
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
          {{$t('zones.zones')}}
        </div>
      </template>
      <template slot="top-right" slot-scope="props">
        <div>
          <q-btn
                  to="/zones/create"
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
              <q-item clickable @click.native="editZone(props.row.id)">
                <q-item-section avatar color="secondary" icon="edit">
                  <q-icon name="edit"/>
                </q-item-section>
                <q-item-section color="negative">
                  <q-item-label>{{$t('general.edit')}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list link>
              <q-item clickable @click.native="deleteZone(props.row.id)">
                <q-item-section avatar color="secondary" icon="delete">
                  <q-icon name="edit"/>
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
    name: 'Zones',
    data() {
      return {
        loading: true,
        columns: [
          {name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left'},
          {name: 'name', field: 'name', label: this.$t('tables.name'), align: 'left', sortable: true},
          {name: 'status', field: row => row.status.name, label:this.$t('tables.status'), align: 'left'},
          {name: 'updated_at', field: row => row.jalaali_updated_at, label: 'ساخته شده در', align: 'left'},
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
      editZone: function (id) {
        this.$router.push({path: 'zones/edit/' + id})
      },
      deleteZone(id) {
        this.$q.dialog({
          title: this.$t('zones.delete_zone_title'),
          message: this.$t('general.delete_item_message'),
          ok: this.$lan.t('general.yes'),
          cancel: this.$t('general.no'),
        }).onOk(() => {
          this.$zones.delete(id)
        })
      },
      request({pagination, filter}) {
        this.loading = true
        this.$zones.getZones(pagination, filter).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    computed: {
      pagination: {
        get() {
          return this.$store.state.zones.paginate
        },
        set(valUse) {

        }
      },
      zones: {
        get() {
          return this.$store.state.zones.zones
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
