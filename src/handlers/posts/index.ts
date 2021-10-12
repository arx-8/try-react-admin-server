import type { Request, Response } from "express"
import { filter, flow, orderBy, slice } from "lodash/fp"
import { Post } from "../../domain/Post"
import {
  ErrorResponseBody,
  FlowAbleFunction,
  GetListRequestParams,
  ListResponse,
  orderTypes,
} from "../../utils/type"
import { objectKeys, toLowerCase } from "../../utils/utils"

type PostForPartialResponse = Pick<Post, "id">
type PostForNewCreate = Omit<Post, "id">

const data: Post[] = [
  {
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    userId: 1,
  },
  {
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    id: 2,
    title: "qui est esse",
    userId: 1,
  },
  {
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    userId: 1,
  },
  {
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    id: 4,
    title: "eum et est occaecati",
    userId: 1,
  },
  {
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    id: 5,
    title: "nesciunt quas odio",
    userId: 1,
  },
  {
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    userId: 1,
  },
  {
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
    id: 7,
    title: "magnam facilis autem",
    userId: 1,
  },
  {
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
    id: 8,
    title: "dolorem dolore est ipsam",
    userId: 1,
  },
  {
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    userId: 1,
  },
  {
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
    id: 10,
    title: "optio molestias id quia eum",
    userId: 1,
  },
  {
    body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
    id: 11,
    title: "et ea vero quia laudantium autem",
    userId: 2,
  },
  {
    body: "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
    id: 12,
    title: "in quibusdam tempore odit est dolorem",
    userId: 2,
  },
  {
    body: "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam",
    id: 13,
    title: "dolorum ut in voluptas mollitia et saepe quo animi",
    userId: 2,
  },
  {
    body: "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum",
    id: 14,
    title: "voluptatem eligendi optio",
    userId: 2,
  },
  {
    body: "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae",
    id: 15,
    title: "eveniet quod temporibus",
    userId: 2,
  },
  {
    body: "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta",
    id: 16,
    title:
      "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
    userId: 2,
  },
  {
    body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo",
    id: 17,
    title: "fugit voluptas sed molestias voluptatem provident",
    userId: 2,
  },
  {
    body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam",
    id: 18,
    title: "voluptate et itaque vero tempora molestiae",
    userId: 2,
  },
  {
    body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas",
    id: 19,
    title: "adipisci placeat illum aut reiciendis qui",
    userId: 2,
  },
  {
    body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo",
    id: 20,
    title: "doloribus ad provident suscipit at",
    userId: 2,
  },
  {
    body: "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt",
    id: 21,
    title: "asperiores ea ipsam voluptatibus modi minima quia sint",
    userId: 3,
  },
  {
    body: "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse",
    id: 22,
    title: "dolor sint quo a velit explicabo quia nam",
    userId: 3,
  },
  {
    body: "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis",
    id: 23,
    title: "maxime id vitae nihil numquam",
    userId: 3,
  },
  {
    body: "enim et ex nulla\nomnis voluptas quia qui\nvoluptatem consequatur numquam aliquam sunt\ntotam recusandae id dignissimos aut sed asperiores deserunt",
    id: 24,
    title: "autem hic labore sunt dolores incidunt",
    userId: 3,
  },
  {
    body: "ullam consequatur ut\nomnis quis sit vel consequuntur\nipsa eligendi ipsum molestiae et omnis error nostrum\nmolestiae illo tempore quia et distinctio",
    id: 25,
    title: "rem alias distinctio quo quis",
    userId: 3,
  },
  {
    body: "similique esse doloribus nihil accusamus\nomnis dolorem fuga consequuntur reprehenderit fugit recusandae temporibus\nperspiciatis cum ut laudantium\nomnis aut molestiae vel vero",
    id: 26,
    title: "est et quae odit qui non",
    userId: 3,
  },
  {
    body: "eum sed dolores ipsam sint possimus debitis occaecati\ndebitis qui qui et\nut placeat enim earum aut odit facilis\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur",
    id: 27,
    title: "quasi id et eos tenetur aut quo autem",
    userId: 3,
  },
  {
    body: "non et quaerat ex quae ad maiores\nmaiores recusandae totam aut blanditiis mollitia quas illo\nut voluptatibus voluptatem\nsimilique nostrum eum",
    id: 28,
    title: "delectus ullam et corporis nulla voluptas sequi",
    userId: 3,
  },
  {
    body: "odit magnam ut saepe sed non qui\ntempora atque nihil\naccusamus illum doloribus illo dolor\neligendi repudiandae odit magni similique sed cum maiores",
    id: 29,
    title: "iusto eius quod necessitatibus culpa ea",
    userId: 3,
  },
  {
    body: "alias dolor cumque\nimpedit blanditiis non eveniet odio maxime\nblanditiis amet eius quis tempora quia autem rem\na provident perspiciatis quia",
    id: 30,
    title: "a quo magni similique perferendis",
    userId: 3,
  },
  {
    body: "debitis eius sed quibusdam non quis consectetur vitae\nimpedit ut qui consequatur sed aut in\nquidem sit nostrum et maiores adipisci atque\nquaerat voluptatem adipisci repudiandae",
    id: 31,
    title: "ullam ut quidem id aut vel consequuntur",
    userId: 4,
  },
  {
    body: "deserunt eos nobis asperiores et hic\nest debitis repellat molestiae optio\nnihil ratione ut eos beatae quibusdam distinctio maiores\nearum voluptates et aut adipisci ea maiores voluptas maxime",
    id: 32,
    title: "doloremque illum aliquid sunt",
    userId: 4,
  },
  {
    body: "rerum ut et numquam laborum odit est sit\nid qui sint in\nquasi tenetur tempore aperiam et quaerat qui in\nrerum officiis sequi cumque quod",
    id: 33,
    title: "qui explicabo molestiae dolorem",
    userId: 4,
  },
  {
    body: "ea velit perferendis earum ut voluptatem voluptate itaque iusto\ntotam pariatur in\nnemo voluptatem voluptatem autem magni tempora minima in\nest distinctio qui assumenda accusamus dignissimos officia nesciunt nobis",
    id: 34,
    title: "magnam ut rerum iure",
    userId: 4,
  },
  {
    body: "nisi error delectus possimus ut eligendi vitae\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\nmodi ducimus quo illum voluptas eligendi\net nobis quia fugit",
    id: 35,
    title: "id nihil consequatur molestias animi provident",
    userId: 4,
  },
]

export const getPosts = (
  req: Request<never, never, never, GetListRequestParams<Post>>,
  res: Response<ListResponse<Post> | ErrorResponseBody>
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
    const predicate = (datum: Post): boolean => {
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

  const result: Post[] = flow(flowFuncs)(data)

  res.setHeader("x-total-count", data.length)
  res.send({
    data: result,
  })
}

export const getPostByID = (
  req: Request<{ id: string }>,
  res: Response<Post | ErrorResponseBody>
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

export const putPostByID = (
  req: Request<{ id: string }, unknown, Post>,
  res: Response<PostForPartialResponse | ErrorResponseBody>
): void => {
  res.type("application/json")

  const found = data.find((d) => d.id === Number(req.params.id))
  if (found == null) {
    res.statusCode = 404
    res.send({ message: "Data not found" })
    return
  }

  // エラー発生時の挙動確認のため
  if (req.body.title === "error") {
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

export const deletePostByID = (
  req: Request<{ id: string }, unknown>,
  res: Response<PostForPartialResponse | ErrorResponseBody>
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

export const createPost = (
  req: Request<never, PostForPartialResponse, PostForNewCreate>,
  res: Response<PostForPartialResponse | ErrorResponseBody>
): void => {
  res.type("application/json")

  const nextID = (data[data.length - 1]?.id ?? 0) + 1
  data.push({
    ...req.body,
    id: nextID,
  })

  res.send({ id: nextID })
}
