<template>
  <v-card class="form-pannel">
    <v-container>
      <h3 class="headline font-weight-bold">ユーザー情報の確認</h3>
      <p class="subheading">この情報でよろしければ「登録」ボタンを押してください</p>
      <div class="contents">
        <v-layout wrap class="check-content">
          <v-card-text class="font-weight-bold cont-label">ユーザー名</v-card-text>
          <v-card-text class="subheading cont-text">{{ preSignupUser.username }}</v-card-text>
        </v-layout>
        <v-layout wrap class="check-content">
          <v-card-text class="font-weight-bold cont-label">メールアドレス</v-card-text>
          <v-card-text class="subheading cont-text">{{ preSignupUser.email }}</v-card-text>
        </v-layout>
        <v-layout wrap class="check-content">
          <v-card-text class="font-weight-bold cont-label">パスワード</v-card-text>
          <v-card-text class="subheading cont-text">{{ passwordText }}</v-card-text>
        </v-layout>
      </div>
      <nav class="submit-nav">
        <v-layout justify-center>
          <v-btn large color="secondary" @click="onBackForm">修正する</v-btn>
          <v-btn large color="primary" :loading="buttonLoading" :disabled="buttonLoading" @click="onRegisterUser">登録する</v-btn>
        </v-layout>
      </nav>
    </v-container>
  </v-card>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import SubmitButton from "../SubmitButton";

@Component({
  components: { SubmitButton },
  computed: mapState([ 'preSignupUser' ])
})
export default class SignupCheck extends Vue {

  public preSignupUser: any;

  protected buttonLoading: boolean = false;

  /**
   * ライフサイクルフック：created
   * データ初期化後、ユーザー情報がない場合は直接このルートへのアクセスとみなし
   * サインアップフォームへ遷移させる
   */
  created():void {
    if (!this.preSignupUser.username || !this.preSignupUser.email || !this.preSignupUser.password) {
      // サインアップフォームへ遷移する
      this.$router.push('/signup');
    }
  };

  get passwordText(): string {
    let pass_txt: string = '';
    const pass_len: number = this.preSignupUser.password.length;
    for (let i: number = 0; i < pass_len; i++) {
      pass_txt += '•';
    }
    return pass_txt;
  }

  public onRegisterUser (event: MouseEvent) {
    this.$store.dispatch('registUser');
  }

  public onBackForm (event: MouseEvent) {
    this.$router.push('/signup');
  }
}
</script>


<style lang="scss" scoped>

.cont-label {
  width: 35%;

  @include smp {
    width: 100%;
    padding: 0;
  }
}

.cont-text {
  width: 65%;
  text-align: center;

  @include smp {
    text-align: left;
  }
}

.submit-nav {
  border-top: 1px solid #ddd;
  margin-top: 1.5em;
  padding-top: 2em;
}

/*
.check-content {
  width: 400px;
  @include display-flex;
  margin: 0 auto 0 auto;

  .cont-label {
    @include flex(0 1 100px);
    width: 100px;
    font-size: 85%;
    font-weight: 700;
    text-align: left;
    color: #8096aa;
  }

  .cont-text {
    @include flex(1 0);
    height: 2.5em;
    text-align: left;
    font-size: 110%;
    letter-spacing: 0;
  }
}
*/
</style>