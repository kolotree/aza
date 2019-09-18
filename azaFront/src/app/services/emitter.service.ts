import {EventEmitter} from '@angular/core';

export class EmitterService {
  private static emitters: { [channel: string]: EventEmitter<any> } = {};
  static get(channel: string): EventEmitter<any> {
    if (!this.emitters[channel]) {
      this.emitters[channel] = new EventEmitter();
    }
    return this.emitters[channel];
  }
}
