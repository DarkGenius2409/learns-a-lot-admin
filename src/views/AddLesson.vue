<template>
  <div class="container parent">
    <h1 class="display-4">Add Lesson</h1>
    <hr />
    <div class="container inside">
      <v-form ref="form" class="form">
        <v-text-field
          v-model="lessonName"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="lessonCategory"
          label="Category"
          required
        ></v-text-field>

        <v-text-field
          v-model="lessonSubCategory"
          label="Sub Category"
          required
        ></v-text-field>

        <v-text-field v-model="lessonUrl" label="URL" required></v-text-field>

        <v-chip-group class="center">
          <h1 class="headline center">Further Links:</h1>
          <v-chip
            v-for="i in lessonFurtherLinks"
            :key="i"
            class="links"
            close
            @click:close="deleteLink(i)"
          >
            <v-text-field
              v-model="lessonFurtherLinks[i]"
              required
            ></v-text-field>
          </v-chip>
          <v-btn
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
            v-for="i in lessonFurtherLinkNames"
            :key="i"
            class="links"
            close
            @click:close="deleteLinkName(i)"
          >
            <v-text-field
              v-model="lessonFurtherLinkNames[i]"
              required
            ></v-text-field>
          </v-chip>
          <v-btn
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
              ></v-text-field>

              <div class="container choices">
                <v-text-field
                  v-model="lessonQuiz[i].choices[0]"
                  label="Choice 1"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="lessonQuiz[i].choices[1]"
                  label="Choice 2"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="lessonQuiz[i].choices[2]"
                  label="Choice 3"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="lessonQuiz[i].choices[3]"
                  label="Choice 4"
                  required
                ></v-text-field>
              </div>

              <v-text-field
                v-model="lessonQuiz[i].answer"
                label="Answer"
                required
              ></v-text-field>
            </v-form>
            <v-btn
              v-if="i == lessonQuiz.length - 1"
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
          outlined
          color="secondary"
          class="mr-4 btn"
          @click="createLesson()"
        >
          Create
        </v-btn>
      </v-form>
    </div>
    <router-link v-bind:to="{ path: '/' }">
      <v-btn class="back" color="secondary" fab x-large dark absolute top left>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import uniqid from "uniqid";
import { doc, setDoc } from "firebase/firestore";
import firebase from "../firebase";

export default {
  name: "AddLesson",
  data() {
    return {
      lessonName: "",
      lessonCategory: "",
      lessonSubCategory: "",
      lessonUrl: "",
      lessonQuiz: [
        {
          id: 1,
          question: "",
          choices: ["", "", "", ""],
          answer: "",
        },
      ],
      lessonFurtherLinks: [""],
      lessonFurtherLinkNames: [""],
    };
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
    addLink: function () {
      this.lessonFurtherLinks.push("");
    },
    deleteLink: function (i) {
      this.lessonFurtherLinks.splice(i, 1);
    },
    addLinkName: function () {
      this.lessonFurtherLinkNames.push("");
    },
    deleteLinkName: function (i) {
      this.lessonFurtherLinkNames.splice(i, 1);
    },
    createLesson: async function () {
      const lesson = {
        title: this.lessonName,
        category: this.lessonCategory,
        subCategory: this.lessonSubCategory,
        url: this.lessonUrl,
        quiz: this.lessonQuiz,
        furtherLinks: this.lessonFurtherLinks,
      };

      await setDoc(doc(firebase.db, "lessons", uniqid()), lesson);

      this.$router.push({ path: "/" });
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
