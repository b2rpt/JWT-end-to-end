import express from 'express';
import type { Request, Response } from 'express'; 
import { PORT } from './src/const/const.ts';
import router from './src/routes/index.ts';
import connectDataBase from './src/db/db.ts';

connectDataBase();
const app = express();
app.use(express.json());

app.get('/test', (req:Request,res:Response)=>{
    res.send('this test page')
});

app.use('/api', router)
app.listen(PORT,()=>console.log(`server started on port ${PORT}`))