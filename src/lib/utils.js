import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertJsDateToMySqlDate(date) {
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();

  return year + "-" + month + "-" + day;
}

export function convertMySqlDateToJSDate(date) {
  let arr = date.split("-");

  let year = parseInt(arr[0]);
  let month = parseInt(arr[1]) - 1;
  let day = parseInt(arr[2]);
  let jsDate = new Date();
  jsDate.setFullYear(year, month, day);
  jsDate.setHours(0);
  jsDate.setMinutes(0);
  jsDate.setSeconds(0);
  jsDate.setMilliseconds(0);
  return jsDate;
}

export function sortCardsByDate(cards) {

  let upcoming = [];
  let gone = [];

  let today = new Date();

  for (let card of cards) {

    let date = card.date;
    let js_date = convertMySqlDateToJSDate(date);

    js_date.setDate(js_date.getDate() + 1);
    //card should appear for 1 day extra


    let date_year = js_date.getYear();
    let date_month = js_date.getMonth();
    let date_day = js_date.getDate();

    let today_year = today.getYear();

    let value = 0;

    value += ((date_year - today_year) * 10000);



    value += (date_month * 100);

    value += date_day;

    let temp = {
      card,
      val: value
    }



    if (js_date < today) gone.push(temp);
    else upcoming.push(temp);

  }


  gone.sort((ele_a, ele_b) => ele_a.val - ele_b.val);
  upcoming.sort((ele_a, ele_b) => ele_a.val - ele_b.val);

  cards = [...upcoming, ...gone];

  cards = cards.map(obj => obj.card);
  return cards;
}


export function generateTextJSX(text) {
  let str = "";
  for (let ch of text) {
    if (ch === "\r") str += "\n";
    else str += ch;
  }
  let arr = str.split("\n");
  let JSXArr = [];

  let index = 0;
  for (let temp of arr) {

    let temp_str = "";
    for (let ch of temp) {
      if (ch === "\t") temp_str += "    ";
      temp_str += ch;
    }
    JSXArr.push(
      <p key={index}>{temp_str}</p>
    )
    index++;
  }

  return JSXArr;
}


export function getLastSlug() {
  let slug = window.location.pathname.substring(1);
  if (slug.length > 1 && slug.charAt(slug.length - 1) === '/') {
    slug = slug.substring(0, slug.length - 1);
  }
  slug = slug.substring(slug.lastIndexOf("/") + 1);

  return slug;
}

export function isValidPhoneNumber(value) {

  const invalid_phone_numbers = [
    '0000000000', '1111111111', '2222222222', '3333333333', '4444444444',
    '5555555555', '6666666666', '7777777777', '8888888888', '9999999999',
    '1000000000', '2000000000', '3000000000', '4000000000', '5000000000',
    '6000000000', '7000000000', '8000000000', '9000000000', '0000000001',
    '0000000002', '0000000003', '0000000004', '0000000005', '0000000006',
    '0000000007', '0000000008', '0000000009', '9012345678', '0123456789',
    '1234567890', '2345678901', '3456789012', '4567890123', '5678901234',
    '6789012345', '7890123456', '8901234567', '9876543210', '8765432109',
    '7654321098', '6543210987', '1122334455', '9870123456', '6549873210',
    '3141592653', '5551212121', '1231231234', '9990001111', '4567890123',
    '5554443333', '3210987654', '1111222233', '5556667777', '9998887777',
    '1111000011', '7778889990'
  ];

  const enteredNumber = value.substring(String(value).indexOf(" ") + 1);

  let number = "";
  for (let digit of enteredNumber) {
    if ('0' <= digit && digit <= '9') number += digit;
  }
  if (number.length < 10) return false;


  if (invalid_phone_numbers.includes(number)) return false;

  return true;
}

export async function convertFileToBase64(file) {
  return await (
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const string = fileReader.result.substring(fileReader.result.indexOf(",") + 1);
        resolve(string);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    })
  );
};


export const isValidUrl = urlString => {
  try {
    return Boolean(new URL(urlString));
  }
  catch (e) {
    return false;
  }
}

export function formatIndianCurrency(num, formatOptions = { maximumFractionDigits: 2 }) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', ...formatOptions }).format(
    num,
  )
}

export function formatDateToDDMMYYYY(date) {
  // Ensure the date is a Date object
  if (!(date instanceof Date)) {
    throw new Error("The input must be a Date object.");
  }

  // Extract day, month, and year
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  // Pad day and month with leading zeros if necessary
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;

  // Format as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}


export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

