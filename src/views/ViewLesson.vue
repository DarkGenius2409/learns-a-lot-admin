<template>
  <div class="container">
    <h1 class="display-4">View Lesson</h1>
    <hr />
    <div class="container inside">
      <v-form ref="form" class="form">
        <v-text-field
          v-model="lessonName"
          label="Title"
          required
          :disabled="!editing"
        ></v-text-field>

        <v-text-field
          v-model="lessonCategory"
          label="Category"
          required
          :disabled="!editing"
        ></v-text-field>

        <v-text-field
          v-model="lessonSubCategory"
          label="Sub Category"
          required
          :disabled="!editing"
        ></v-text-field>

        <v-text-field
          v-model="lessonUrl"
          label="URL"
          required
          :disabled="!editing"
        ></v-text-field>

        <div class="container inside questions">
          <v-card
            class="mx-auto questionCard"
            v-for="(question, i) in lessonQuiz"
            :key="question.id"
          >
            <v-form ref="form" class="form container question">
              <v-text-field
                v-model="lessonQuiz[i].question"
                label="Question"
                required
                :disabled="!editing"
              ></v-text-field>

              <div class="container choices">
                <v-text-field
                  v-model="lessonQuiz[i].choices[0]"
                  label="Choice 1"
                  required
                  :disabled="!editing"
                ></v-text-field>
                <v-text-field
                  v-model="lessonQuiz[i].choices[1]"
                  label="Choice 2"
                  required
                  :disabled="!editing"
                ></v-text-field>
                <v-text-field
                  v-model="lessonQuiz[i].choices[2]"
                  label="Choice 3"
                  required
                  :disabled="!editing"
                ></v-text-field>
                <v-text-field
                  v-model="lessonQuiz[i].choices[3]"
                  label="Choice 4"
                  required
                  :disabled="!editing"
                ></v-text-field>
              </div>

              <v-text-field
                v-model="lessonQuiz[i].answer"
                label="Answer"
                required
                :disabled="!editing"
              ></v-text-field>
            </v-form>
            <v-btn
              v-if="editing && i == lessonQuiz.length - 1"
              class="newQuestion"
              color="secondary"
              small
              dark
              absolute
              bottom
              right
              @click="addQuestion()"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              v-if="editing"
              class="newQuestion"
              color="secondary"
              small
              dark
              absolute
              top
              right
              @click="deleteQuestion(i)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card>
        </div>

        <v-btn
          v-if="editing"
          outlined
          color="secondary"
          class="mr-4 btn"
          @click="updateLesson()"
        >
          Save
        </v-btn>
      </v-form>
    </div>
    <router-link v-bind:to="{ path: '/' }">
      <v-btn class="back" color="secondary" fab x-large dark absolute top left>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
    <v-btn
      @click="startEditing()"
      class="edit"
      color="secondary"
      fab
      x-large
      dark
      absolute
      bottom
      right
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
  </div>
</template>

<script>
import uniqid from "uniqid";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import firebase from "../firebase";

export default {
  name: "AddLesson",
  data() {
    return {
      lessonName: "",
      lessonCategory: "",
      lessonSubCategory: "",
      lessonUrl: "",
      lessonQuiz: [],
      editing: false,
    };
  },
  mounted() {
    const lessonRef = doc(firebase.db, "lessons", this.$route.params.id);
    const unsub = onSnapshot(lessonRef, (doc) => {
      const lesson = doc.data();
      this.lessonName = lesson.title;
      this.lessonCategory = lesson.category;
      this.lessonSubCategory = lesson.subCategory;
      this.lessonUrl = lesson.url;
      this.lessonQuiz = lesson.quiz;
    });
  },
  methods: {
    addQuestion: function () {
      this.lessonQuiz.push({
        id: this.lessonQuiz[this.lessonQuiz.length - 1].id + 1,
        question: "",
        choices: ["", "", "", ""],
        answer: "",
      });
    },
    deleteQuestion: function (i) {
      this.lessonQuiz.splice(i, 1);
    },

    updateLesson: async function () {
      const lesson = {
        title: this.lessonName,
        category: this.lessonCategory,
        subCategory: this.lessonSubCategory,
        url: this.lessonUrl,
        quiz: this.lessonQuiz,
      };

      await setDoc(doc(firebase.db, "lessons", this.$route.params.id), lesson);

      this.editing = false;
    },
    startEditing: function () {
      this.editing = true;
    },
  },
};
</script>

<style scoped lang="scss">
.container.inside {
  padding: 3rem;
}

.container.question {
  padding: 2rem;
}

.container.choices {
  padding: 0.5rem 2rem;
}

.btn {
  margin-top: 1.5rem;
}

.questionCard {
  margin: 2rem;
  width: 40%;
  padding: 1.5rem;
}

.newQuestion {
  border-radius: 1rem;
}

.edit {
  margin-bottom: 4rem;
  margin-right: 2rem;
}
</style>
