import { InitDB } from "../persistence/index-pouch";

const db = new InitDB().baseDB

db.setSchema([{
  singular: 'customer',
  plural: 'customers'
}])

export default db