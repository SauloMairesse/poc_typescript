import express from 'express'
import router from './routers/router';

const app = express()
app.use(express.json())

//router
app.use(router)
    
const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(`Funfando na porta: ${PORT}`)
})