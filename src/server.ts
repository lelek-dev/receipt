'use strict';

import {processImage} from './controller/tesseract'
import {Receipt} from './controller/Receipt'
import express from 'express' 
import { Keywords } from './controller/Keyword';
import { Categories } from './interfaces/categories';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/test-manual', async function requestHandler(req,res){
  let text = await processImage('./test-data/2023-05-09_Aldi.jpg')
  let receipt = new Receipt(text)
  res.json(receipt.items)
})

app.get('/test', function requestHandler(req, res) {
  let markets = new Keywords(Categories.Market);
  res.json(markets.items)
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});