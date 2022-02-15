import {db} from './sqlite';
export * from './sqlite';

export const table = (tname: string) => db.table(tname);
