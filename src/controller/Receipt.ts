export class Receipt {
    fullText : string;
    lines : string[] = [];
    words : string[][] = [];

    items : Item[] = []


    constructor(fullText : string) {
        this.fullText = fullText;
        this.splitText();

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

        })
    }
}

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
}

export enum Categories {
    Unassigned,
    Market,
    Price,
    Item,
    Date
}