'use strict';

import {processImage} from './controller/tesseract'
import {Receipt, Item} from './controller/Receipt'
import express from 'express' 

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/test-manual', async function requestHandler(req,res){
  let text = await processImage('./img/WhatsApp Bild 2023-05-03 um 22.47.01.jpg')
  let receipt = new Receipt(text)
  res.json(receipt.lines)
})

app.get('/test', function requestHandler(req, res) {
  // res.json(Item.checkForDate("04.05.2023"))
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});