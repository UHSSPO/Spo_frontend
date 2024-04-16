<template>
  <div>
    <h2>회원 목록</h2>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="itemsPerPage"
      :search="search"
      :page.sync="page"
      :total-items="totalUsers"
      :loading="loading"
      @input="fetchUserList"
    />

    <v-pagination
      v-if="totalPages > 1"
      v-model="page"
      :length="totalPages"
      total-visible="7"
      @input="fetchUserList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import SDataTable from '~/components/common/SDataTable.vue'

@Component({
  computed: {
    ...mapGetters({
      users: 'user/getUsers',
      totalUsers: 'user/getTotalUsers',
      loading: 'user/getLoading',
    }),
  },
  components: {
    SDataTable,
  }
})
export default class admin extends Vue {
  /********************************************************************************
  * Variables (Local, VUEX)
********************************************************************************/
  private totalUsers!: number
  private headers = [
    { text: '유저 일련번호', value: 'userSequence' },
    { text: '이메일', value: 'email' },
    { text: '투자 성향', value: 'investPropensity' },
    { text: '가입일', value: 'createdAt' },
    { text: '유저 권한', value: 'userRole' },
    { text: '닉네임', value: 'nickName' },
    { text: '생년월일', value: 'dateOfBirth' },
    { text: '관심 주식', value: 'interestStock' }
  ]

  private itemsPerPage = 10
  private page = 1
  private search = ''

  private get totalPages(): number {
    return Math.ceil(this.totalUsers / this.itemsPerPage)
  }

  /********************************************************************************
   * Method (Event, Business Logic)
   ********************************************************************************/
  private fetchUserList() {
    this.$store.dispatch('user/fetchUserList')
  }
}
</script>
