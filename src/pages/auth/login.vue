<template>
  <div id="container" class="line">
    <div class="content">
      <div class="login">
        <div class="login-header">
          <h1>로그인하기</h1>
        </div>
        <div class="login-input">
          <s-text-field
            label="이메일"
            :required="true"
            type="email"
          />
          <s-text-field
            label="패스워드"
            :required="true"
            type="password"
          />
          <div class="login-button">
            <s-button class="w-100">
              로그인하기
            </s-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Vue } from 'nuxt-property-decorator'
import STextField from '~/components/common/STextField.vue'
import SButton from '~/components/common/SButton.vue'
import { IKakaoCertified, ISignUp } from '~/types/auth/auth'

</script>
