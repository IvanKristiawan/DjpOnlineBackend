findNextKode = (dataLength, digitLength = 1) => {
  if (dataLength < 1) {
    return (1).toLocaleString("en-US", {
      minimumIntegerDigits: digitLength,
      useGrouping: false,
    });
  } else {
    let incrementLength = dataLength + 1;
    return incrementLength.toLocaleString("en-US", {
      minimumIntegerDigits: digitLength,
      useGrouping: false,
    });
  }
};

findNextKodeJenisCOA = (dataLength, digitLength = 1) => {
  if (dataLength < 0) {
    return (9).toLocaleString("en-US", {
      minimumIntegerDigits: digitLength,
      useGrouping: false,
    });
  } else {
    let incrementLength = dataLength + 1;
    return incrementLength.toLocaleString("en-US", {
      minimumIntegerDigits: digitLength,
      useGrouping: false,
    });
  }
};

findNextKodeSubGroupCOA = (dataLength, digitLength = 1) => {
  if (dataLength === 0) {
    return (0).toLocaleString("en-US", {
      minimumIntegerDigits: digitLength,
      useGrouping: false,
    });
  } else {
    let incrementLength = dataLength;
    return incrementLength.toLocaleString("en-US", {
      minimumIntegerDigits: digitLength,
      useGrouping: false,
    });
  }
};

// formatDate function will return dd-mm-yyyy for UI Indonesia
formatDate = (date) => {
  let tempDate = new Date(date);
  return `${tempDate.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${(tempDate.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${tempDate.getFullYear()}`;
};

formatTextToDate = (dateStr) => {
  // Split the input date string by '/'
  let [day, month, year] = dateStr.split("/");

  // Return the formatted date in 'YYYY-MM-DD'
  return `${year}-${month}-${day}`;
};

function countDays(t) {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor((t - d * cd) / ch),
    m = Math.round((t - d * cd - h * ch) / 60000),
    pad = function (n) {
      return n < 10 ? "0" + n : n;
    };
  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return d;
}

findTotalDays = (perTanggal, tglJatuhTempo) => {
  let d1 = new Date(perTanggal); //"now"
  let d2 = new Date(tglJatuhTempo); // some date
  let diff = Math.abs(d1 - d2);
  if (d1 > d2) return countDays(diff);
  return null;
};

findRomanDate = (month) => {
  let tempDateName;
  switch (month) {
    case 1:
      tempDateName = "I";
      break;
    case 2:
      tempDateName = "II";
      break;
    case 3:
      tempDateName = "III";
      break;
    case 4:
      tempDateName = "IV";
      break;
    case 5:
      tempDateName = "V";
      break;
    case 6:
      tempDateName = "VI";
      break;
    case 7:
      tempDateName = "VII";
      break;
    case 8:
      tempDateName = "VIII";
      break;
    case 9:
      tempDateName = "XI";
      break;
    case 10:
      tempDateName = "X";
      break;
    case 11:
      tempDateName = "XI";
      break;
    case 12:
      tempDateName = "XII";
      break;
    default:
      break;
  }
  return tempDateName;
};

customRound = (value) => {
  let integerPart = Math.floor(value);
  let decimalPart = value - integerPart;
  if (decimalPart >= 0.5) {
    return Math.ceil(value);
  } else {
    return integerPart;
  }
};

addMonths = (date, months) => {
  let tempDate = new Date(date);
  let d = tempDate.getDate();
  tempDate.setMonth(tempDate.getMonth() + +months - 1);
  if (tempDate.getDate() != d) {
    tempDate.setDate(0);
  }
  return tempDate;
};

let masaPajakList = [
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
];

getMonthIndex = (month) => {
  let index = masaPajakList.indexOf(month);
  if (index !== -1) {
    // Add 1 to the index and pad the result to 2 digits
    return String(index + 1).padStart(2, "0");
  } else {
    return "Month not found";
  }
};

getMonthName = (monthNumber) => {
  // Adjust for 0-based index (e.g., 11 -> "November")
  return masaPajakList[monthNumber - 1] || "Invalid month number";
};

generateIdBilling = () => {
  // Generate a random number and convert it to a string
  let randomNumber = Math.random().toString().slice(2); // Remove "0."

  // If the generated string is less than 15 characters, repeat the process
  while (randomNumber.length < 15) {
    randomNumber += Math.random().toString().slice(2); // Append more random digits
  }

  // Return the first 15 digits
  return randomNumber.slice(0, 15);
};

generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Uppercase letters and numbers
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Pick a random index
    result += characters[randomIndex]; // Append the character at that index
  }

  return result;
};

generateRandomNumberString = (length) => {
  let result = "";
  const characters = "0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

let namaDokumenOptions = [
  {
    kode: "01",
    label: "Faktur Pajak",
  },
  {
    kode: "02",
    label: "Invoice",
  },
  {
    kode: "03",
    label: "Pengumuman",
  },
  {
    kode: "04",
    label: "Surat Perjanjian",
  },
  {
    kode: "05",
    label: "Bukti Pembayaran",
  },
  {
    kode: "06",
    label: "Akta Perikatan",
  },
  {
    kode: "07",
    label: "Akta RUPS",
  },
  {
    kode: "08",
    label: "Surat Pernyataan",
  },
];

getNamaDokumenByKode = (kode) => {
  const document = namaDokumenOptions.find((item) => item.kode == kode);
  return document ? document.label : "Kode tidak ditemukan";
};

isNotDateFormat = (input) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return !regex.test(input); // returns true if the format does not match
};

formatNumberWithComma = (number) => {
  // Convert the number to a string and replace the dot with a comma if it exists
  return number.toString().replace(".", ",");
};

module.exports = {
  findNextKode,
  findNextKodeJenisCOA,
  findNextKodeSubGroupCOA,
  formatDate,
  formatTextToDate,
  countDays,
  findTotalDays,
  findRomanDate,
  customRound,
  addMonths,
  getMonthIndex,
  getMonthName,
  generateIdBilling,
  generateRandomString,
  generateRandomNumberString,
  getNamaDokumenByKode,
  isNotDateFormat,
  formatNumberWithComma,
};
