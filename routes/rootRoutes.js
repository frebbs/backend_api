import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "GET: Root Hit with new setup"
    })
})

export default router