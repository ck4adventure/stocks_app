import express from 'express';
const apiRouter = express.Router();
import { getStocks, addStocks } from '../controllers/api.js';

apiRouter.get('/stocks', getStocks);
apiRouter.post('/stocks', addStocks);

export default apiRouter;