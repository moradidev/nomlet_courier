<template>
    <q-page padding>
        <q-table
                :data="messages"
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
                    {{$t('message.messages')}}
                </div>
            </template>
            <template slot="top-right" slot-scope="props">
                <div>
                    <q-btn
                            @click.native="$router.push({path:'/messages/create'})"
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
                            <q-item clickable @click.native="deleteMessage(props.row.id)">
                                <q-item-section avatar color="secondary" icon="edit">
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
    name: 'Foods',
    data() {
      return {
        loading: true,
        columns: [
          {name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left'},
          {name: 'title', field: 'title', label: this.$t('tables.title'), align: 'left'},
          {name: 'send_to', field: 'send_to', label: this.$t('tables.send_to'), align: 'left'},
          {
            name: 'updated_at',
            field: row => row.jalaali_updated_at,
            label: this.$t('tables.updated_at'),
            align: 'left'
          },
          {name: 'action', field: 'action', label: '', align: 'left'},
        ],
        serverData: [],
        dark: false
      }

    },
    created() {
      this.request({pagination: this.pagination, filter: this.filter})
    },
    methods: {
      deleteMessage(id) {
        this.$q.dialog({
          title: this.$t('message.delete_message_title'),
          message: this.$t('general.delete_item_message'),
          ok: this.$t('general.yes'),
          cancel: this.$t('general.no')
        }).onOk(() => {
          this.$messages.delete(id)
        }).onCancel(() => {

        })
      },
      request({pagination, filter}) {
        this.loading = true
        this.$messages.getMessages(pagination, filter).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    computed: {
      pagination: {
        get() {
          return this.$store.state.messages.paginate
        },
        set(valUse) {

        }
      },
      messages: {
        get() {
          return this.$store.state.messages.messages
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
