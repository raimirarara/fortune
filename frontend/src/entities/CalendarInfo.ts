import JapaneseLunisolarCalendar from "./JapaneseLunisolarCalendar";

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
  let index = (calendar.day % 27) - 1;
  if (index == -1) {
    index = 26;
  }
  return cyclicalASTROLOGY27 && cyclicalASTROLOGY27[index];
};

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
  { value: "底宿", kana: "ていしゅく" },
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
