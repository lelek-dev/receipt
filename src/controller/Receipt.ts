import { Categories } from "../interfaces/categories";
import { Item } from "./Item";

export class Receipt {
    fullText : string;
    lines : string[] = [];
    words : string[][] = [];

    items : Item[] = []

    constructor(fullText : string) {
        this.fullText = fullText;
        this.splitText();
        this.categorizeText();

    }

    splitText(){
        this.lines = this.fullText.split('\n');
        for(let i = 0; i <= this.lines.length; i++){
            if (this.lines[i] == undefined || this.lines[i].trim() == "")
              continue;
            this.words[i] = []
            this.words[i].push(this.lines[i].trim())
            this.words[i].push(...this.lines[i].split(" "))
        }
    }
    categorizeText(){
        this.lines.forEach(line => {
            let item = new Item(line)
            if (item.category != Categories.Unassigned){
                this.items.push(item)
            }
        })
    }
}