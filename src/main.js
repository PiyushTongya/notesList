import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import { auth } from './js/firebase'
import { useAuthStore } from './stores/AuthStore'
 

 router.beforeEach((to,from)=>{
   const authStore =useAuthStore();

   const isAuthenticated = authStore.user.uid ? true : false
 
  if( isAuthenticated && to.name ==='auth'){
    return{ name :'notes'}
  }
  if( !isAuthenticated && to.name !='auth'){
    return{ name :'auth'}
  }
})
 const app=createApp(App)
 const pinia = createPinia()
 app.use(router)
 app.use(pinia)
 app.mount('#app')

