import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/index.js'

const __filename__ = fileURLToPath(import.meta.url);
const __dirname__ = path.dirname(__filename__);
dotenv.config();

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(express.json({ limit: '30mb' }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname__, 'public/assets')));
app.use(router);



const PORT = process.env.PORT || 3500;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
    })
    .catch(e => console.log('Error connecting: ', e.message))