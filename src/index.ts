import express from "express"
import {
  createPost,
  deletePostByID,
  getPostByID,
  getPosts,
  putPostByID,
} from "./handlers/posts"
import {
  createUser,
  deleteUserByID,
  getUserByID,
  getUsers,
  putUserByID,
} from "./handlers/users"

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

// users
app.get("/users", getUsers)
app.post("/users", createUser)
app.get("/users/:id", getUserByID)
app.put("/users/:id", putUserByID)
app.delete("/users/:id", deleteUserByID)

// posts
app.get("/posts", getPosts)
app.post("/posts", createPost)
app.get("/posts/:id", getPostByID)
app.put("/posts/:id", putPostByID)
app.delete("/posts/:id", deletePostByID)
