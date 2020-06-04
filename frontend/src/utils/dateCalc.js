function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
export const getDay = (someDate) => {
  const today = new Date();
  if (
    someDate.getFullYear() === today.getFullYear() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getDate() === today.getDate()
  ) {
    return 'Bugün';
  } else if (
    someDate.getFullYear() === today.getFullYear() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getDate() + 1 === today.getDate()
  ) {
    return 'Dün';
  } else {
    const diff = dateDiffInDays(someDate, today);
    const year = Math.floor(diff / 365);
    const month = Math.floor((diff % 365) / 30);
    const day = Math.floor((diff % 365) % 30);
    let s = '';
    if (year != 0) {
      s += `${year} yıl`;
    }
    if (month != 0) {
      s += `${month} ay`;
    }
    if (day != 0) {
      s += `${day} gün`;
    }
    return s + ' önce';
  }
};
