import { TIMEOUT_SEC } from '../config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  //her conditionally refactor(combined to a single function) getJSON and sendJSON function to request using fetch() function
};
export const getJSON = async function (url) {
  try {
    // const res = await fetch(url);
    //promise.race will resolve the promise which will be done first
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    //if we want to get this error into our model.js then we have to rethrough the error
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    //here we can use the same promise race for a timeout functions
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    //if we want to get this error into our model.js then we have to rethrough the error
    throw err;
  }
};
