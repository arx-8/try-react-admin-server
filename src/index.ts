import express from "express"
import { getPosts } from "./posts"
import {
  createUser,
  deleteUserByID,
  getUserByID,
  getUsers,
  putUserByID,
} from "./users"

const app: express.Express = express()
app.use(express.json())

// for CORS
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

    const arrowedHeaders = ["authorization", "x-total-count", "content-type"]
    res.header("access-control-allow-headers", arrowedHeaders)
    res.header("access-control-expose-headers", arrowedHeaders)
    next()
  }
)

app.listen(9999, () => {
  console.log("Start on http://localhost:9999/")
})

app.get("/users", getUsers)
app.get("/users/:id", getUserByID)
app.post("/users", createUser)
app.put("/users/:id", putUserByID)
app.delete("/users/:id", deleteUserByID)
app.get("/posts", getPosts)
