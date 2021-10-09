<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col>
          <div class="text-h4 text-darken-1 font-weight-medium mt-3">
            Category
          </div>
        </v-col>
        <v-col>
          <v-breadcrumbs :items="breadcrumb" class="float-right">
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <v-text-field v-model="search"
                            class="float-left"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn elevation="2" color="primary" class="float-right mt-3" @click="$refs.child.modal()">
                New Category
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="categoryList"
          :search="search" :loading="loading"
          loading-text="Loading... Please wait"
          :items-per-page="5">
          <!-- eslint-disable-next-line -->
          <template v-slot:item.icon="{item}">
            <v-img
              lazy-src="http://localhost:3000/api/storage/images/category/b83dfee0-5fe5-4c42-a747-e7311c1b1463.jpg"
              max-width="100"
              src="http://localhost:3000/api/storage/images/category/b83dfee0-5fe5-4c42-a747-e7311c1b1463.jpg"
            ></v-img>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <AdminCategoryCreateUpdate ref="child"/>
  </v-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  layout: "admin",
  data: () => ({
    breadcrumb: [
      {
        text: 'Products',
        disabled: true,
      },
      {
        text: 'Category',
        disabled: true,
      },
    ],
    loading: true,
    search: '',
    headers: [
      {text: 'Category Name', value: 'name'},
      {text: 'Banner', value: 'banner', sortable: false},
      {text: 'Icon', value: 'icon', sortable: false,},
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
    dialog: true,
  }),
  computed: {
    ...mapGetters({categoryList: "category/categoryList"}),
  },
  async mounted() {
    this.loading = true;
    if (!this.categoryList.length > 0) await this.$store.dispatch('category/CATEGORY_LIST');
    this.loading = false;
  },
}
</script>

<style scoped>

</style>
