const jsonServer = require('json-server') // eslint-disable-line import/no-extraneous-dependencies

const server = jsonServer.create()
const router = jsonServer.router('./scripts/json-server/routes.json')
const defaults = {
  static: './cypress/fixtures',
}
const middlewares = jsonServer.defaults(defaults)
server.use(middlewares)

const options = {
  root: './cypress/fixtures',
}
server.get('/api/:id?', (req, res) => {
  let apiVersion
  if (req.get('Accept') === 'application/ld+jsonprofile="http://iiif.io/api/presentation/3/context.json"') {
    apiVersion = '3'
  } else {
    apiVersion = '2'
  }
  const fileId = req.params.id
  res.sendFile(`/version-${apiVersion}/${fileId}.json`, options)
})

server.use(router)
server.listen(8000, () => {})
