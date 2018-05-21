<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">

      <h2 class="center signup-text">Signup</h2>
      <div class="field"  v-bind:class="{invalid: $v.email.$error }">

        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" @blur="$v.email.$touch()">
        <p v-if="!$v.email.email">Provide a vaild email address</p>
         <p v-if="!$v.email.required" class="red-text center">The email field cannot be empty</p>
      </div>
      <div class="field" v-bind:class="{invalid: $v.password.$error }">
        <label for="password">Password</label>
        <input id="password" type="password" v-model.trim="password" @blur="$v.password.$touch()">
      </div><span class="form-group__message red-text center" v-if="!$v.password.required">Password is required</span><span class="form-group__message red-text center" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</span>
      <div class="field" v-bind:class="{ invalid: $v.repeatPassword.$error }">
        <label for="password" >Re-Enter Password</label>
        <input id="repeatPassword" type="password" v-model.trim="repeatPassword" @blur="$v.repeatPassword.$touch()">
      </div><span class="form-group__message" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</span>
     <!-- <pre>password: {{ $v.password }}
    repeatPassword: {{ $v.repeatPassword }}</pre> -->
      <div class="field">
        <label for="name">Alias</label>
        <input id="name" type="text" v-model="alias">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <br>
      <div class="field center">

        <button class="btn signup-btn" :disabled="$v.$invalid">Signup</button>

      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import firebase from "firebase";
import { required, sameAs, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      repeatPassword: null,
      alias: null,
      feedback: null,
      slug: null
    };
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.feedback = null;
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This alias already exists";
          } else {
            // this alias does not yet exists in the db
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(user => {
                ref.set({
                  alias: this.alias,
                  user_id: user.uid
                });
                return user;
              })
              .then(user => {
                this.$router.push({
                  name: "Subscript",
                  params: { id: user.uid }
                });
              })
              .catch(err => {
                this.feedback = err.message;
              });
          }
        });
      } else {
        this.feedback = "Please fill in all fields";
      }
    }
  }
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}

.signup-btn {
  background-color: #31708e;
  color: #f7f9fb;
  font-family: "Noto Sans", sans-serif;
}

.signup-text {
  color: #31708e;
  font-family: "Noto Sans", sans-serif;
}
.field p{
  text-align: center;
}

</style>