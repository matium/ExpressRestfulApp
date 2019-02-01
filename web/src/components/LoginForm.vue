<template>
  <v-layout raw justify-center>
    <v-card class="form-pannel">
      <v-toolbar dark color="primary" flat>
        <v-toolbar-title>ログインしてください</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-form id="LoginForm" v-model="valid">
          <v-text-field
            v-model="username"
            :rules="[requiredValue]"
            :counter="20"
            label="ユーザー名"
            hint="半角英数字のみ"
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
          <nav class="submit-nav">
            <v-layout raw justify-center>
              <v-btn large :disabled="!valid" color="primary" @click="onSubmitForm">ログイン</v-btn>
            </v-layout>
          </nav>
        </v-form>
      </v-container>
      <v-container class="logged-in-info" v-if="loggedIn">
        <h3 class="headline">Logged In User</h3>
        <v-card-text class="uid">UserID: {{ user.uid }}</v-card-text>
        <v-card-text class="name">UserName: {{ user.name }}</v-card-text>
      </v-container>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import SubmitButton from './SubmitButton.vue';

@Component({
  components: {
    SubmitButton
  },
  computed: mapState([
    'loggedIn',
    'user'
  ])
})
export default class LoginForm extends Vue {
  public username: string = '';
  public password: string = '';

  protected valid: boolean = false;
  protected showPassword: boolean = false;

  /* Validation Rules */
  protected requiredValue(value): any {
    return !!value || 'Required';
  };

  public onSubmitForm (event: MouseEvent) {
    this.$store.dispatch('loginUser', {
      username: this.username,
      password: this.password
    });
  };
}
</script>

<style scoped lang="scss">
.v-text-field {
  margin-bottom: 1em;
}

.logged-in-info {
  padding-top: 1.5em;
  border-top: 1px solid #ddd;
}
</style>