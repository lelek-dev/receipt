import {Keywords} from '../controller/Keyword'
import { Categories } from '../interfaces/categories';

test('Test Keyword Controller', () => {
    let markets = new Keywords(Categories.Market);
    expect(markets.items).toContain("Aldi")
})

