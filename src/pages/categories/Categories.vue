<template>
  <q-page padding>
    <q-table
            :data="categories"
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
          {{$t('categories.categories')}}
        </div>
      </template>
      <template slot="top-right" slot-scope="props">
        <div>
          <q-btn
                  @click.native="$router.push({path:'/categories/create'})"
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
              <q-item clickable @click.native="editCategory(props.row.id)">
                <q-item-section avatar color="secondary" icon="edit">
                  <q-icon name="edit"/>
                </q-item-section>
                <q-item-section color="negative">
                  <q-item-label>{{$t('general.edit')}}</q-item-label>
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
    name: 'Categories',
    data() {
      return {
        loading: true,
        columns: [
          {name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left'},
          {name: 'name', field: 'name', label: this.$t('tables.name'), align: 'left'},
          {name: 'taxonomies', field: row => row.taxonomy.name, label: this.$t('tables.taxonomies'), align: 'left'},
          {name: 'status', field: row => row.status.name, label:this.$t('tables.status'), align: 'left'},
          {name: 'updated_at', field: row => row.jalaali_updated_at, label: this.$t('tables.updated_at'), align: 'left'},
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
      editCategory: function (id) {
        this.$router.push({path: 'categories/edit/' + id})
      },
      request({pagination, filter}) {
        this.loading = true
        this.$categories.getCategories(pagination, filter).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    computed: {
      pagination: {
        get() {
          return this.$store.state.categories.paginate
        },
        set(valUse) {

        }
      },
      categories:{
        get() {
          return this.$store.state.categories.categories
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
