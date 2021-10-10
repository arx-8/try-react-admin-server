import request from "supertest"
import { app } from "../.."
import { excludeUntestableHeaders } from "../../__tests__/testUtils"

describe("/posts", () => {
  const agent = request(app)

  it("Get list", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get("/posts")

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchInlineSnapshot(`
        Object {
          "access-control-allow-headers": "authorization, x-total-count, content-type",
          "access-control-allow-methods": "DELETE, GET, OPTIONS, POST, PUT",
          "access-control-allow-origin": "*",
          "access-control-expose-headers": "authorization, x-total-count, content-type",
          "connection": "close",
          "content-length": "2425",
          "content-type": "application/json; charset=utf-8",
          "etag": "W/\\"979-lrX42kIYjA4vz22AWe2Rm5UiKus\\"",
          "x-powered-by": "Express",
          "x-total-count": "35",
        }
      `)
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Get list with filters", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get(
      "/posts?_start=1&_end=3&_order=DESC&_sort=title"
    )

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Get list with filters by id", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get("/posts?id=9")

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Get list with filters by ids", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get("/posts?id=1&id=9")

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Get details", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get("/posts/2")

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Create", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.post("/posts").send({
      body: "A new body",
      title: "A new title",
      userId: 2,
    })

    // ## Assert ##
    let id
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()

      id = resp.body.id
    })

    // get again
    await agent.get(`/posts/${id}`).then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Update", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.put("/posts/3").send({
      body: "A edited body",
      id: 3,
      title: "A edited title",
      userId: 3,
    })

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })

    // get again
    await agent.get("/posts/3").then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Delete", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.delete("/posts/4")

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Delete (Not found)", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.delete("/posts/99999999999999999")

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(404)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })
})
