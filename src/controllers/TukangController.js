import Tukang from "../models/TukangModel.js";
import path from "path";
import fs from "fs";

export const getTukangs = async(req, res)=>{
    try {
        const response = await Tukang.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTukangById = async(req, res)=>{
    try {
        const response = await Tukang.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveTukang = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });

    const { jasa_pelayanan, rating, alamat, deskripsi } = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Images" });
    }

    if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });

        try {
            await Tukang.create({
                jasa_pelayanan: String(jasa_pelayanan), // Ensure it's a string
                rating: String(rating),
                alamat: String(alamat),
                deskripsi: String(deskripsi),
                image: fileName,
                url: url
            });

            res.status(201).json({ msg: "Tukang Berhasil Disimpan" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
}

export const updateTukang = async(req, res)=>{
    const tukang = await Tukang.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!tukang) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = tukang.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${tukang.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Tukang.update({name: name, image: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Tukang Berhasil Update"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTukang = async(req, res)=>{
    const tukang = await Tukang.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!tukang) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${tukang.image}`;
        fs.unlinkSync(filepath);
        await tukang.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Tukang Berhasil Dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}