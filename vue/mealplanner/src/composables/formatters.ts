import { useI18n } from 'vue-i18n'

const getOrdinalSuffix = (day: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = day % 100;

  return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
};


function formatDate(date: Date): string {
  const { t } = useI18n()
  const month = date.getMonth() + 1; // 月は0から始まるため+1;
  const day = date.getDate();
  return t('date.format', { month, day });
}


export const useFormatDate = (date: Date): string => {
  const formattedDate = formatDate(date);
  console.log(formattedDate); // 出力例: 2月15日
  return formattedDate;

  // const day = date.getDate();
  // const month = date.toLocaleString("ja", {month: "long"});
  // const ordinal = getOrdinalSuffix(day);
  //
  // return `${day}${ordinal} of ${month}`;
};
