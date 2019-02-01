<template>
  <v-content class="home">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Vue + Express App</v-toolbar-title>
    </v-toolbar>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </v-content>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
