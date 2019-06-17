<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="glossy">
            <q-toolbar>
                <q-btn
                        flat
                        dense
                        round
                        @click="leftDrawerOpen = !leftDrawerOpen"
                        aria-label="Menu"
                >
                    <q-icon name="menu"/>
                </q-btn>

                <q-toolbar-title>
                    {{$t('general.app_title')}}
                </q-toolbar-title>

                <q-btn flat
                       round
                       rounded
                       dense
                       icon="more_vert"
                >
                    <q-menu transition-show="flip-right"
                            transition-hide="flip-left">
                        <q-list link v-if="!$auth.loggedIn()">
                            <q-item clickable to="/login" @click.native="showLoading">
                                <q-item-section avatar>
                                    <q-icon name="lock"/>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>
                                        <div>{{$t('general.login')}}</div>
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <q-list link v-if="$auth.loggedIn()">
                            <q-item clickable @click.native="logoutDialog">
                                <q-item-section>
                                    <q-icon name="lock"/>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{$t('general.logout')}}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer
                v-model="leftDrawerOpen"
                bordered
                content-class="bg-grey-2"
        >
            <q-list>
                <q-item clickable @click.native="$router.push({path:'/zones'})" >
                    <q-item-section avatar>
                        <q-icon name="mdi-crosshairs-gps"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.zones')}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click.native="$router.push({path:'/trucks'})">
                    <q-item-section avatar>
                        <q-icon name="mdi-truck"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.trucks')}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click.native="$router.push({path:'/couriers'})">
                    <q-item-section avatar>
                        <q-icon name="mdi-motorbike"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.couriers')}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click.native="$router.push({path:'/taxonomies'})">
                    <q-item-section avatar>
                        <q-icon name="mdi-food-variant"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.taxonomies')}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click.native="$router.push({path:'/categories'})">
                    <q-item-section avatar>
                        <q-icon name="mdi-database"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.categories')}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click.native="$router.push({path:'/foods'})">
                    <q-item-section avatar>
                        <q-icon name="mdi-food"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.foods')}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click.native="$router.push({path:'/messages'})">
                    <q-item-section avatar>
                        <q-icon name="mdi-message-text"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.messages')}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable @click.native="$router.push({path:'/campaigns'})">
                    <q-item-section avatar>
                        <q-icon name="mdi-bell-ring"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{$t('menu.campaigns')}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
  import {openURL} from 'quasar'

  export default {
    name: 'MyLayout',
    data() {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop
      }
    },
    methods: {
      openURL,
      logoutDialog() {
        this.$q.dialog({
          title: this.$t('dialogs.logout_title'),
          message: this.$t('dialogs.logout_message'),
          ok: this.$t('dialogs.logout_ok'),
          cancel: this.$t('dialogs.cancel'),
        }).onOk(() => {
          this.$auth.logout().then(() => {
            this.$router.push('/login')
            Notify.create({type: 'positive', message: 'با موفقیت خارج شدید'})
          })
        }).onCancel(() => {
        })
      }
    }
  }
</script>

<style>
</style>
