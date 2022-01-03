<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div>
        <h1 class="display-2">Sir Learns-a-Lot - Admin</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="signIn" v-if="!signedIn">
        <span class="mr-2">Sign In</span>
      </v-btn>
      <!-- <v-btn text @click="signOut" v-if="signedIn">
        <span class="mr-2">Sign Out</span>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      signedIn: false,
    };
  },
  // methods: {
  //   signIn: function () {
  //     this.signedIn = !this.signedIn;
  //   },
  // },
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
</style>
