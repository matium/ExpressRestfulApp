<template>
  <form id="LoginForm">
    <div class="input-field">
      <label for="username">ユーザー名</label>
      <input id="username" type="text" v-model="username" placeholder="ユーザー名を入力してください">
      <p class="valid-error" v-if="!validation.username">入力されていません</p>
    </div>
    <div class="input-field">
      <label for="password">パスワード</label>
      <input id="password" type="password" v-model="password" placeholder="パスワードを入力してください">
      <p class="valid-error" v-if="!validation.password">入力されていません</p>
    </div>
    <nav class="submit-nav">
      <submit-button @click="onSubmitForm">ログイン</submit-button>
    </nav>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SubmitButton from './SubmitButton.vue';

@Component({
  components: {
    SubmitButton
  }
})
export default class LoginForm extends Vue {
  public username: string = '';
  public password: string = '';

  private isInput: boolean = false;

  get validation(): any {
    return {
      username: !(this.username === ''),
      password: !(this.password === '')
    }
  }

  public onSubmitForm (event: MouseEvent) {
    this.$store.dispatch('loginUser', {
      username: this.username,
      password: this.password
    });
  };
}
</script>

<style scoped lang="scss">
#LoginForm {
  width: 500px;
  margin: 1em auto 0 auto;
  border-top: 1px solid #ddd;
  padding-top: 2em;
}

.input-field {
  width: 300px;
  margin: 0 auto 1em auto;

  label {
    display: block;
    width: 100%;
    font-size: 85%;
    font-weight: 700;
    text-align: left;
  }

  input {
    width: 100%;
    height: 2.5em;
    line-height: 2.5em;
    padding: 0 0.5em 0 0.5em;
  }

  .valid-error {
    margin-top: 0.5em;
    font-size: 85%;
    color: #af1b1d;
    text-align: left;
  }
}

.submit-nav {
  width: 300px;
  margin: 1.5em auto 0 auto;
}
</style>