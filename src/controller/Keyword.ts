import { Categories } from "../interfaces/categories";
import * as fs from 'fs';

export class Keywords {
    category : Categories
    items : string[]

    constructor(category : Categories){
        this.category = category
        let path = "/usr/src/app/dist/keywords/"
        switch(this.category){
            case Categories.Market:
                path += "markets.json"
                break;
            case Categories.Price:
                path += "prices.json"
            default:
                break;
        }
        try {
            this.items = this.parseJson(path)
        }catch(e){
            throw e;
        }
    }

    parseJson(path : string) : string[] {
        const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
        let json : keywordsJson = JSON.parse(data);
        return json.keywords
    }
}

interface keywordsJson {
    keywords: string[]
}