FROM node:20

RUN apt-get update
RUN apt-get install -y tesseract-ocr tesseract-ocr-deu

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run build" ]
