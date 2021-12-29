import { v4 } from "uuid";

const timeout = 20_000;
const uidToValue = {};

export function createUid() {
  return v4();
}

export function saveUid(uid) {
  uidToValue[uid] = null;
}

export function hasUid(uid) {
  return Object.keys(uidToValue).includes(uid);
}

export function getValueByUid(uid) {
  return uidToValue[uid];
}

export function setValueByUid(uid) {
  console.log("start");

  setTimeout(() => {
    console.log("finish");

    uidToValue[uid] = Date.now();
  }, timeout);
}

export function removeValueByUid(uid) {
  if (uidToValue.hasOwnProperty(uid)) {
    delete uidToValue[uid];
  }
}
