import { Categories } from "../interfaces/categories";
import { Keywords } from "./Keyword";

const markets = new Keywords(Categories.Market)
const prices = new Keywords(Categories.Price)

export class Item { 
    text : string;
    value? : string | number | Date | boolean;
    category : Categories = Categories.Unassigned;

    constructor(string : string) {
        this.text = string;
        this.categorize();
    }

    categorize() {
        this.identifyDate(this.text)
        this.identifyMarket(this.text)
        this.identifyPrice(this.text)
    }

    // Text categorization functions 
    identifyDate(string : string) {
        let result = this.executeRegex(string, /(\d{1,2})[\/.]\s?(\d{1,2})[\/.]\s?(\d{4})/)
        if (result){
            let date : Date | boolean = this.dateFromString(result)
            if (date){
                this.value = date;
                this.category = Categories.Date
            }
        }
    }
    dateFromString(string : string[]) : Date | boolean {
        if(string[1].length == 4){
            return new Date(string[1] + " " + string[2] + " " + string[3])
        }else if(string[3].length == 4){
            return new Date(string[3] + " " + string[2] + " " + string[1])
        }
        return false
    }

    identifyMarket(string : string){
        let lower = string.toLowerCase()
        markets.items.forEach(market => {
            if(lower.includes(market.toLowerCase())){
                this.value = market;
                this.category = Categories.Market
            }
        });        
    }
    identifyPrice(string : string){
        let foundKeyword : string | null = this.findKeyword(string, prices.items)
        if (foundKeyword != null){
            let result = this.executeRegex(string, /(\d{1,5})[,.](\d{2})?/);
            if (result){
                let number = result[0].replace(",", ".")
                this.value = Number(number)
                this.category = Categories.Price
            }
        }
    }
    findKeyword(string : string, keywords : string[]) : string | null {
        let lower = string.toLowerCase()
        for (let i = 0; i < keywords.length; i++){
            if(lower.includes(keywords[i].toLowerCase())){
                return keywords[i]
            }
        }
        return null
    }
    executeRegex(string : string, regex : RegExp){
        return regex.exec(string);
    }
}