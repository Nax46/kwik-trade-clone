// import { Router } from 'express'
// import { submitRegister } from '../controllers/register.controller.js'

// const router = Router()

// router.post('/', submitRegister)

// export default router


// import { Router } from 'express'
// import { submitRegister } from '../controllers/register.controller.js'

// const router = Router()

// router.post('/', submitRegister)

// router.get('/', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Register route working'
//   })
// })

// export default router



import { Router } from 'express'
import { submitRegister } from '../controllers/register.controller.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Register route working' })
})

router.post('/', submitRegister)

export default router