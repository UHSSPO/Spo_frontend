export class Globals {
  public static readonly DIALOG_WIDTH = 600

  // https://moment.github.io/luxon/docs/manual/formatting.html
  public static readonly DATETIME_FILE_FORMAT = 'yyyyLLdd_HHmmss'
  public static readonly DATETIME_FORMAT = 'yyyy-LL-dd HH:mm:ss'
  public static readonly DATE_FORMAT = 'yyyy-LL-dd'

  public static readonly PERSISTED_STATE_KEY = 'SPO'

  public static readonly AUTH_HEADER = 'Authorization'

  public static readonly YES = 'Y'
  public static readonly NO = 'N'

  // 코드
  public static readonly CODE_00 = '00'
  public static readonly CODE_01 = '01'
  public static readonly CODE_02 = '02'
  public static readonly CODE_03 = '03'
  public static readonly CODE_04 = '04'
  public static readonly CODE_05 = '05'
  public static readonly CODE_06 = '06'

  public static readonly CHART_DEFAULT_FONT_SIZE = 12 // 차트 범례 크기
  public static readonly CHART_DEFAULT_FONT_TICK_SIZE = 12 // 차트 눈금 글자 크기
  public static readonly CHART_DEFAULT_BOX_SIZE = 6 // 차트 포인트 크기
  public static readonly CHART_DEFAULT_XY_VALUE_COLOR = '#343434' // X,Y축 데이터 색상
  public static readonly CHART_DEFAULT_XY_LINE_COLOR = '#EBEBEB' // X,Y축 라인 색상
  public static readonly CHART_DEFAULT_LINE_COLOR = '#7272CB' // 항목 dot & 라인 컬러
  public static readonly CHART_DEFAULT_LINE_FONT_COLOR = '#343434' // 항목 폰트 컬러
}
