// import { Router } from 'express'
// import contactRoutes from './contact.routes.js'
// import healthRoutes from './health.routes.js'
// import registerRoutes from './register.routes.js'

// const router = Router()

// router.use('/health', healthRoutes)
// router.use('/contact', contactRoutes)
// router.use('/register', registerRoutes)

// export default router


// import { Router } from 'express'
// import contactRoutes from './contact.routes.js'
// import healthRoutes from './health.routes.js'
// import registerRoutes from './register.routes.js'

// const router = Router()

// router.use('/health', healthRoutes)
// router.use('/contact', contactRoutes)

// // Register route
// router.use('/register', registerRoutes)

// router.get('/', (req, res) => {
//   res.json({
//     success: true,
//     routes: [
//       '/api/health',
//       '/api/contact',
//       '/api/register'
//     ]
//   })
// })

// export default router




import { Router } from 'express'
import contactRoutes from './contact.routes.js'
import healthRoutes from './health.routes.js'
import registerRoutes from './register.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/contact', contactRoutes)
router.use('/register', registerRoutes)

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API working'
  })
})

export default router