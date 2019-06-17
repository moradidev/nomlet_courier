<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-9 text-h5">
                        {{$t('message.create')}}
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
                                v-model="postForm.message"
                                :label="$t('general.message')"
                                :error="('message' in errors)"
                                :error-message="('message' in errors) ? errors.message[0] : ''"
                                bottom-slots
                                autogrow
                        />
                    </div>
                    <div class="col-12">
                        <q-select
                                v-model="postForm.send_to"
                                :label="$t('general.send_to')"
                                :options="selectSenders"
                                :error="('send_to' in errors)"
                                :error-message="('send_to' in errors) ? errors.send_to[0] : ''"
                                emit-value
                                map-options
                                bottom-slots/>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions>
                <q-btn
                        :loading="loading"
                        color="positive"
                        :label="$t('buttons.submit')"
                        @click.native="submitForm"
                >
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
  export default {
    name: 'MessageCreate',
    data() {
      return {
        postForm: {
          title: null,
          message: null,
          send_to: null,
        },
        loading: false,
        getTaxonomy: null,
        errors: {},
        selectSenders: [
          {
            label: 'همه کاربران',
            value: 'all_users'
          }
        ]
      }
    },
    methods: {
      submitForm() {
        this.loading = true
        this.$messages.create(this.postForm).then(() => {
          this.loading = false
          this.$router.push('/messages')
        }).catch(() => {
          this.loading = false
        })

      },
    },
    created() {
    },
    watch: {
      getErrors(val) {
        this.errors = val
      },
    },
    computed: {
      hasError: {
        get() {
          return this.$store.state.messages.errors.hasError
        }
      },
      getErrors: {
        get() {
          return this.$store.state.messages.errors.errors
        }
      },
    }
  }
</script>

<style>
</style>
