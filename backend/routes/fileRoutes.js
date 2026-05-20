const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const File = require("../models/File");


// STORAGE

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        const uploadPath = "uploads/";

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({
    storage: storage
});


// UPLOAD FILE

router.post(
    "/upload",
    upload.single("file"),
    async (req, res) => {

        try {

            const newFile = new File({

                filename: req.file.filename,

                originalname: req.file.originalname,

                path: req.file.path,

                size: req.file.size

            });

            await newFile.save();

            res.status(201).json({
                message: "File uploaded successfully",
                file: newFile
            });

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message: "Upload failed"
            });
        }
    }
);


// GET ALL FILES

router.get("/", async (req, res) => {

    try {

        const files = await File.find().sort({
            uploadedAt: -1
        });

        res.json(files);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Cannot fetch files"
        });
    }
});


// DELETE FILE

router.delete("/:id", async (req, res) => {

    try {

        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        await File.findByIdAndDelete(req.params.id);

        res.json({
            message: "File deleted"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Delete failed"
        });
    }
});

module.exports = router;