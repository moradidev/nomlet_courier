
export default async ({ app, router, Vue}) => {
  var helper ={}
  helper.upload = ()=>{
    return "http://nomlet.cm/api/v1/upload"
  }
  Vue.prototype.$env = helper
}
