import express from 'express'


// import adminComponent from './admin';
import userComponent from './user';



const router = express.Router()


router.use('/users', userComponent);




export default router
