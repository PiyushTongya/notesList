<template>
  <NavBar/>
  <div class="container">

    <router-view />
</div>
</template>
<script setup>
 import { onMounted } from 'vue';
import NavBar from './components/Layout/NavBar.vue';
  import  {useAuthStore} from "./stores/AuthStore"


  const authStore = useAuthStore()



  onMounted(()=>{
    authStore.init()
  })
</script>

<style>
 @import "/node_modules/bulma/css/bulma-rtl.min.css";

 </style>

