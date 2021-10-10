import request from "supertest"
import { app } from "../.."
import { excludeUntestableHeaders } from "../../__tests__/testUtils"

describe("/users", () => {
  const agent = request(app)

  it("Get list", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get("/users")

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
          "content-length": "4094",
          "content-type": "application/json; charset=utf-8",
          "etag": "W/\\"ffe-j09SC4YQdLuMD8NwHHTG+5+578A\\"",
          "x-powered-by": "Express",
          "x-total-count": "10",
        }
      `)
      expect(resp.body).toMatchSnapshot()
    })
  })

  it("Get list with filters", async () => {
    // ## Arrange ##
    // ## Act ##
    const requested = agent.get("/users?_start=1&_end=3&_order=ASC&_sort=name")

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
    const requested = agent.get("/users/3")

    // ## Assert ##
    await requested.then((resp) => {
      expect(resp.statusCode).toStrictEqual(200)
      expect(excludeUntestableHeaders(resp.headers)).toMatchSnapshot()
      expect(resp.body).toMatchSnapshot()
    })
  })
})
