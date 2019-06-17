const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    redirect:'/account',
    children: [
      {
        path: '/login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/account',
        meta: { auth: true },
        component: () => import('pages/Index.vue')
      },
      {
        path: '/zones',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            name: 'ZonesList',
            path:'/',
            meta: {auth: true},

            component:() => import('pages/zones/Zones.vue')
          },
          {
            name: 'ZoneCreate',
            path:'create',
            meta: {auth: true},
            component:() => import('pages/zones/ZoneCreate.vue')
          },
          {
            path:'edit/:id',
            meta: {auth: true},
            component:() => import('pages/zones/ZoneEdit.vue')
          }
        ]
      },
      {
        path: '/trucks',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            name: 'TrucksList',
            path:'/',
            meta: {auth: true},

            component:() => import('pages/trucks/Trucks.vue')
          },
          {
            name: 'TruckCreate',
            path:'create',
            meta: {auth: true},
            component:() => import('pages/trucks/TruckCreate.vue')
          },
          {
            path:'edit/:id',
            meta: {auth: true},
            component:() => import('pages/trucks/TruckEdit.vue')
          }
        ]
      },
      {
        path: '/couriers',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            name: 'CourierList',
            path:'/',
            meta: {auth: true},

            component:() => import('pages/couriers/Couriers.vue')
          },
          {
            name: 'CourierCreate',
            path:'create',
            meta: {auth: true},
            component:() => import('pages/couriers/CourierCreate.vue')
          },
          {
            path:'edit/:id',
            meta: {auth: true},
            component:() => import('pages/couriers/CourierEdit.vue')
          }
        ]
      },
      {
        path: '/taxonomies',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            name: 'TaxonomyList',
            path:'/',
            meta: {auth: true},

            component:() => import('pages/taxonomies/Taxonomies.vue')
          },
          {
            name: 'TaxonomyCreate',
            path:'create',
            meta: {auth: true},
            component:() => import('pages/taxonomies/TaxonomyCreate.vue')
          },
          {
            path:'edit/:id',
            meta: {auth: true},
            component:() => import('pages/taxonomies/TaxonomyEdit.vue')
          }
        ]
      },
      {
        path: '/categories',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            path:'/',
            meta: {auth: true},

            component:() => import('pages/categories/Categories.vue')
          },
          {
            path:'create',
            meta: {auth: true},
            component:() => import('pages/categories/CategoryCreate.vue')
          },
          {
            path:'edit/:id',
            meta: {auth: true},
            component:() => import('pages/categories/CategoryEdit.vue')
          }
        ]
      },
      {
        path: '/foods',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            path:'/',
            meta: {auth: true},
            component:() => import('pages/foods/Foods.vue')
          },
          {
            path:'create',
            meta: {auth: true},
            component:() => import('pages/foods/FoodCreate.vue')
          },
          {
            path:'edit/:id',
            meta: {auth: true},
            component:() => import('pages/foods/FoodEdit.vue')
          }
        ]
      },
      {
        path: '/campaigns',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            path:'/',
            meta: {auth: true},
            component:() => import('pages/campaigns/Campaigns.vue')
          },
          {
            path:'create',
            meta: {auth: true},
            component:() => import('pages/campaigns/CampaignCreate.vue')
          },
          {
            path:'edit/:id',
            meta: {auth: true},
            component:() => import('pages/campaigns/CampaignEdit.vue')
          },
          {
            path:'vouchers',
            meta: {auth: true},
            component: {
              render(c) {
                return c('router-view')
              }
            },
            children:[
              {
                path:'/:id',
                component:()=> import('pages/campaigns/Vouchers.vue')
              },
              {
                path:'create',
                component:()=> import('pages/campaigns/VoucherCreate.vue')
              },
              {
                path:'edit/:id',
                component:()=> import('pages/campaigns/VoucherEdit.vue')
              },
            ]
          }
        ]
      },
      {
        path: '/messages',
        meta: {auth: true},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children:[
          {
            path:'/',
            meta: {auth: true},
            component:() => import('pages/messages/Messages.vue')
          },
          {
            path:'create',
            meta: {auth: true},
            component:() => import('pages/messages/MessageCreate.vue')
          },
        ]
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
