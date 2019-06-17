<template>
  <q-page padding>
    <q-table
            :data="trucks"
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
          {{$t('trucks.trucks')}}
        </div>
      </template>
      <template slot="top-right" slot-scope="props">
        <div>
          <q-btn
                  to="/trucks/create"
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
              <q-item clickable @click.native="editTruck(props.row.id)">
                <q-item-section avatar color="secondary" icon="edit">
                  <q-icon name="edit"/>
                </q-item-section>
                <q-item-section color="negative">
                  <q-item-label>{{$t('general.edit')}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list link>
              <q-item clickable @click.native="deleteTruck(props.row.id)">
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
    name: 'Trucks',
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
      editTruck: function (id) {
        this.$router.push({path: 'trucks/edit/' + id})
      },
      deleteTruck(id) {
        this.$q.dialog({
          title: this.$t('trucks.delete_truck_title'),
          message: this.$t('general.delete_item_message'),
          ok: this.$lan.t('general.yes'),
          cancel: this.$t('general.no'),
        }).onOk(() => {
          this.$trucks.delete(id)
        })
      },
      request({pagination, filter}) {
        this.loading = true
        this.$trucks.getTrucks(pagination, filter).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    computed: {
      pagination: {
        get() {
          return this.$store.state.trucks.paginate
        },
        set(valUse) {

        }
      },
      trucks: {
        get() {
          return this.$store.state.trucks.trucks
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
