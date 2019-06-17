<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-9 text-h5" v-if="!this.isEdit">
                        {{$t('trucks.create')}}
                    </div>
                    <div class=" text-h5 col-9" v-if="this.isEdit">
                        {{$t('trucks.update')}}
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
                        <q-select
                                v-model="postForm.zone_id"
                                :label="$t('labels.zone')"
                                :options="selectZones"
                                :error="('zone_id' in errors)"
                                :error-message="('zone_id' in errors) ? errors.zone_id[0] : ''"
                                bottom-slots/>
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.phone"
                                :label="$t('labels.phone')"
                                :error="('phone' in errors)"
                                :error-message="('phone' in errors) ? errors.phone[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.delivery_price"
                                :label="$t('labels.delivery_price')"
                                :error="('delivery_price' in errors)"
                                :error-message="('delivery_price' in errors) ? errors.delivery_price[0] : ''"
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
          zone_id: null,
          phone: null,
          description: null,
          status_id: null,
          delivery_price: null,

        },
        loading: false,
        getTruck: null,
        errors: {}
      }
    },
    methods: {
      submitForm() {
        this.loading = true
        this.$trucks.create(this.postForm).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })

      },
      updateForm(id) {
        this.loading = true
        this.$trucks.edit(this.postForm, id).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
    },
    created() {
      if (this.isEdit) {
        this.$trucks.truck(this.$route.params.id)
      }
      this.$trucks.statuses()
      this.$trucks.zones()
    },
    watch: {
      truck(val) {
        this.postForm = val
      },
      getErrors(val) {
        this.errors = val
      },
    },
    computed: {
      hasError: {
        get() {
          return this.$store.state.trucks.errors.hasError
        }
      },
      getErrors: {
        get() {
          return this.$store.state.trucks.errors.errors
        }
      },
      truck: {
        get() {
          return this.$store.state.trucks.truck
        }
      },
      selectStatuses: {
        get() {
          return this.$store.state.trucks.statuses
        }
      },
      selectZones: {
        get() {
          return this.$store.state.trucks.zones
        }
      },
    }
  }
</script>

<style>
</style>
