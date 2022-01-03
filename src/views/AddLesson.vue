<template>
  <div class="container">
    <h1 class="display-4">Add Lesson</h1>
    <hr />
    <div class="container inside">
      <v-form ref="form" class="form">
        <v-text-field
          v-model="lesson.name"
          :rules="nameRules"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="lesson.category"
          label="Category"
          required
        ></v-text-field>

        <v-text-field
          v-model="lesson.subCategory"
          label="Sub Category"
          required
        ></v-text-field>

        <v-text-field v-model="lesson.url" label="URL" required></v-text-field>

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
  </div>
</template>

<script>
export default {
  name: "AddLesson",
  data() {
    return {
      lesson: {},
    };
  },
};
</script>

<style scoped lang="scss">
.container.inside {
  padding: 3rem;
}

.btn {
  margin-top: 1.5rem;
}
</style>
