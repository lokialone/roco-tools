const Tesseract= require('tesseract.js')
const file = require('../test.png');
Tesseract.recognize(
    '../test.png',
    'chi_sim',
    { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    console.log(text);
})