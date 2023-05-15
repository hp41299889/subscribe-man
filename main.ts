import express from "express";
import cors from 'cors';

import { appConfig } from "config/config";

const app = express();
app.use(express.json());
app.use(cors());

const appInit = () => {
    app.listen(appConfig.port, () => {
        console.log('app is running on port 5000');
    });
};

appInit();