<template>
  <div>
    <div style="display: flex; align-items: center; width: 25%">
      <v-text-field
        v-if="isSearch"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        placeholder="검색"
      />
    </div>
    <div class="table-container" :class="{ 'table-container-fix-none': !radioCheck }">
      <v-data-table
        :id="'data_table_'.concat(uniqueId)"
        v-model="selected"
        :headers="headers"
        :height="height"
        :show-select="showSelect"
        :items="filteredItems"
        :item-key="itemKey"
        :items-per-page="itemsPerPage"
        :search="search"
        :page.sync="currentPage"
        fixed-header
        hide-default-footer
        class="v-data-table"
        @input="onInput"
        @page-count="items / 20"
      >
        <template v-if="hideCheckboxAll" #[`header.data-table-select`] />
        <template #[`header.value`]="{header}">
          {{ header.value }}
        </template>

        <template v-for="(header, index) in headers" #[`item.${header.value}`]="{ item }">
          <div :key="index">
            <slot v-if="header.isSlot" :name="`${header.value}`" :item="item" />
            <span v-else>{{ item[header.value] }}</span>
          </div>
        </template>
        <template #no-data>
          <div class="no-data">
            <div class="txt">
              <div class="mb-4">
                <v-icon size="80">
                  mdi-cancel
                </v-icon>
              </div>
              <span>조회 결과가 없습니다.</span>
            </div>
          </div>
        </template>
      </v-data-table>
    </div>
    <v-pagination
      v-if="filteredItems.length > itemsPerPage"
      v-model="currentPage"
      :length="Math.ceil(filteredItems.length / itemsPerPage)"
      total-visible="12"
      @input="onChangePage"
    />
  </div>
</template>

<script lang="ts">
import { v4 } from 'uuid'
import { Component, Emit, namespace, Prop, Vue } from 'nuxt-property-decorator'
import { IDataTableHeader } from '~/types/common'

@Component({
  name: 'SDataTable'
})
export default class SDataTable extends Vue {
  /********************************************************************************
   * Properties
   ********************************************************************************/
  @Prop({ type: Number, default: 1000 }) private readonly currencyUnit!: number
  @Prop({ required: true }) private readonly headers!: Array<IDataTableHeader>
  @Prop() private readonly height?: string
  @Prop() private readonly search?: string
  @Prop(Boolean) private readonly isScrollTop!: boolean
  @Prop() private readonly itemKey?: string
  @Prop() private readonly items!: Array<any>
  @Prop({ type: String, default: '조회 결과가 없습니다.' }) private readonly noDataText?: string
  @Prop() private readonly rowActiveId?: string | number
  @Prop() private readonly rowHighlight?: boolean
  @Prop() private readonly isSearch?: boolean
  @Prop(Boolean) private readonly showSelect!: boolean
  @Prop(Boolean) private readonly singleSelect!: boolean
  @Prop(Number) private readonly totalCount?: number
  @Prop(Boolean) private readonly countInit?: boolean
  @Prop(Boolean) private readonly hideCheckboxAll?: boolean

  @Emit('input')
  private onInput(eventValue: any) {
    return eventValue
  }

  @Emit('click')
  private onClick() {
    return false
  }

  @Emit('changePage')
  private onChangePage(eventValue: any) {
    return eventValue
  }

  private get filteredItems() {
    const filteredItems = this.items.filter((item) => {
      if (this.search) {
        const searchLowerCase = this.search.toLowerCase()
        return this.headers.some((header) => {
          const headerValue = String(item[header.value]).toLowerCase()
          return headerValue.includes(searchLowerCase)
        })
      } else {
        return true
      }
    })

    return filteredItems
  }

  /********************************************************************************
   * Variables (Local, VUEX)
   ********************************************************************************/
  private localHeaders = [] as Array<IDataTableHeader>
  private localItems = [] as any
  private vDataTableWrapper = null as any
  private options = {
    sortDesc: [] as any,
    sortBy: []
  }

  private selected = []
  private uniqueId = v4()
  private currentPage = 1
  private itemsPerPage = 10
  private radioCheck = true
}
</script>
