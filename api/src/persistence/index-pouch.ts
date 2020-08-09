import * as PouchDB from 'pouchdb';
import * as find from 'pouchdb-find';
import * as rel from 'relational-pouch';

export class InitDB {
  public baseDB: any;
  constructor() {
    PouchDB
      .plugin(find)
      .plugin(rel)
    this.baseDB = new PouchDB('pos')
  }
}