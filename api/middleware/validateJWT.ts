import * as jwtService from "jsonwebtoken"

export const validateJWT = (req, res, next) => {
  const jwt = req.headers.authorization
  const { username } = req.params
  const privateKey = 'ng-challenge'

  jwtService.verify(jwt, privateKey, (error, info) => {
    if (error) {
      res.status(403).end()
      return
    }
    if(info.username !== username) return res.status(500).send(`Token does not belong to this user`)
    next()
  })
}