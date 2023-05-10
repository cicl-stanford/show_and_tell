import moment from "moment";
import {getPostURL} from "../config";
const stringify = require('json-stable-stringify');
const CryptoJS = require("crypto-js");
const _ = require('lodash');


export const timeFormat = "YYYY-MM-DD HH:mm:ss:SSSS (ZZ)";
export const randomWords = [
  'Ber 90', 'Cor 10,000', 'Dax 800', 'Fep 393', 'Gel 190', 'Hux 920', 'Jat 820',
  'Kip 383', 'Liv 283', 'Mox 123', 'Nox 184', 'Por 78', 'Quex 10', 'Rix 2097',
  'Swy 313', 'Tus 29', 'Vas 11', 'Wex 29', 'Yex 800', 'Zup 57'
];

export function now() {
  return moment().format(timeFormat);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isNumeric(str: string) {
  /**
   * Checks if a string is a number.
   * See https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
   */
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(+str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function parseString(str: string) {
  /**
   * Attempts to parse a string into a correct primitive.
   * Currently supports booleans and numbers.
   * If no type fits, returns the original string.
   */
  let s = str.toLowerCase();
  if (s === 'true' || s === 'false') {
    return s === 'true';
  } else if (isNumeric(s)) {
    return +s;
  } else {
    return s;
  }
}



export function mapToObject(collection: any[], f: (item: any) => [string, any]) {
  /**
   * Creates an object where each key-value is based on an item in the collection.
   * Function f takes an item from collection and returns a length-2 list, where
   * the first item represents the key in the return object and
   * the second item represents the value for the corresponding key in the return object.
   *
   * Assuming no two items in the collection map to the same key, returns an object with the same
   * number of items as the collection.
   */
  const obj: any = {};
  for (let item of collection) {
    let kv = f(item);
    obj[kv[0]] = kv[1];
  }
  return obj;
}



export function round(n: number, to: number, precision?: number) {

  let rounded = Math.round(n / to) * to;
  if (rounded === 0) {
    return 0; // prevents -0
  }

  if (precision === undefined) {
    precision = Number.isInteger(to) ? 0 : to.toString().split('.')[1].length;
  }
  rounded = parseFloat(Number.parseFloat(rounded.toString()).toFixed(precision));

  return rounded;
}

export function toUSD(n: number) {
  n = round(n, 1e-2, 2);
  let s = n.toString().split('.');
  let precision = 2;
  if (s.length > 1) {
    precision = Math.max(2, s[1].length);
  }
  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: precision
  });
  return usdFormatter.format(n);
}

export function getMidpoint(x1, y1, x2, y2) {
  return [(x1 + x2)/2, (y1 + y2)/2];
}


/**
 * Web IO related
 */
export function getUrlParams() {
  const params = new URL(window.location.href).searchParams;
  const keys = Array.from(params.keys());
  const values = _.map(keys, (k: string) => parseString(params.get(k)));
  return _.zipObject(keys, values);
}

/**
 * Reads a JSON file in the 'public' directory
 * @param filename
 */
export function loadJSON(filename: string) {
  filename = process.env.PUBLIC_URL + filename;
  return new Promise(resolve => {
    fetch(filename)
      .then(response => response.json())
      .then(body => { resolve(body); })
      .catch(function (error: any) {
        console.log(error);
        return false;
      })
  });
}

export const httpGet = async (url: string): Promise<any> => {
  return new Promise(resolve => {
    fetch(url, {
      mode: 'cors', headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },)
      .then(response => response.json())
      .then(body => {
        resolve(body);
      });
  });
};

async function attemptPost(filename: string, data: any) {
  const stringForm = stringify(data);
  const body = JSON.stringify({
    "filename": filename,
    "postTime": moment().format(timeFormat),
    "content": stringForm
  });
  const checksum = CryptoJS.MD5(stringForm).toString();
  return await fetch(getPostURL(), {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: body
  }).then(response => response.text())
    .then(function (response: any) {
      const result = response === checksum;
      if (result) {
        return true;
      } else {
        return false;
      }
    })
    .catch(function (error: any) {
      console.log(error);
      return false;
    });
}

/**
 * Attempts to post data with filename to Config.postURL
 * Uses exponential backoff
 * TODO: implement something for when post fails
 * @param filename
 * @param data
 * @param wait: whether or not to wait for success response
 */
export async function httpPost(filename: string, data: any, wait: boolean) {
  let retry = true;
  let i = 1;
  if (wait) {
    while (retry) {
      console.log(`Attempt with await ${i}: posting to ${filename}`);
      retry = !await attemptPost(filename, data);
      i += 1;
      await sleep(Math.min(8000, Math.pow(2, i)*50)); // exponential backoff
    }
    console.log("Post success!");
  } else {
    console.log(`Posting to ${filename}`);
    attemptPost(filename, data);
  }
}