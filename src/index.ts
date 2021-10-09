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
    res.header("access-control-allow-origin", "*")
    res.header("access-control-allow-methods", [
      "DELETE",
      "GET",
      "OPTIONS",
      "POST",
      "PUT",
    ])

    const arrowedHeaders = ["authorization", "x-total-count"]
    res.header("access-control-allow-headers", arrowedHeaders)
    res.header("access-control-expose-headers", arrowedHeaders)
    next()
  }
)

app.listen(9999, () => {
  console.log("Start on http://localhost:9999/")
})

app.get("/users", getUsers)
app.get("/posts", getPosts)
