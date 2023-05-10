import { createWorker } from 'tesseract.js';

export let processImage = async function(path = './img/WhatsApp Bild 2023-05-03 um 22.47.01.jpg', lang='deu'){
    let worker = await createWorker({
        logger: m => console.log(m)
    })
    await worker.loadLanguage(lang);
    await worker.initialize(lang);
    const { data: { text } } = await worker.recognize(path);
    console.log(text);
    await worker.terminate();
    return text
}