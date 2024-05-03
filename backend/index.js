import express from 'express';
import cors from 'cors';
// import path from 'path';

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

import apiRouter from './routes/api.js';

// Serve the frontend on the root URL after running `npm run build`
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

app.use('/api', apiRouter);


app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});