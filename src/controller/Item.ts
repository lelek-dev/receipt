import { Categories } from "../interfaces/categories";
import { Keywords } from "./Keyword";

const markets = new Keywords(Categories.Market)

export class Item { 
    text : string;
    value? : string | number | Date | boolean;
    category : Categories = Categories.Unassigned;

    constructor(string : string) {
        this.text = string;
        this.categorize();
    }

    categorize() {
        this.checkForDate(this.text)
        this.identifyMarket(this.text)
    }

    // Text categorization functions 
    checkForDate(string : string) {
        let regex = /(\d{1,2})[\/.]\s?(\d{1,2})[\/.]\s?(\d{4})/;
        let result = regex.exec(string);
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
}