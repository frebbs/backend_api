import express from 'express';
import { createClient } from 'redis';

import passport from 'passport';
import './config/passport-config.js';

const app = express();
const PORT = 8080;

const client = createClient({
    url: 'redis://localhost:6379'
});
client.connect();

import rootRouter from './routes/rootRoutes.js'
import userRouter from './routes/userRoutes.js'

app.use([
    express.json(),
    express.urlencoded({extended: true}),
    passport.initialize(undefined)
])

app.use('/', rootRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})