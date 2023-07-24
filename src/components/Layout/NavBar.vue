<template>
 
    <div class="container"></div>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="{name:'notes'}" class="navbar-item is-size-4 is-family-monospace">
            🅽🅾🆃🅴🆂🅰🅳🅳
        </router-link>
  
        <a role="button"
         class="navbar-burger"
         :class="{'is-active':showNavBar}"
         @click.prevent="showNavBar=!showNavBar"
         aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
  

      <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active':showNavBar}">
        
       
        
        <div class="navbar-end mt-2 ml-4 ">
          <router-link :to="{ name: 'notes' }" class="navbar-item" active-class="is-active">
            Notes
          </router-link>
          <router-link :to="{ name: 'stats' }" class="navbar-item" active-class="is-active">
            Stats
          </router-link>
        </div>
        <div>
          <div class="ml-3" v-if="authStore.user.uid">
      <button class="button is-link mt-2 ml-3" @click.prevent="onLogout">Logout {{ authStore.user.email }}</button>
    </div>
    </div>
      </div>
    </nav>
  </template>

  <script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/AuthStore";

   const showNavBar =   ref(false)
   const  authStore =useAuthStore()
   const onLogout=()=>{
    authStore.LogoutUser()
   }

</script>


<style scoped>
 @media (max-width: 1023) {
    .navbar-menu{
        position: absolute;
        left: 0;
        right: 0;
    }
    
 }
</style>
  