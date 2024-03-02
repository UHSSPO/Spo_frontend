<template>
  <div class="container">
    <h1>마이페이지</h1>
    <button @click="showNicknameModal = true">
      닉네임 변경
    </button>
    <button @click="showPasswordModal = true">
      비밀번호 변경
    </button>
    <button @click="showWithdrawModal = true">
      회원탈퇴
    </button>

    <!-- 닉네임 변경 모달 -->
    <div v-if="showNicknameModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showNicknameModal = false">&times;</span>
        <h2>닉네임 변경</h2>
        <input v-model="newNickname" type="text" placeholder="새 닉네임 입력">
        <button @click="changeNickname">
          확인
        </button>
      </div>
    </div>

    <!-- 비밀번호 변경 모달 -->
    <div v-if="showPasswordModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showPasswordModal = false">&times;</span>
        <h2>비밀번호 변경</h2>
        <input v-model="currentPassword" type="password" placeholder="현재 비밀번호 입력">
        <input v-model="newPassword" type="password" placeholder="새 비밀번호 입력">
        <button @click="changePassword">
          확인
        </button>
      </div>
    </div>

    <!-- 회원탈퇴 모달 -->
    <div v-if="showWithdrawModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showWithdrawModal = false">&times;</span>
        <h2>회원탈퇴</h2>
        <p>정말로 회원탈퇴하시겠습니까?</p>
        <button @click="withdraw">
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default class mypage extends Vue {
  /********************************************************************************
     * Properties
     ********************************************************************************/

    @common.State private token!: string
}

</script>
