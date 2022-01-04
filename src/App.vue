<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div>
        <h1 class="display-2">Sir Learns-a-Lot - Admin</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="signOut" v-if="signedIn">
        <span class="mr-2">Sign Out</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view v-if="signedIn" />
      <div class="container center mx-auto" v-if="!signedIn">
        <h1 class="display-2 signIn">Looks like you haven't signed in yet😢</h1>
        <hr />
        <v-form ref="form" class="signInForm mx-auto">
          <v-text-field v-model="email" label="E-mail" required></v-text-field>

          <v-text-field
            v-model="password"
            :counter="10"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn color="secondary" class="mr-4" @click="signIn">
            Sign In
          </v-btn>
        </v-form>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  name: "App",

  data() {
    return {
      signedIn: false,
      email: "",
      password: "",
    };
  },
  methods: {
    signIn: function () {
      this.signedIn = true;
      signInWithEmailAndPassword(firebase.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing in: ", errorCode, errorMessage);
        });
      this.$forceUpdate();
    },
    signOut: function () {
      this.signedIn = false;
      signOut(firebase.auth).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing out: ", errorCode, errorMessage);
      });
      this.$mount();
    },
  },
};
</script>

<style lang="scss">
.link {
  text-decoration: none;
}

.display-4 {
  margin: 25px 10px 15px 50px;
}

.display-2 {
  margin-left: 20px;
}

.display-2.signIn {
  margin-left: 20px;
  margin-bottom: 1rem;
}

.container.center {
  text-align: center;
  margin-top: 20rem;
  width: 25%;
  height: 50%;
}

.signInForm {
  padding: 30px;
  width: 50%;
}

.back {
  margin-top: 4rem;
  margin-left: 2rem;
}
</style>
