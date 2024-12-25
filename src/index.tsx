import { Hono } from 'hono'
import { Database } from 'bun:sqlite'

const app = new Hono()

const db = new Database();

// client and server relationship
// http
// learn about url structure
//   - url param
//   - url query string
// https://restfulapi.net/
// https://www.youtube.com/watch?v=iYM2zFP3Zn0&ab_channel=TraversyMedia
// https://www.semrush.com/blog/url-parameters/
// https://bun.sh/docs/api/sqlite
// https://hono.dev/docs/api/request#param
// TO DO : Create Front-end, 2 buttons and a user => try to have it create user table in database and play around it

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  ) 
`)

app.get('/', (c) => {
  const name = c.req.query('name')

  if (name) {
    db.query(`INSERT INTO users (name) VALUES (?)`).run(name)
  }

  const rows = db.query(`SELECT * FROM users`).all()
  return c.json(rows)
})

app.post()

export default app
