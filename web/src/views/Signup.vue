<template>
  <v-content class="signup">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Vue + Express App</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <h2 class="display-3">Sign Up</h2>
      <p class="subheading">ユーザーを作成します。</p>
      <v-layout column class="align-center">
        <router-view/>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Signup extends Vue {

}
</script>

<style lang="scss">
</style>