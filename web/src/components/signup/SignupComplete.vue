<template>
  <v-card class="form-pannel">
    <v-container v-if="loggedIn">
      <h3 class="headline font-weight-bold">ユーザー登録が完了しました</h3>
      <p class="subheading">ようこそ！ {{ user.name }}さん</p>
      <nav class="submit-nav">
        <v-layout justify-center>
          <v-btn large color="primary" @click="backSignupForm">ユーザー作成フォームへ戻る</v-btn>
        </v-layout>
      </nav>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import SubmitButton from '../SubmitButton.vue';

@Component({
  components: { SubmitButton },
  computed: mapState([
    'preSignupUser',
    'loggedIn',
    'user'
  ]),
  watch: {
    // ログインしたら仮ユーザーの情報を削除してページコンテンツを表示する
    loggedIn (val) {
      if (val) {
        console.log('Logged In User & Clear Signup User');
        this.$store.commit('clearSignupUser');
      }
    }
  }
})
export default class SignupComplete extends Vue {

  public preSignupUser: any;
  public loggedIn: boolean;
  public user: any;

  /**
   * ライフサイクルフック：created
   * データ初期化後、ユーザー情報がない場合は直接このルートへのアクセスとみなしサインアップフォームへ遷移させる
   * ユーザー情報がある場合はユーザー情報を使ってログインした後にページを表示させる
   */
  created():void {
    if (!this.preSignupUser.username || !this.preSignupUser.email || !this.preSignupUser.password) {
      // サインアップフォームへ遷移する
      this.$router.push('/signup');
    }
    else {
      console.log('Complete');
      console.log('username: ' + this.preSignupUser.username);
      console.log('email: ' + this.preSignupUser.email);
      console.log('password: ' + this.preSignupUser.password);

      // ここでログインする
      this.$store.dispatch('loginUser', {
        username: this.preSignupUser.username,
        password: this.preSignupUser.password
      });
    }
  };

  public backSignupForm (ev: MouseEvent):void {
    this.$router.push('/signup');
  }
}
</script>

<style lang="scss" scoped>

</style>