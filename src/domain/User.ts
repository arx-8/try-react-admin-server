type Company = {
  bs: string
  catchPhrase: string
  name: string
}

type Geo = {
  lat: string
  lng: string
}

type Address = {
  city: string
  geo: Geo
  street: string
  suite: string
  zipcode: string
}

export type User = {
  address: Address
  company: Company
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}
