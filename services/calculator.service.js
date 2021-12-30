import { v4 } from "uuid";

class CalculatorService {
  #timeout = 1;
  #uidToValue = {};

  constructor(timeout, uidToValue) {
    this.#timeout = timeout;
    this.#uidToValue = uidToValue;
  }

  getUid() {
    return v4();
  }

  saveUid(uid) {
    this.#uidToValue[uid] = null;
  }

  hasUid(uid) {
    return Object.keys(this.#uidToValue).includes(uid);
  }

  getValueByUid(uid) {
    return this.#uidToValue[uid];
  }

  setValueByUid(uid) {
    setTimeout(() => {
      this.#uidToValue[uid] = Date.now();
    }, this.#timeout);
  }

  removeValueByUid(uid) {
    if (this.#uidToValue.hasOwnProperty(uid)) {
      delete this.#uidToValue[uid];
    }
  }
}

export default new CalculatorService(20_000, {});
