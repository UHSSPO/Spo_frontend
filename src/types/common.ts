// 대화상자
export enum DIALOG_TYPE {
  YES_NO = 'YES_NO',
  CONFIRM = 'CONFIRM',
  CONFIRM_CANCEL = 'CONFIRM_CANCEL',
  TRANSFER_CANCEL = 'TRANSFER_CANCEL'
}

export interface IDataTableHeader {
  text: string
  value: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  filterable?: boolean
  groupable?: boolean
  divider?: boolean
  class?: string | string[]
  width?: string | number
  filter?: (value: any, search: string, item: any) => boolean
  sort?: (a: any, b: any) => number
  canSetting?: boolean // 커스텀 설정을 위해 추가
  visible?: boolean // 컬럼표시여부
  isNumber?: boolean // 숫자여부 (콤마사용여부)
  isPercentage?: boolean // 퍼센트여부
  useCurrencyUnit?: boolean // 금액단위적용여부
  isSlot?: boolean // 슬롯사용여부
  canMove?: boolean // 위아래변경가능여부
  showIndex?: {sort: string} // 채번표시 (정렬:ascending/descending)
  isTextBr?: boolean
  isObject?: boolean
  objectKey?: string
  multiSortOrder?: number
}

export enum DIALOG_RESULT {
  YES = 'YES',
  NO = 'NO',
  CONFIRM = 'CONFIRM',
  CANCEL = 'CANCEL',
  TRANSFER = 'TRANSFER'
}

export interface IDialog {
  id: string
  type?: DIALOG_TYPE
  title?: string
  text: string
  callback?: any
}

export interface IDialogResult {
  id: string
  result: DIALOG_RESULT
}

export enum USER_TYPE_ROLE {
  USER = 'USR', // 일반유저
  ADMIN = 'ADM', // 어드민
}

export interface ICodeInfo {
  cd: string | number
  cdVal: string
}
