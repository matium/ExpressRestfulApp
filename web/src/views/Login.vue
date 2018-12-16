<template>
  <div class="login">
    <h2>Login Form</h2>
    <p class="description">ExpressとMongoDBで作成されたAPIを通して、ログインを行うためのテストです。<br>ユーザー名とパスワードを入力してログインできるかをチェックしてください。</p>
    <login-form></login-form>
  </div>
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