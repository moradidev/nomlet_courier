<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-9 text-h5" v-if="!this.isEdit">
                        {{$t('foods.create')}}
                    </div>
                    <div class=" text-h5 col-9" v-if="this.isEdit">
                        {{$t('foods.update')}}
                    </div>
                    <div class="col-3 text-right">
                        <q-btn
                                icon="keyboard_backspace"
                                dense
                                flat
                                color="secondary"
                                @click.native="$router.go(-1)"/>
                    </div>
                </div>
            </q-card-section>
            <q-separator inset/>
            <q-card-section>
                <div class="row q-gutter-sm">
                    <div class="col-12">
                        <q-input
                                v-model="postForm.name"
                                :label="$t('general.name')"
                                :error="('name' in errors)"
                                :error-message="('name' in errors) ? errors.name[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.slug"
                                :label="$t('general.slug')"
                                :error="('slug' in errors)"
                                :error-message="('slug' in errors) ? errors.slug[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.default_price"
                                :label="$t('general.price')"
                                :error="('default_price' in errors)"
                                :error-message="('default_price' in errors) ? errors.default_price[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.default_discount"
                                :label="$t('general.discount')"
                                :error="('default_discount' in errors)"
                                :error-message="('default_discount' in errors) ? errors.default_discount[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12 row q-gutter-sm">
                        <div class="col-6">
                            <q-uploader
                                    :url="$env.upload"
                                    method="POST"
                                    :label="$t('general.app_image')"
                                    accept=".jpg, image/*"
                                    field-name="image"
                                    :form-fields="[{name: 'dir', value: 'foods'}]"
                                    @uploaded="uploadAppImage"
                            />
                        </div>
                        <div class="col-6">
                            <q-uploader
                                    :url="$env.upload"
                                    method="POST"
                                    :label="$t('general.web_image')"
                                    accept=".jpg, image/*"
                                    field-name="image"
                                    :form-fields="[{name: 'dir', value: 'foods'}]"
                                    @uploaded="uploadWebImage"
                            />
                        </div>

                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.description"
                                :label="$t('general.description')"
                                autogrow
                        />
                    </div>
                    <div class="col-12">
                        <q-select
                                v-model="postForm.status_id"
                                :label="$t('general.status')"
                                :options="selectStatuses"
                                :error="('status_id' in errors)"
                                :error-message="('status_id' in errors) ? errors.status_id[0] : ''"
                                emit-value
                                map-options
                                bottom-slots/>
                    </div>
                    <div class="col-12">
                        <q-select
                                v-model="postForm.taxonomy_id"
                                :label="$t('general.taxonomies')"
                                :options="selectTaxonomies"
                                :error="('taxonomy_id' in errors)"
                                :error-message="('taxonomy_id' in errors) ? errors.taxonomy_id[0] : ''"
                                emit-value
                                map-options
                                bottom-slots/>
                    </div>
                    <div class="col-12">
                        <q-select
                                v-model="postForm.category_id"
                                :label="$t('general.categories')"
                                :options="selectCategories"
                                :error="('category_id' in errors)"
                                :error-message="('category_id' in errors) ? errors.category_id[0] : ''"
                                emit-value
                                map-options
                                bottom-slots/>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions>
                <q-btn
                        :loading="loading"
                        v-if="!this.isEdit"
                        color="positive"
                        :label="$t('buttons.submit')"
                        @click.native="submitForm"
                >
                </q-btn>
                <q-btn
                        :loading="loading"
                        v-if="this.isEdit"
                        color="primary"
                        @click.native="updateForm($route.params.id)"
                >
                    {{$t('buttons.update')}}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
  export default {
    name: 'CategoryDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        postForm: {
          name: null,
          slug: null,
          default_price: null,
          default_discount: 0,
          description: null,
          status_id: null,
          taxonomy_id: null,
          category_id: null,
          app_image: null,
          web_image: null
        },
        loading: false,
        getTaxonomy: null,
        errors: {}
      }
    },
    methods: {
      uploadAppImage(files) {
        var data = JSON.parse(files.xhr.response)
        this.postForm.app_image = data.data.url
        this.$q.notify({type: 'positive', message: data.message})
      },
      uploadWebImage(files) {
        var data = JSON.parse(files.xhr.response)
        this.postForm.web_image = data.data.url
        this.$q.notify({type: 'positive', message: data.message})
      },
      submitForm() {
        this.loading = true
        this.$foods.create(this.postForm).then(() => {
          this.loading = false
          this.$router.push('/foods')
        }).catch(() => {
          this.loading = false
        })

      },
      updateForm(id) {
        this.loading = true
        this.$foods.edit(this.postForm, id).then(() => {
          this.loading = false
          this.$router.push('/foods')
        }).catch(() => {
          this.loading = false
        })
      },
    },
    created() {
      if (this.isEdit) {
        this.$foods.food(this.$route.params.id)
      }
      this.$foods.statuses()
      this.$foods.taxonomies()
      this.$foods.categories()
    },
    watch: {
      food(val) {
        this.postForm = val
      },
      getErrors(val) {
        this.errors = val
      },
    },
    computed: {
      hasError: {
        get() {
          return this.$store.state.foods.errors.hasError
        }
      },
      getErrors: {
        get() {
          return this.$store.state.foods.errors.errors
        }
      },
      food: {
        get() {
          return this.$store.state.foods.food
        }
      },
      selectStatuses: {
        get() {
          return this.$store.state.foods.statuses
        }
      },
      selectTaxonomies: {
        get() {
          return this.$store.state.foods.taxonomies
        }
      },
      selectCategories: {
        get() {
          return this.$store.state.foods.categories
        }
      },
    }
  }
</script>

<style>
</style>
