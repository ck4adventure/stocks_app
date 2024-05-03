import express from 'express';
import path from 'path';
const PORT = 3000;
const app = express();

// Serve the frontend on the root URL after running `npm run build`
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});