import e = require('express')
import { config } from 'dotenv'
import router from './routes'
import cors = require('cors')
config()
const app = e()

app.use(e.json())
app.use(cors())
app.use('/', router)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`App listening on port ${port}`));
}

export { app }