<template>
  <div class="container">
    <h1 class="display-4">Dashboard</h1>
    <hr />
    <v-list class="mx-auto">
      <v-list-item-group>
        <v-list-item
          v-for="lesson in lessons"
          :key="lesson.id"
          @click="viewLesson(lesson.id)"
        >
          <v-chip class="ma-2" color="primary" outlined>{{
            `${lesson.data.category} - ${lesson.data.subCategory}`
          }}</v-chip>
          <v-list-item-content class="">
            <router-link
              v-bind:to="{ name: 'view-lesson', params: { id: lesson.id } }"
              class="link"
            >
              <v-list-item-title
                v-text="lesson.data.title"
                class="headline"
              ></v-list-item-title>
            </router-link>
          </v-list-item-content>
          <v-icon @click="deleteLesson(lesson.id)">mdi-delete</v-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import firebase from "../firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

export default {
  name: "Dashboard",
  data() {
    return {
      lessons: [],
    };
  },
  mounted() {
    const lessonsRef = collection(firebase.db, "lessons");
    const unsub = onSnapshot(lessonsRef, (querySnapshot) => {
      this.lessons.length = 0;
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, data: doc.data() };
        this.lessons.push(data);
      });
    });
  },

  methods: {
    deleteLesson: async (lessonID) => {
      await deleteDoc(doc(firebase.db, "lessons", lessonID));
    },
  },
};
</script>

<style scoped lang="scss">
.display-4 {
  margin: 10px 10px 10px 50px;
}
.mx-auto {
  margin-top: 1rem;
}
</style>
