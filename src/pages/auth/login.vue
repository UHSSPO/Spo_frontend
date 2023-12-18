<template>
  <div id="container" class="line">
    <div class="content">
      <div class="login">
        <div class="login-header">
          <h1>로그인하기</h1>
        </div>
        <div class="login-input">
          <s-text-field
            v-model="email"
            :rules="[required]"
            label="Email"
          />
          <s-text-field
            v-model="password"
            :rules="[required]"
            label="Password"
            placeholder="Enter your password"
          />
        </div>
        <v-btn>
          로그인하기
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import STextField from '~/components/common/STextField.vue'
</script>
