import JapaneseLunisolarCalendar, { calcJulianCenturyNumber, calcSunLongitude } from "./JapaneseLunisolarCalendar";

// ============================================================
// メソッド
// ============================================================

/**
 * 暦注を取得します。
 * @param calendar 旧暦インスタンス
 * @returns 暦注
 */
export const createCalendarInfo = (calendar: JapaneseLunisolarCalendar) => {
  if (isNaN(calendar.date.getTime())) return undefined;
  return getNijunanashuku(calendar);
};

// 27宿の旧暦の１日を先頭とする配列
const getCyclicalASTROLOGY27 = (month: number) => {
  switch (month) {
    case 1:
      return ASTROLOGY27.slice(11).concat(ASTROLOGY27.slice(0, 11));
    case 2:
      return ASTROLOGY27.slice(13).concat(ASTROLOGY27.slice(0, 13));
    case 3:
      return ASTROLOGY27.slice(15).concat(ASTROLOGY27.slice(0, 15));
    case 4:
      return ASTROLOGY27.slice(17).concat(ASTROLOGY27.slice(0, 17));
    case 5:
      return ASTROLOGY27.slice(19).concat(ASTROLOGY27.slice(0, 19));
    case 6:
      return ASTROLOGY27.slice(21).concat(ASTROLOGY27.slice(0, 21));
    case 7:
      return ASTROLOGY27.slice(24).concat(ASTROLOGY27.slice(0, 24));
    case 8:
      return ASTROLOGY27;
    case 9:
      return ASTROLOGY27.slice(2).concat(ASTROLOGY27.slice(0, 2));
    case 10:
      return ASTROLOGY27.slice(4).concat(ASTROLOGY27.slice(0, 4));
    case 11:
      return ASTROLOGY27.slice(7).concat(ASTROLOGY27.slice(0, 7));
    case 12:
      return ASTROLOGY27.slice(9).concat(ASTROLOGY27.slice(0, 9));
  }
};

/**
 * 二十七宿を取得します。
 * @param calender 旧暦
 * @returns 二十七宿
 */
export const getNijunanashuku = (calendar: JapaneseLunisolarCalendar) => {
  const cyclicalASTROLOGY27 = getCyclicalASTROLOGY27(calendar.month);
  return cyclicalASTROLOGY27 && cyclicalASTROLOGY27[(calendar.day % 27) - 1];
};

/**
 * 旧暦日基準の月相を取得します。
 * @param oldDay 旧暦日
 * @returns 月相
 */
export const getLunaPhase = (oldDay: number) => LUNA_PHASES[(oldDay - 1) % LUNA_PHASES.length];

// ============================================================
// 定数
// ============================================================

export type CalendarInfo = Readonly<{
  value: string;
  kana?: string;
  summary?: string;
  startAt?: number;
}>;

export const ASTROLOGY27: Array<CalendarInfo> = [
  { value: "角宿", kana: "かくしゅく" },
  { value: "亢宿", kana: "こうしゅく" },
  { value: "氐宿", kana: "ていしゅく" },
  { value: "房宿", kana: "ぼうしゅく" },
  { value: "心宿", kana: "しんしゅく" },
  { value: "尾宿", kana: "びしゅく" },
  { value: "箕宿", kana: "きしゅく" },
  { value: "斗宿", kana: "としゅく" },
  { value: "女宿", kana: "じょしゅく" },
  { value: "虚宿", kana: "きょしゅく" },
  { value: "危宿", kana: "きしゅく" },
  { value: "室宿", kana: "しっしゅく" },
  { value: "壁宿", kana: "へきしゅく" },
  { value: "奎宿", kana: "けいしゅく" },
  { value: "婁宿", kana: "ろうしゅく" },
  { value: "胃宿", kana: "いしゅく" },
  { value: "昴宿", kana: "ぼうしゅく" },
  { value: "畢宿", kana: "ひっしゅく" },
  { value: "觜宿", kana: "ししゅく" },
  { value: "参宿", kana: "さんしゅく" },
  { value: "井宿", kana: "せいしゅく" },
  { value: "鬼宿", kana: "きしゅく" },
  { value: "柳宿", kana: "りゅうしゅく" },
  { value: "星宿", kana: "せいしゅく" },
  { value: "張宿", kana: "ちょうしゅく" },
  { value: "翼宿", kana: "よくしゅく" },
  { value: "軫宿", kana: "しんしゅく" },
];

export const SIGN12: Array<CalendarInfo> = [
  { value: "水瓶座", kana: "みずがめ", startAt: 120 },
  { value: "魚座", kana: "うお", startAt: 219 },
  { value: "牡羊座", kana: "おひつじ", startAt: 321 },
  { value: "牡牛座", kana: "おうし", startAt: 420 },
  { value: "双子座", kana: "ふたご", startAt: 521 },
  { value: "蟹座", kana: "かに", startAt: 622 },
  { value: "獅子座", kana: "しし", startAt: 723 },
  { value: "乙女座", kana: "おとめ", startAt: 823 },
  { value: "天秤座", kana: "てんびん", startAt: 923 },
  { value: "蠍座", kana: "かに", startAt: 1024 },
  { value: "射手座", kana: "いて", startAt: 1123 },
  { value: "山羊座", kana: "やぎ", startAt: 1222 },
];

export const JUNISHI: Array<CalendarInfo> = [
  { value: "子", kana: "ね" },
  { value: "丑", kana: "うし" },
  { value: "寅", kana: "とら" },
  { value: "卯", kana: "う" },
  { value: "辰", kana: "たつ" },
  { value: "巳", kana: "み" },
  { value: "午", kana: "うま" },
  { value: "未", kana: "ひつじ" },
  { value: "申", kana: "さる" },
  { value: "酉", kana: "とり" },
  { value: "戌", kana: "いぬ" },
  { value: "亥", kana: "い" },
];

export const LUNA_PHASES: Array<CalendarInfo> = [
  { value: "新月", kana: "しんげつ" },
  { value: "繊月", kana: "せんげつ" },
  { value: "三日月", kana: "みかづき" },
  { value: "黄昏月", kana: "たそがれづき" },
  { value: "五日月", kana: "" },
  { value: "六日月", kana: "" },
  { value: "七日月", kana: "" },
  { value: "上弦月", kana: "じょうげんのつき" },
  { value: "九日月", kana: "" },
  { value: "十日夜月", kana: "とおかんやのつき" },
  { value: "十日余月", kana: "とおかあまりのつき" },
  { value: "十二日月", kana: "" },
  { value: "十三夜月", kana: "じゅうさんやづき" },
  { value: "待宵月", kana: "まちよいづき" },
  { value: "十五夜月", kana: "じゅうごやづき" },
  { value: "十六夜月", kana: "いざよいのつき" },
  { value: "立待月", kana: "たちまちづき" },
  { value: "居待月", kana: "いまちづき" },
  { value: "寝待月", kana: "ねまちづき" },
  { value: "更待月", kana: "ふけまちづき" },
  { value: "二十日余月", kana: "はつかあまりのつき" },
  { value: "二十二日月", kana: "" },
  { value: "下弦月", kana: "かげんのつき" },
  { value: "真夜中月", kana: "まよなかのつき" },
  { value: "二十五日月", kana: "" },
  { value: "暁月", kana: "ぎょうげつ" },
  { value: "二十七日月", kana: "" },
  { value: "二十八日月", kana: "" },
  { value: "二十九日月", kana: "" },
  { value: "月隠", kana: "つごもり" },
];
