import * as express from 'express';

import authComponent from './auth';
import dashboardComponent from './dashboard';



const router = express.Router();

router.use('/auth', authComponent);
router.use('/dashboard', dashboardComponent);


export default router;
