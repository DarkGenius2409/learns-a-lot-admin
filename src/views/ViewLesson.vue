<template>
  <div class="container">
    <h1 class="display-4">{{ this.lesson.title }}</h1>
  </div>
</template>

<script>
import firebase from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default {
  name: "Dashboard",
  data() {
    return {
      lesson: {},
    };
  },
  mounted() {
    const lessonRef = doc(firebase.db, "lessons", this.$route.params.id);
    const unsub = onSnapshot(lessonRef, (doc) => {
      this.lesson = doc.data();
    });
  },
};
</script>
