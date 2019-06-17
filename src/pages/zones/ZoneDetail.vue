<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-9 text-h5" v-if="!this.isEdit">
                        {{$t('zones.create')}}
                    </div>
                    <div class=" text-h5 col-9" v-if="this.isEdit">
                        {{$t('zones.update')}}
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
                                v-model="postForm.alias"
                                :label="$t('general.alias')"
                                :error="('alias' in errors)"
                                :error-message="('alias' in errors) ? errors.alias[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.area"
                                :label="$t('general.area')"
                                :error="('area' in errors)"
                                :error-message="('area' in errors) ? errors.area[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.description"
                                :label="$t('general.description')"
                                autogrow
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.districts"
                                :label="$t('general.districts')"
                                :error="('districts' in errors)"
                                :error-message="('districts' in errors) ? errors.districts[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-select
                                v-model="postForm.status_id"
                                :label="$t('general.status')"
                                :options="selectStatuses"
                                :error="('status_id' in errors)"
                                :error-message="('status_id' in errors) ? errors.status_id[0] : ''"
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
    name: 'ZoneDetail',
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
          alias: null,
          description: null,
          area: null,
          districts: null,
          status_id: null,

        },
        loading: false,
        getZone: null,
        errors: {}
      }
    },
    methods: {
      submitForm() {
        this.loading = true
        this.$zones.create(this.postForm).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })

      },
      updateForm(id) {
        this.loading = true
        this.$zones.edit(this.postForm, id).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
    },
    created() {
      if (this.isEdit) {
        this.$zones.zone(this.$route.params.id)
      }
      this.$zones.statuses()
    },
    watch: {
      zone(val) {
        this.postForm = val
      },
      getErrors(val) {
        this.errors = val
      },
    },
    computed: {
      hasError: {
        get() {
          return this.$store.state.zones.errors.hasError
        }
      },
      getErrors: {
        get() {
          return this.$store.state.zones.errors.errors
        }
      },
      zone: {
        get() {
          return this.$store.state.zones.zone
        }
      },
      selectStatuses: {
        get() {
          return this.$store.state.zones.statuses
        }
      },
    }
  }
</script>

<style>
</style>
