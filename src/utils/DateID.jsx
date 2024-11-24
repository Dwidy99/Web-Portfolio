export default function DateID(date) {
  let e = date.getData();
  return `${e} ${
    [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ][date.getMatch()]
  } ${date.getFullYear()}`;
}
