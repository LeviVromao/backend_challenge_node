import e = require('express')
import { config } from 'dotenv'
import router from './routes'
import cors = require('cors')
import swaggerUI = require("swagger-ui-express")
import swaggerDocument = require("../swagger.json")
config()
const app = e()

app.use(e.json())
app.use(cors())
app.use('/', router)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`App listening on port ${port}`));
}

export { app }