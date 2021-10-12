import type { Request, Response } from "express"
import { filter, flow, orderBy, slice } from "lodash/fp"
import { User } from "../../domain/User"
import {
  ErrorResponseBody,
  FlowAbleFunction,
  GetListRequestParams,
  ListResponse,
  orderTypes,
} from "../../utils/type"
import { objectKeys, toLowerCase } from "../../utils/utils"

type UserForPartialResponse = Pick<User, "id">
type UserForNewCreate = Omit<User, "id">

const data: User[] = [
  {
    address: {
      city: "Gwenborough",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
      street: "Kulas Light",
      suite: "Apt. 556",
      zipcode: "92998-3874",
    },
    company: {
      bs: "harness real-time e-markets",
      catchPhrase: "Multi-layered client-server neural-net",
      name: "Romaguera-Crona",
    },
    email: "Sincere@april.biz",
    id: 1,
    name: "Leanne Graham",
    phone: "1-770-736-8031 x56442",
    username: "Bret",
    website: "hildegard.org",
  },
  {
    address: {
      city: "Wisokyburgh",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
      street: "Victor Plains",
      suite: "Suite 879",
      zipcode: "90566-7771",
    },
    company: {
      bs: "synergize scalable supply-chains",
      catchPhrase: "Proactive didactic contingency",
      name: "Deckow-Crist",
    },
    email: "Shanna@melissa.tv",
    id: 2,
    name: "Ervin Howell",
    phone: "010-692-6593 x09125",
    username: "Antonette",
    website: "anastasia.net",
  },
  {
    address: {
      city: "McKenziehaven",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
      street: "Douglas Extension",
      suite: "Suite 847",
      zipcode: "59590-4157",
    },
    company: {
      bs: "e-enable strategic applications",
      catchPhrase: "Face to face bifurcated interface",
      name: "Romaguera-Jacobson",
    },
    email: "Nathan@yesenia.net",
    id: 3,
    name: "Clementine Bauch",
    phone: "1-463-123-4447",
    username: "Samantha",
    website: "ramiro.info",
  },
  {
    address: {
      city: "South Elvis",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
      street: "Hoeger Mall",
      suite: "Apt. 692",
      zipcode: "53919-4257",
    },
    company: {
      bs: "transition cutting-edge web services",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      name: "Robel-Corkery",
    },
    email: "Julianne.OConner@kory.org",
    id: 4,
    name: "Patricia Lebsack",
    phone: "493-170-9623 x156",
    username: "Karianne",
    website: "kale.biz",
  },
  {
    address: {
      city: "Roscoeview",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
      street: "Skiles Walks",
      suite: "Suite 351",
      zipcode: "33263",
    },
    company: {
      bs: "revolutionize end-to-end systems",
      catchPhrase: "User-centric fault-tolerant solution",
      name: "Keebler LLC",
    },
    email: "Lucio_Hettinger@annie.ca",
    id: 5,
    name: "Chelsey Dietrich",
    phone: "(254)954-1289",
    username: "Kamren",
    website: "demarco.info",
  },
  {
    address: {
      city: "South Christy",
      geo: {
        lat: "-71.4197",
        lng: "71.7478",
      },
      street: "Norberto Crossing",
      suite: "Apt. 950",
      zipcode: "23505-1337",
    },
    company: {
      bs: "e-enable innovative applications",
      catchPhrase: "Synchronised bottom-line interface",
      name: "Considine-Lockman",
    },
    email: "Karley_Dach@jasper.info",
    id: 6,
    name: "Mrs. Dennis Schulist",
    phone: "1-477-935-8478 x6430",
    username: "Leopoldo_Corkery",
    website: "ola.org",
  },
  {
    address: {
      city: "Howemouth",
      geo: {
        lat: "24.8918",
        lng: "21.8984",
      },
      street: "Rex Trail",
      suite: "Suite 280",
      zipcode: "58804-1099",
    },
    company: {
      bs: "generate enterprise e-tailers",
      catchPhrase: "Configurable multimedia task-force",
      name: "Johns Group",
    },
    email: "Telly.Hoeger@billy.biz",
    id: 7,
    name: "Kurtis Weissnat",
    phone: "210.067.6132",
    username: "Elwyn.Skiles",
    website: "elvis.io",
  },
  {
    address: {
      city: "Aliyaview",
      geo: {
        lat: "-14.3990",
        lng: "-120.7677",
      },
      street: "Ellsworth Summit",
      suite: "Suite 729",
      zipcode: "45169",
    },
    company: {
      bs: "e-enable extensible e-tailers",
      catchPhrase: "Implemented secondary concept",
      name: "Abernathy Group",
    },
    email: "Sherwood@rosamond.me",
    id: 8,
    name: "Nicholas Runolfsdottir V",
    phone: "586.493.6943 x140",
    username: "Maxime_Nienow",
    website: "jacynthe.com",
  },
  {
    address: {
      city: "Bartholomebury",
      geo: {
        lat: "24.6463",
        lng: "-168.8889",
      },
      street: "Dayna Park",
      suite: "Suite 449",
      zipcode: "76495-3109",
    },
    company: {
      bs: "aggregate real-time technologies",
      catchPhrase: "Switchable contextually-based project",
      name: "Yost and Sons",
    },
    email: "Chaim_McDermott@dana.io",
    id: 9,
    name: "Glenna Reichert",
    phone: "(775)976-6794 x41206",
    username: "Delphine",
    website: "conrad.com",
  },
  {
    address: {
      city: "Lebsackbury",
      geo: {
        lat: "-38.2386",
        lng: "57.2232",
      },
      street: "Kattie Turnpike",
      suite: "Suite 198",
      zipcode: "31428-2261",
    },
    company: {
      bs: "target end-to-end models",
      catchPhrase: "Centralized empowering task-force",
      name: "Hoeger LLC",
    },
    email: "Rey.Padberg@karina.biz",
    id: 10,
    name: "Clementina DuBuque",
    phone: "024-648-3804",
    username: "Moriah.Stanton",
    website: "ambrose.net",
  },
]

export const getUsers = (
  req: Request<never, never, never, GetListRequestParams<User>>,
  res: Response<ListResponse<User> | ErrorResponseBody>
): void => {
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
  const flowFuncs: FlowAbleFunction[] = []

  // filter
  if (req.query.id != null) {
    const predicate = (datum: User): boolean => {
      if (Array.isArray(req.query.id)) {
        return req.query.id.map(Number).includes(datum.id)
      } else {
        return Number(req.query.id) === datum.id
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flowFuncs.push(filter(predicate as any))
  }

  // sort
  if (req.query._sort != null && req.query._order != null) {
    flowFuncs.push(orderBy([req.query._sort], [toLowerCase(req.query._order)]))
  }

  // pagination
  flowFuncs.push(slice(maybeStart ?? 0, maybeEnd ?? 10))

  const result: User[] = flow(flowFuncs)(data)

  res.setHeader("x-total-count", data.length)
  res.send({
    data: result,
  })
}

export const getUserByID = (
  req: Request<{ id: string }>,
  res: Response<User | ErrorResponseBody>
): void => {
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
): void => {
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
): void => {
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
): void => {
  res.type("application/json")

  const nextID = (data[data.length - 1]?.id ?? 0) + 1
  data.push({
    ...req.body,
    id: nextID,
  })

  res.send({ id: nextID })
}
