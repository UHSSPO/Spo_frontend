// 대화상자
export enum DIALOG_TYPE {
  YES_NO = 'YES_NO',
  CONFIRM = 'CONFIRM',
  CONFIRM_CANCEL = 'CONFIRM_CANCEL',
  TRANSFER_CANCEL = 'TRANSFER_CANCEL'
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

export interface ICodeInfo {
  cd: string | number
  cdVal: string
}
