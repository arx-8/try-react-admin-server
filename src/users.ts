import type { Request, Response } from "express"

type User = {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: "User1", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" },
]

// 一覧取得
export const getUsers = (_req: Request, res: Response) => {
  res.type("application/json")
  res.send(JSON.stringify(users))
}
