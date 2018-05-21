<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center login-text">Login</h2>
            <div class="field">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password">
            </div>
            <p v-if="feedback" class="red-text center">{{ feedback }}</p>

            <br>
            <div class="field center">
                <button class="btn login-btn :hover">Login</button>

            </div>
        </form>
    </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            console.log(user);
            //CHANGE THIS TO SUB PAGE!!!!!
            this.$router.push({ name: 'Subscript', params: {id: user.uid}});
          })
          .catch(err => {
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = "Please fill out both fields";
      }
    }
  }
};
</script>

<style>
.btn {
  background-color: #31708E;
  color: #F7F9FB;
  font-family: 'Noto Sans', sans-serif;
}
.login {
  max-width: 400px;
  margin-top: 60px;
  font-family: 'Source Sans Pro', sans-serif;
}
.login h2 {
  font-size: 2.4em;
  font-family: 'Source Sans Pro', sans-serif;
}
.login .field {
  margin-bottom: 16px;
  font-family: 'Source Sans Pro', sans-serif;
}
.login-btn,  {
  background-color: #31708E;
  color: #F7F9FB;
  font-family: 'Noto Sans', sans-serif;
}
.login-text {
  color: #31708E;
  font-family: 'Noto Sans', sans-serif;
}

</style>