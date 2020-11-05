const convertDate = dateString => {

    let tanggal = new Date(dateString);

    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Ags", "Sep", "Okt", "Nov", "Dec"];

    return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()} ${jam(tanggal)}`
}
const convertDateOnly = dateString => {

  let tanggal = new Date(dateString);

  const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Ags", "Sep", "Okt", "Nov", "Dec"];

  return `${tanggal.getDate()} ${bulan[tanggal.getMonth()]} ${tanggal.getFullYear()}`
}
const convertDateHour = dateString => {

  let tanggal = new Date(dateString);

  return `${jam(tanggal)}`
}
function jam(tanggal) {
    var jam = tanggal.getHours();
    var menit = tanggal.getMinutes();
    menit = menit < 10 ? '0' + menit : menit;
    var strTime = jam + ':' + menit;
    return strTime;
}

