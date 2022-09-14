import { Router } from "express";
import * as authCtrl from '../controllers/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/signup', authCtrl.signup_get)
router.post('/signup', authCtrl.signup_post)
router.get('/login', authCtrl.login_get)
router.post('/login', authCtrl.login_post)


/*---------- Protected Routes ----------*/

export {router}