import express from "express"
import request from "supertest"

const app = express()

app.get("/user", function (_req, res) {
  res.status(200).json({ name: "john" })
})

describe("/users", () => {
  const agent = request(app)

  it("example", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get("/user")

    // ## Assert ##q
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(resp.body).toMatchInlineSnapshot(`
        Object {
          "name": "john",
        }
      `)
    })
  })
})
