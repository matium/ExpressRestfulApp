<template>
  <v-card class="form-pannel">
    <v-container>
      <h3 class="headline font-weight-bold">ユーザー情報を入力</h3>
      <p class="subheading">ユーザーの情報を入力してください</p>
      <v-form id="SignupForm" v-model="valid">
        <v-text-field
          v-model="username"
          :rules="[requiredValue, characterCounter]"
          :counter="20"
          label="ユーザー名"
          hint="半角英数字のみ"
        ></v-text-field>
        <v-text-field
          v-model="email"
          type="email"
          :rules="[requiredValue, emailCorrect]"
          label="メールアドレス"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :rules="[requiredValue]"
          :type="showPassword ? 'text' : 'password'"
          label="パスワード"
          hint="半角英数字のみ"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-model="rePassword"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          :rules="[requiredValue, passwordCorrect]"
          :type="showPassword ? 'text' : 'password'"
          label="パスワードの確認"
          hint="パスワードを再度入力してください"
        ></v-text-field>
        <nav class="submit-nav">
          <v-layout column class="align-center">
            <v-btn large :disabled="!valid" color="primary" @click="onSubmitForm">このユーザーを登録</v-btn>
          </v-layout>
        </nav>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import SubmitButton from '../SubmitButton.vue';


@Component({
  components: {SubmitButton},
  computed: mapState([ 'preSignupUser' ])
})
export default class SignupForm extends Vue {
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public rePassword: string = '';

  public preSignupUser: any;

  protected valid: boolean = false;
  protected showPassword: boolean = false;

  created(): void {
    this.username = this.preSignupUser.username;
    this.email = this.preSignupUser.email;
  }

  /* Validation Rules */
  protected requiredValue(value): any {
    return !!value || 'Required';
  };

  protected characterCounter(value): any {
    return value.length <= 20 || 'Max 20 characters';
  };

  protected emailCorrect(value): any {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.';
  };

  get passwordCorrect(): boolean {
    return this.password === this.rePassword || 'パスワードが間違っています';
  };


  public onSubmitForm (event: MouseEvent) {
    console.log('On Submit');

    /**
     * ユーザー情報を仮登録
     */
    this.$store.commit('setSignupUser', {
      username: this.username,
      email: this.email,
      password: this.password
    });
  }
}
</script>

<style scoped lang="scss">

.v-text-field {
  margin-bottom: 1em;
}

</style>