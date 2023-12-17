const express = require('express');
const router = express.Router();

// Route untuk menghandle detail berdasarkan ID
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;

    // Logika untuk mendapatkan data berdasarkan ID
    // Misalnya, mengambil data dari database atau sumber lain
    // Untuk contoh, kita akan mengirim respons sederhana
    res.send(`Detail untuk ID: ${id}`);
});

module.exports = router;
