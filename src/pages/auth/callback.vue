<template>
  <div id="container" class="line">
    <div class="content">
      <!--시작-->
      <h1>카카오 계정으로 가입하기</h1>
      <template>
        <v-form>
          <v-text-field
            v-model="nickname"
            label="닉네임"
            required
          />
        </v-form>
      </template>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="이메일"
        required
      >
        <input type="text" placeholder="닉네임을 입력하세요." style="text-align:left" value="">
      </v-text-field>
      <template>
        <div>
          <div class="mb-6">
            Active picker: <code>{{ activePicker || 'null' }}</code>
          </div>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="출생일자"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              :active-picker.sync="activePicker"
              :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
              min="1950-01-01"
              @change="save"
            />
          </v-menu>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: ''
    }
  },
  methods: {
    submitForm() {
      // 닉네임 제출 또는 다른 처리 로직 추가
      if (this.nickname) {
        // 닉네임이 입력되었을 때의 처리
        console.log('닉네임:', this.nickname)
      } else {
        // 닉네임이 입력되지 않았을 때의 처리
        console.error('닉네임을 입력하세요.')
      }
    }
  }
}
</script>
<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  })
}
</script>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IKakaoCertified } from '../../types/auth/auth'
import { kakaoCertified } from '../../api/auth'
import STextField from '@/components/common/STextField.vue'
@Component({
  components: { STextField },
  layout: 'empty',
  name: 'callback'
})
export default class extends Vue {
  private authData = {} as IKakaoCertified
  private code = (this.$route.query.code || '') as string

  async created() {
    this.authData = {
      apikey: '2e79fbfa9c3fe6aad98a3ca66e8e5f6f',
      redirectUri: `${window.location.origin}/auth/callback`,
      code: this.code
    }

    console.log('process.env.NODE_ENV', process.env.NODE_ENV)

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    const response = await kakaoCertified(this.authData)
    console.log('response', response)
    this.$nextTick(() => {
      this.$nuxt.$loading.finish()
    })
  }
}
</script>
