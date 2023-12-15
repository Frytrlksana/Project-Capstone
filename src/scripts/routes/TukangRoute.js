import express from "express";
import {
    getTukangs,
    getTukangById,
    saveTukang,
    updateTukang,
    deleteTukang
} from "../controllers/TukangController.js";

const router = express.Router();

router.get('/tukangs', getTukangs);
router.get('/tukangs/:id', getTukangById);
router.post('/tukangs', saveTukang);
router.patch('/tukangs/:id', updateTukang);
router.delete('/tukangs/:id', deleteTukang);

export default router;