const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 4001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/synthesize', (req, res) => {
  const text = req.body.text;
  const apiKey = 'UQfSzT2Q';
  const lang = 'en-US';
  const voice = 'Joanna';
  const url = `https://responsivevoice.org/v1/text:synthesize?key=${apiKey}&src=${encodeURIComponent(text)}&hl=${lang}&v=${voice}&r=0&c=mp3&f=44khz_16bit_stereo`;

  const file = fs.createWriteStream('output.mp3');
  https.get(url, (apiRes) => {
    apiRes.pipe(file);
    file.on('finish', () => {
      fs.readFile('output.mp3', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error reading synthesized speech file' });
          return;
        }
        const base64data = Buffer.from(data).toString('base64');
        res.set('Content-Type', 'audio/mpeg');
        res.set('Content-Disposition', 'attachment;filename=synthesized_audio.mp3');
        res.send(Buffer.from(base64data, 'base64'));
        fs.unlinkSync('output.mp3');
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



// const express = require('express');
// const bodyParser = require('body-parser');
// const https = require('https');
// const fs = require('fs');

// const app = express();
// const port = 4001;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post('/synthesize', (req, res) => {
//   const text = req.body.text;
//   const apiKey = 'UQfSzT2Q';
//   const lang = 'en-US';
//   const voice = 'Joanna';
//   const url = `https://responsivevoice.org/v1/text:synthesize?key=${apiKey}&src=${encodeURIComponent(text)}&hl=${lang}&v=${voice}&r=0&c=mp3&f=44khz_16bit_stereo`;
// //   https://responsivevoice.org/text-to-speech/?key=<YOUR_API_KEY>&src=${encodeURIComponent(text)}&hl=en-us&c=mp3&f=16khz_16bit_stereo
//   const file = fs.createWriteStream('output.mp3');
//   https.get(url, (apiRes) => {
//     apiRes.pipe(file);
//     file.on('finish', () => {
//       fs.readFile('output.mp3', (err, data) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Error reading synthesized speech file' });
//           return;
//         }
//         const base64data = Buffer.from(data).toString('base64');
//         res.json({ data: base64data });
//         fs.unlinkSync('output.mp3');
//       });
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


{/* <script src="https://code.responsivevoice.org/responsivevoice.js?key=UQfSzT2Q"></script> */}