<template>
    <div class="row justify-center">
        <div class="col-md-6 col-sm-8 col-xs-12">
            <q-page padding class="flex flex-center">
                <q-card square class="card-85" text-color="gray">
                    <q-card-section>
                        <div class="text-h6">
                            {{ $t('general.login')}}
                        </div>
                    </q-card-section>
                    <q-card-section>

                        <q-input

                                :label="$t('labels.email')"
                                type="email"
                                v-model="login.body.email"
                        >
                            <template v-slot:append>
                                <q-icon name="email"/>
                            </template>
                        </q-input>
                        <q-input
                                :label="$t('labels.password')"
                                type="password"
                                v-model="login.body.password"
                                :type="isPwd ? 'password' : 'text'"
                        >
                            <template v-slot:append>
                                <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>
                    </q-card-section>
                    <q-card-actions align="center">
                        <q-btn :loading="loading" color="primary" @click="loginForm" flat :label="$t('buttons.login')"/>
                    </q-card-actions>
                </q-card>
            </q-page>
        </div>
    </div>
</template>

<style>
</style>

<script>
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: 'PageLogin',
    data() {
      return {
        login: {
          body: {
            email: '',
            password: ''
          },
          rememberMe: true
        },
        loading: false,
        isPwd: true,
      }
    },
    validations: {
      login: {
        body: {
          email: {required, email},
          password: {required}
        }
      }
    },
    methods: {
      loginForm() {
        this.loading = true
        this.$auth.login(this.login).then(() => {
          this.loading = false
          this.$router.push('/account')
        }).catch((error) => {
          if (error.response) {
            console.log('error')
            this.$q.notify(error.response.data.message)
          }
          this.loading = false
        })

      }
    }
  }
</script>
