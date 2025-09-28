const express = require('express');
const cors = require('cors');
const path = require('path');
const awardeeData = require('./awardee_data');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/validate', (req, res) => {
  const { noInduk } = req.body;
  const awardee = awardeeData.find(data => data.noInduk === noInduk);

  if (awardee) {
    res.status(200).json({ 
      isValid: true, 
      message: "Apakah ini identitasmu?",
      data: awardee
    });
  } else {
    res.status(404).json({ 
      isValid: false, 
      message: "Nomor Induk tidak ditemukan. Mohon periksa kembali." 
    });
  }
});

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});