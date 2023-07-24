<template>
  <div>
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>
    <form @submit.prevent="onSubmit()">
      <div class="card auth-form">
        <div class="card-content">
          <div class="title has-text-centered">{{ fromTitle }}</div>
          <div class="content">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  placeholder="Enter Your Email"
                  v-model="credentails.email"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="Enter your Password"
                  v-model="credentails.password"
                />
              </div>
            </div>
            <div class="field is-grouped is-grouped-centered">
              <p class="control">
                <button button class="button is-success">
                  {{ fromTitle }}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";
const register = ref(false);
const authStore = useAuthStore();
const credentails = reactive({
  email: "",
  password: "",
});

const fromTitle = computed(() => {
  return register.value ? "Register" : "Login";
});

const onSubmit = () => {
  if (!credentails.email || !credentails.password) {
    alert("Please Enter email and password");
    return;
  }
  if (register.value) {
    authStore.registerUser(credentails);
  } else {
    authStore.LoginUser(credentails);
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
