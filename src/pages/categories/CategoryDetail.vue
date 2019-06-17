<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-9 text-h5" v-if="!this.isEdit">
            {{$t('categories.create')}}
          </div>
          <div class=" text-h5 col-9" v-if="this.isEdit">
            {{$t('categories.update')}}
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
          <div class="col-12 row q-gutter-sm">
            <div class="col-6">
              <q-uploader
                      :url="$env.upload"
                      method="POST"
                      :label="$t('general.app_banner')"
                      accept=".jpg, image/*"
                      field-name="image"
                      :form-fields="[{name: 'dir', value: 'categories'}]"
                      @uploaded="uploadAppBanner"
              />
            </div>
            <div class="col-6">
              <q-uploader
                      :url="$env.upload"
                      method="POST"
                      :label="$t('general.web_banner')"
                      accept=".jpg, image/*"
                      field-name="image"
                      :form-fields="[{name: 'dir', value: 'categories'}]"
                      @uploaded="uploadWebBanner"
              />
            </div>
            <div class="col-6">
              <q-uploader
                      :url="$env.upload"
                      method="POST"
                      :label="$t('general.app_image')"
                      accept=".jpg, image/*"
                      field-name="image"
                      :form-fields="[{name: 'dir', value: 'categories'}]"
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
                      :form-fields="[{name: 'dir', value: 'categories'}]"
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
          description: null,
          status_id: null,
          taxonomy_id: null,
          app_banner: null,
          web_banner: null,
          app_image: null,
          web_image: null

        },
        loading: false,
        getTaxonomy: null,
        errors: {}
      }
    },
    methods: {
      uploadAppBanner(files) {
        var data = JSON.parse(files.xhr.response)
        this.postForm.app_banner = data.data.url
        this.$q.notify({type:'positive',message:data.message})
      },
      uploadWebBanner(files) {
        var data = JSON.parse(files.xhr.response)
        this.postForm.web_banner = data.data.url
        this.$q.notify({type:'positive',message:data.message})
      },
      uploadAppImage(files) {
        var data = JSON.parse(files.xhr.response)
        this.postForm.app_image = data.data.url
        this.$q.notify({type:'positive',message:data.message})
      },
      uploadWebImage(files) {
        var data = JSON.parse(files.xhr.response)
        this.postForm.web_image = data.data.url
        this.$q.notify({type:'positive',message:data.message})
      },
      submitForm() {
        this.loading = true
        this.$categories.create(this.postForm).then(() => {
          this.loading = false
          this.$router.push('/categories')
        }).catch(() => {
          this.loading = false
        })

      },
      updateForm(id) {
        this.loading = true
        this.$categories.edit(this.postForm, id).then(() => {
          this.loading = false
          this.$router.push('/categories')
        }).catch(() => {
          this.loading = false
        })
      },
    },
    created() {
      if (this.isEdit) {
        this.$categories.category(this.$route.params.id)
      }
      this.$categories.statuses()
      this.$categories.taxonomies()
    },
    watch: {
      category(val) {
        this.postForm = val
      },
      getErrors(val) {
        this.errors = val
      },
    },
    computed: {
      hasError: {
        get() {
          return this.$store.state.categories.errors.hasError
        }
      },
      getErrors: {
        get() {
          return this.$store.state.categories.errors.errors
        }
      },
      category: {
        get() {
          return this.$store.state.categories.category
        }
      },
      selectStatuses: {
        get() {
          return this.$store.state.categories.statuses
        }
      },
      selectTaxonomies: {
        get() {
          return this.$store.state.categories.taxonomies
        }
      },
    }
  }
</script>

<style>
</style>
