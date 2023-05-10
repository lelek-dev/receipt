export class Receipt {
    fullText : string;
    lines : string[] = [];
    items : string[][] = [];

    constructor(fullText : string) {
        this.fullText = fullText;
        this.splitText();
    }

    splitText(){
        this.lines = this.fullText.split('\n');
        for(let i = 0; i <= this.lines.length; i++){
            if (this.lines[i] == undefined || this.lines[i].trim() == "")
              continue;
            this.items[i] = []
            this.items[i].push(this.lines[i].trim())
            this.items[i].push(...this.lines[i].split(" "))
        }
    }
    static checkForDate(string : string) : Date | boolean{
        let regex = /(\d{1,2})[\/.]\s?(\d{1,2})[\/.]\s?(\d{4})/;
        let result = regex.exec(string);
        if (result == null){
            return false;
        }else {
            return this.dateFromString(result)            
        }
    }
    static dateFromString(string : string[]) : Date | boolean {
        if(string[1].length == 4){
            return new Date(string[1] + " " + string[2] + " " + string[3])
        }else if(string[3].length == 4){
            return new Date(string[3] + " " + string[2] + " " + string[1])
        }
        return false
    }
}

export class Item { 
    value : string | number;
    category : Categories = Categories.Unassigned;

    constructor(value : string) {
        this.value = value;
    }
}

export enum Categories {
    Unassigned,
    Market,
    Price,
    Item,
    Date
}