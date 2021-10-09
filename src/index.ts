import express from "express"
import { getPosts } from "./posts"
import { getUsers } from "./users"

const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS 対応（というか完全無防備：本番環境ではだめ絶対）
app.use(
  (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
  }
)

app.listen(9999, () => {
  console.log("Start on http://localhost:9999/")
})

app.get("/users", getUsers)
app.get("/posts", getPosts)
