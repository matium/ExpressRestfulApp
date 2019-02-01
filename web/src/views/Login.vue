<template>
  <v-content class="login">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Vue + Express App</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <h2 class="display-3">Login Form</h2>
      <p class="subheading">ExpressとMongoDBで作成されたAPIを通して、ログインを行うためのテストです。<br>ユーザー名とパスワードを入力してログインできるかをチェックしてください。</p>
      <login-form></login-form>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {

}
</script>

<style lang="scss">
.description {
  font-size: 10pt;
}
</style>