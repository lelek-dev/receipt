import {Receipt} from '../controller/Receipt'

// test('Test Date Regex', () => {

//     let dates : [string, boolean | Date][] = [
//         ["28. 04. 2023", (new Date("2023-04-28"))],
//         ["04.05.2023", (new Date("2023-05-04"))],
//         ["e 28.04.2023", (new Date("2023-04-28"))],
//         ["2023-231-22", false]
//     ]
//     for (let i = 0; i < dates.length; i++){
//         let value : string = dates[i][0]
//         let expected : boolean | Date = dates[i][1]
//         let result : boolean | Date = Receipt.checkForDate(value)

//         expect(result).toBe(expected)
//     }
// });

test.each<{input : string, expectedResult : boolean | Date}>([
    {input: "28. 04. 2023", expectedResult: (new Date("2023-04-28"))},
    {input: "04.05.2023", expectedResult: (new Date("2023-05-04"))},
    {input: "e 28.04.2023", expectedResult: (new Date("2023-04-28"))},
    {input: "2023-231-22", expectedResult: false},
])('Test Date Regex $input $expectedResult', ({input, expectedResult}) => {

    let result : boolean | Date = Receipt.checkForDate(input)
    expect(result).toStrictEqual(expectedResult)

})