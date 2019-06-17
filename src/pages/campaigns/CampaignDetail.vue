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
                                v-model="postForm.title"
                                :label="$t('general.title')"
                                :error="('title' in errors)"
                                :error-message="('title' in errors) ? errors.title[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12">
                        <q-input
                                v-model="postForm.campaign_method"
                                :label="$t('general.campaign_method')"
                                :error="('campaign_method' in errors)"
                                :error-message="('campaign_method' in errors) ? errors.campaign_method[0] : ''"
                                bottom-slots
                        />
                    </div>
                    <div class="col-12 q-gutter-md row items-start">
                        <q-input filled v-model="postForm.expire_at">
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-date calendar="persian" v-model="date" />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>

                            <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-time v-model="time" mask="HH:mm" format24h />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
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
    name: 'CampaignDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        postForm: {
          title: null,
          campaign_method: null,
          description: null,
          expire_at: this.jalaliDatetime,
          status_id: null,
        },
        loading: false,
        date:null,
        time:'00:00',
        errors: {}
      }
    },
    methods: {
      submitForm() {
        this.loading = true
        this.$campaigns.create(this.postForm).then(() => {
          this.loading = false
          this.$router.push('/campaigns')
        }).catch(() => {
          this.loading = false
        })

      },
      updateForm(id) {
        this.loading = true
        this.$campaigns.edit(this.postForm, id).then(() => {
          this.loading = false
          this.$router.push('/campaigns')
        }).catch(() => {
          this.loading = false
        })
      },
    },
    created() {
      if (this.isEdit) {
        this.$campaigns.campaign(this.$route.params.id)
      }
      this.$campaigns.statuses()
    },
    watch: {
      campaign(val) {
        this.postForm = val
      },
      getErrors(val) {
        this.errors = val
      },
      jalaliDatetime(val){
        this.postForm.expire_at =val
      }
    },
    computed: {
      jalaliDatetime:{
        get(){
          var d = String(this.date)
          return  d.split('/').join('-')+' '+ this.time
        },
      },
      hasError: {
        get() {
          return this.$store.state.campaigns.errors.hasError
        }
      },
      getErrors: {
        get() {
          return this.$store.state.campaigns.errors.errors
        }
      },
      campaign: {
        get() {
          return this.$store.state.campaigns.campaign
        }
      },
      selectStatuses: {
        get() {
          return this.$store.state.campaigns.statuses
        }
      },
    }
  }
</script>

<style>
</style>
