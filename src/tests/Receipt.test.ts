import {Item} from '../controller/Item'

test.each<{input : string, expectedResult? : Date}>([
    {input: "28. 04. 2023", expectedResult: (new Date("2023-04-28"))},
    {input: "04.05.2023", expectedResult: (new Date("2023-05-04"))},
    {input: "e 28.04.2023", expectedResult: (new Date("2023-04-28"))},
    {input: "2023-231-22", expectedResult: undefined},
])('Test Date Regex $input $expectedResult', ({input, expectedResult}) => {

    let item = new Item(input)
    expect(item.value).toStrictEqual(expectedResult)

})

test.each<{input : string, expectedResult? : string}>([
    {input: "SN ALDI SüD", expectedResult: "Aldi"},
    {input: "definitely not a market", expectedResult: undefined},
    {input: "whowhwo sdsdawe", expectedResult: undefined}
])('Test Market $input $expectedResult', ({input, expectedResult}) => {

    let item = new Item(input)
    expect(item.value).toStrictEqual(expectedResult)

})

test.each<{input : string, expectedResult? : number}>([
    {input: "Betrag 22,97 EUR", expectedResult: 22.97},
    {input: "SUMME 50,11", expectedResult: 50.11},
    {input: "SUMME EUR 7,94", expectedResult: 7.94},
    {input: "SUMME NOT A NUMBER", expectedResult: undefined}
])('Test Market $input $expectedResult', ({input, expectedResult}) => {

    let item = new Item(input)
    expect(item.value).toStrictEqual(expectedResult)

})

