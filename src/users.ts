import type { Request, Response } from "express"
import { flow, orderBy, slice } from "lodash/fp"
import type { User } from "./domain/User"
import { NumberLike, OrderType, orderTypes } from "./type"
import { objectKeys, toLowerCase } from "./utils"

type UserForPartialResponse = Pick<User, "id">
type UserForNewCreate = Omit<User, "id">

const data: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    address: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: {
        lat: "-71.4197",
        lng: "71.7478",
      },
    },
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    company: {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
    },
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    address: {
      street: "Rex Trail",
      suite: "Suite 280",
      city: "Howemouth",
      zipcode: "58804-1099",
      geo: {
        lat: "24.8918",
        lng: "21.8984",
      },
    },
    phone: "210.067.6132",
    website: "elvis.io",
    company: {
      name: "Johns Group",
      catchPhrase: "Configurable multimedia task-force",
      bs: "generate enterprise e-tailers",
    },
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    address: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: {
        lat: "-14.3990",
        lng: "-120.7677",
      },
    },
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
    company: {
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers",
    },
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    address: {
      street: "Dayna Park",
      suite: "Suite 449",
      city: "Bartholomebury",
      zipcode: "76495-3109",
      geo: {
        lat: "24.6463",
        lng: "-168.8889",
      },
    },
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    company: {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
    },
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    address: {
      street: "Kattie Turnpike",
      suite: "Suite 198",
      city: "Lebsackbury",
      zipcode: "31428-2261",
      geo: {
        lat: "-38.2386",
        lng: "57.2232",
      },
    },
    phone: "024-648-3804",
    website: "ambrose.net",
    company: {
      name: "Hoeger LLC",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models",
    },
  },
]

type ErrorResponseBody = {
  message: string
}

export const getUsers = (
  req: Request<
    never,
    never,
    never,
    Partial<{
      _end: NumberLike
      _order: OrderType
      _sort: keyof User
      _start: NumberLike
    }>
  >,
  res: Response<User[] | ErrorResponseBody>
) => {
  res.type("application/json")

  // validation
  const maybeStart = req.query._start ? Number(req.query._start) : undefined
  if (maybeStart != null && isNaN(maybeStart)) {
    res.statusCode = 400
    res.send({ message: `_start is invalid: ${req.query._start}` })
    return
  }
  const maybeEnd = req.query._end ? Number(req.query._end) : undefined
  if (maybeEnd != null && isNaN(maybeEnd)) {
    res.statusCode = 400
    res.send({ message: `_end is invalid: ${req.query._end}` })
    return
  }
  if (maybeStart != null && maybeEnd != null && maybeEnd < maybeStart) {
    res.statusCode = 400
    res.send({
      message: `Must be "_start < _end": _start:${maybeStart}, _end:${maybeEnd}`,
    })
    return
  }
  if (req.query._order != null && !orderTypes.includes(req.query._order)) {
    res.statusCode = 400
    res.send({ message: `_order is invalid: ${req.query._order}` })
    return
  }

  // sql 同様、filter, sort, pagination の順で実行する

  // sort
  const flowFuncs: (<T>(collection: T[]) => T[])[] = []
  if (req.query._sort != null && req.query._order != null) {
    flowFuncs.push(orderBy([req.query._sort], [toLowerCase(req.query._order)]))
  }

  // pagination
  flowFuncs.push(slice(maybeStart ?? 0, maybeEnd ?? 10))

  const result = flow(flowFuncs)(data)

  res.setHeader("x-total-count", result.length)
  res.send(result)
}

export const getUserByID = (req: Request<{ id: string }>, res: Response) => {
  res.type("application/json")

  const found = data.find((d) => d.id === Number(req.params.id))
  if (found == null) {
    res.statusCode = 404
    res.send({ message: "Data not found" })
    return
  }
  res.send(found)
}

export const putUserByID = (
  req: Request<{ id: string }, unknown, User>,
  res: Response<UserForPartialResponse | ErrorResponseBody>
) => {
  res.type("application/json")

  const found = data.find((d) => d.id === Number(req.params.id))
  if (found == null) {
    res.statusCode = 404
    res.send({ message: "Data not found" })
    return
  }

  // エラー発生時の挙動確認のため
  if (req.body.name === "error") {
    res.statusCode = 400
    res.send({
      message: "Bad request",
    })
    return
  }

  objectKeys(found).forEach((key) => {
    // @ts-expect-error 問題ない get value by key
    found[key] = req.body[key]
  })

  res.send({ id: found.id })
}

export const deleteUserByID = (
  req: Request<{ id: string }, unknown>,
  res: Response<UserForPartialResponse | ErrorResponseBody>
) => {
  res.type("application/json")

  const foundIndex = data.findIndex((d) => d.id === Number(req.params.id))
  const found = data[foundIndex]
  if (foundIndex == null || found == null) {
    res.statusCode = 404
    res.send({ message: "Data not found" })
    return
  }

  data.splice(foundIndex, 1)

  res.send({ id: found.id })
}

export const createUser = (
  req: Request<never, UserForPartialResponse, UserForNewCreate>,
  res: Response<UserForPartialResponse | ErrorResponseBody>
) => {
  res.type("application/json")

  const nextID = (data[data.length - 1]?.id ?? 0) + 1
  data.push({
    ...req.body,
    id: nextID,
  })

  res.send({ id: nextID })
}
