import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

declare var require: any;
const SECRET_KEY: any = 'secret_key';
const SecureStorage = require('secure-web-storage');

@Injectable({
  providedIn: 'root'
})
export class EncDecService {
  constructor() {}
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: string | CryptoJS.lib.WordArray): any {
      key = CryptoJS.SHA256(key, SECRET_KEY);
      return key.toString();
    },
    // Encrypt the localstorage data
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    // Decrypt the encrypted data
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    },
  });
}
