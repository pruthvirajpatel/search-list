import { Injectable } from '@angular/core';
@Injectable()
export class AppService {
  FAILURE_COEFF = 10;
  MAX_SERVER_LATENCY = 200;
  constructor() { }
  getRandomBool(n): boolean {
    const maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) {
      n = maxRandomCoeff;
    }
    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
  }

  getSuggestions(text) {
    const pre = 'pre';
    const post = 'post';
    const results = [];
    if (this.getRandomBool(2)) {
      results.push(pre + text);
    }
    if (this.getRandomBool(2)) {
      results.push(text);
    }
    if (this.getRandomBool(2)) {
      results.push(text + post);
    }
    if (this.getRandomBool(2)) {
      results.push(pre + text + post);
    }
    return new Promise((resolve, reject) => {
      const randomTimeout = Math.random() * this.MAX_SERVER_LATENCY;
      setTimeout(() => {
        if (this.getRandomBool(this.FAILURE_COEFF)) {
          reject();
        } else {
          resolve(results);
        }
      }, randomTimeout);
    });
  }

}
