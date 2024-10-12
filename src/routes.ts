import e = require('express')
import { contactController } from './useCases/ContactUser'

const router = e.Router()

router.post('/contact', async (req, res) => {
    try {
        await contactController.handle(req, res);
        return
      } catch (error) {
        res.status(500).send('Internal Server Error');
        return
    }
})

export default router