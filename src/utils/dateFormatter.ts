export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}.${month}.${year} в ${hours}:${minutes}`;
}
export function getPluralWord(
  value: number,
  one: string,
  two: string,
  five: string,
) {
  const decimal = Math.abs(value) % 100;
  const elementary = Math.abs(decimal) % 10;
  const isException = decimal > 10 && decimal < 20;
  if (isException) {
    return five;
  } else if (elementary === 1) {
    return one;
  } else if (elementary > 1 && elementary < 5) {
    return two;
  } else {
    return five;
  }
}
export function formatDuration(durationData: number) {
  let hours = Math.floor(durationData / 60);
  const minutes = durationData % 60;

  let days;
  if (hours < 24) {
    const pluralHours = getPluralWord(hours, "час", "часа", "часов");
    const pluralMinutes = getPluralWord(minutes, "минута", "минуты", "минут");
    return (
      `${hours ? `${hours} ${pluralHours}` : ""}` +
      ` ${minutes ? `${minutes} ${pluralMinutes}` : ""}`
    );
  }
  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours = hours % 24;

    const pluralDays = getPluralWord(days, "день", "дня", "дней");
    const pluralHours = getPluralWord(hours, "час", "часа", "часов");
    const pluralMinutes = getPluralWord(minutes, "минута", "минуты", "минут");
    return (
      `${days ? ` ${days} ${pluralDays}` : ""}` +
      ` ${hours ? `${hours} ${pluralHours}` : ""}` +
      ` ${minutes ? `${minutes} ${pluralMinutes}` : ""}`
    );
  }
}
