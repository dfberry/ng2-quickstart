import { Url } from './url';
export * from './counter';
export * from './url';

export interface AppState {
  counter: number;
  urls : Url[];
  nextUrlId: number;
}

