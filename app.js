import express from 'express';
const app = express();

const PORT = 8080;

let myVar = 10;

app.use([
    express.json(),
    express.urlencoded({extended: true})
])

app.get('/', (req, res) => {
    res.json({
        message: "GET: Root Hit"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})