const Tesseract= require('tesseract.js')
const fs =  require('fs');
const file = fs.readFileSync('./test.png');
Tesseract.recognize(
    file,
    'chi_sim',
    { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    console.log(text);
})