const express = require('express');
const multer = require('multer');
const { Dropbox } = require('dropbox');
const { default: fetch } = require('node-fetch');
const path = require('path'); 
const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const dbx = new Dropbox({ accessToken: 'sl.CBHyTUiDlwi8gYO8gz-HFDb9mLpOmPeLjrGcTWP7l2pXQysplVqmVBK3WVyoLQVpmFn03zYmzUfS0J8vv3aFQlpmoDDNoXw2GohBEC6laHW26YI3JOM5TT5hcq2GYx-_QMw5NUHV5Rm7', fetch });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  
});
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    await dbx.filesUpload({
      path: `/${req.file.originalname}`, 
      contents: req.file.buffer,
    });
    res.send('Uploaded!');
  } catch (error) {
    res.status(500).send('Failed to upload file');
  }
});
app.listen(3001, () => console.log('Server running at http://localhost:3001'));