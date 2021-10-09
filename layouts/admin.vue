<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Application
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list shaped>
        <v-list-item to="/admin" router exact>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group no-action prepend-icon="mdi-account-circle">
          <template #activator>
            <v-list-item-title>Product</v-list-item-title>
          </template>
          <v-list-item router to="/admin/category">
            <v-list-item-title>Category</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>SubCategory</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Sub-SubCategory</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="#fff">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="main-bg">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      miniVariant: false,
    }
  }
}
</script>

<style scoped>
.main-bg{
  background-color: aqua;
}
</style>
