<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-9 text-h5" v-if="!this.isEdit">
            {{$t('couriers.create')}}
          </div>
          <div class=" text-h5 col-9" v-if="this.isEdit">
            {{$t('couriers.update')}}
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
                    type="number"
                    v-model="postForm.national_code"
                    :label="$t('general.national_code')"
                    :error="('national_code' in errors)"
                    :error-message="('national_code' in errors) ? errors.national_code[0] : ''"
                    bottom-slots
            />
          </div>
          <div class="col-12">
            <q-input
                    type="number"
                    v-model="postForm.phone"
                    :label="$t('general.phone')"
                    :error="('phone' in errors)"
                    :error-message="('phone' in errors) ? errors.phone[0] : ''"
                    bottom-slots
            />
          </div>
          <div class="col-12">
            <q-input
                    v-model="postForm.license_plate_number"
                    :label="$t('general.license_plate_number')"
                    :error="('license_plate_number' in errors)"
                    :error-message="('license_plate_number' in errors) ? errors.license_plate_number[0] : ''"
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
    name: 'CourierDetail',
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
          national_code: null,
          phone: null,
          license_plate_number: null,
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
        this.$couriers.create(this.postForm).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })

      },
      updateForm(id) {
        this.loading = true
        this.$couriers.edit(this.postForm, id).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
    },
    created() {
      if (this.isEdit) {
        this.$couriers.courier(this.$route.params.id)
      }
      this.$couriers.statuses()
    },
    watch: {
      courier(val) {
        this.postForm = val
      },
      getErrors(val) {
        this.errors = val
      },
    },
    computed: {
      hasError: {
        get() {
          return this.$store.state.couriers.errors.hasError
        }
      },
      getErrors: {
        get() {
          return this.$store.state.couriers.errors.errors
        }
      },
      courier: {
        get() {
          return this.$store.state.couriers.courier
        }
      },
      selectStatuses: {
        get() {
          return this.$store.state.couriers.statuses
        }
      },
    }
  }
</script>

<style>
</style>
