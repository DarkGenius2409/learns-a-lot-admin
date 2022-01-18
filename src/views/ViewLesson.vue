<template>
  <div class="container parent">
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

        <v-chip-group class="center">
          <h1 class="headline center">Further Links:</h1>
          <v-chip
            v-for="(link, i) in lessonFurtherLinks"
            :key="i"
            class="links"
            close
            @click:close="deleteLink(i)"
          >
            <v-text-field
              v-model="lessonFurtherLinks[i]"
              required
              :disabled="!editing"
            ></v-text-field>
          </v-chip>
          <v-btn
            v-if="editing"
            color="secondary"
            x-small
            rounded
            dark
            class="addLink"
            @click="addLink()"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-chip-group>

        <v-chip-group class="center">
          <h1 class="headline center">Further Link Names:</h1>
          <v-chip
            v-for="(link, i) in lessonFurtherLinkNames"
            :key="i"
            class="links"
            close
            @click:close="deleteLinkName(i)"
          >
            <v-text-field
              v-model="lessonFurtherLinkNames[i]"
              required
              :disabled="!editing"
            ></v-text-field>
          </v-chip>
          <v-btn
            v-if="editing"
            color="secondary"
            x-small
            rounded
            dark
            class="addLink"
            @click="addLinkName()"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-chip-group>

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
      lessonFurtherLinks: [],
      lessonFurtherLinkNames: [],
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
      this.lessonFurtherLinks = lesson.furtherLinks;
      this.lessonFurtherLinkNames = lesson.furtherLinkNames;
      console.log(this.lessonFurtherLinks);
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
      if (this.lessonQuiz.length > 1) {
        this.lessonQuiz.splice(i, 1);
      }
    },
    addLink: function () {
      this.lessonFurtherLinks.push("");
      console.log(this.lessonFurtherLinks[this.lessonFurtherLinks.length - 1]);
    },
    deleteLink: function (i) {
      if (this.lessonFurtherLinks.length > 1) {
        this.lessonFurtherLinks.splice(i, 1);
      }
    },
    addLinkName: function () {
      this.lessonFurtherLinkNames.push("");
    },
    deleteLinkName: function (i) {
      if (this.lessonFurtherLinkNames.length > 1) {
        this.lessonFurtherLinkNames.splice(i, 1);
      }
    },
    updateLesson: async function () {
      const lesson = {
        title: this.lessonName,
        category: this.lessonCategory,
        subCategory: this.lessonSubCategory,
        url: this.lessonUrl,
        quiz: this.lessonQuiz,
        furtherLinks: this.lessonFurtherLinks,
        furtherLinkNames: this.lessonFurtherLinkNames,
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

.links {
  padding: 1.5rem;
  margin: 4px 8px 4px 8px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}

.headline {
  margin-right: 8px;
}

.addLink {
  height: 100%;
  vertical-align: baseline;
  position: relative;
  top: 32.5%;
}
</style>
