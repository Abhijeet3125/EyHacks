import express from "express";
import Claim from "../models/claim.model.js";
const router = express.Router();
import multer from 'multer'
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload/:claimID', upload.single('document'), async (req, res) => {
    const claim = await Claim.findOne({ claimID: req.params.claimID });
    if (claim) {
        claim.documents.push(req.file.path);
        await claim.save();
        res.send('Document uploaded');
    } else {
        res.status(404).send('Claim not found');
    }
});

export default router;