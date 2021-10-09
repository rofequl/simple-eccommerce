<template>
  <v-dialog v-model="visible" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">New category import</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="form.name" :rules="rules.name" label="Category Name"
                              placeholder="BlackBerry"
                              :error-messages="errors && errors.name ? errors.name.msg:''"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input v-model="form.banner" label="Category Banner" prepend-icon="mdi-camera"
                              :rules="rules.banner" accept="image/png, image/jpeg, image/jpg"
                              c="Image size: 800 X 800"></v-file-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input v-model="form.icon" label="Category Icon" prepend-icon="mdi-camera"
                              :rules="rules.icon" accept="image/png, image/jpeg, image/jpg"
                              placeholder="Image size: 100 X 100"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="visible = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="create">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    errors: null,
    form: {
      id: '',
      name: '',
      banner: null,
      icon: null,
    },
    rules: {
      name: [
        v => !!v || 'Category name is required',
        v => (v && v.length <= 50) || 'Category name must be less than 50 characters',
      ],
      banner: [
        v => !!v || 'Category banner image is required',
        v => !v || v.size < 2000000 || 'Banner size should be less than 2 MB!',
        v => !v || ['image/png', 'image/jpg', 'image/jpeg'].includes(v.type) || 'This type image are not support!',
      ],
      icon: [
        v => !!v || 'Category icon image is required',
        v => !v || v.size < 500000 || 'Icon size should be less than 500 KB!',
        v => !v || ['image/png', 'image/jpg', 'image/jpeg'].includes(v.type) || 'This type image are not support!',
      ],
    }
  }),
  methods: {
    modal() {
      this.visible = true;
      setTimeout(() => this.$refs.form.reset(), 100)
    },
    create() {
      this.errors = null
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        for (const key in this.form) {
          formData.append(key, this.form[key] === null ? '' : this.form[key]);
        }
        this.$axios.post('/api/category', formData)
          .then((response) => {
            if (response.data._id) {
              this.visible = false;
              this.$notification.success({
                message: 'Congratulations',
                description: 'Category add successfully.',
                duration: 4
              });
            }
          })
          .catch((error) => {
            if (error.response.data.errors) {
              this.errors = error.response.data.errors
            }
          });
      }
    },
  }
}
</script>

<style scoped>

</style>
