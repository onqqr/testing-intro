const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  test("'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, 'all').map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, undefined).map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    expect(filterByCategory(products, '').map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  test("'electronics' возвращает товары с ID [1, 2]", () => {
    expect(filterByCategory(products, 'electronics').map(({ id }) => id)).toEqual([1, 2]);
  });
  test("'books' возвращает товары с ID [3, 6]", () => {
    expect(filterByCategory(products, 'books').map(({ id }) => id)).toEqual([3, 6]);
  });
  test("'home' возвращает товары с ID [4, 5]", () => {
    expect(filterByCategory(products, 'home').map(({ id }) => id)).toEqual([4, 5]);
  });
  test("'clothes' возвращает пустой массив", () => {
    expect(filterByCategory(products, 'clothes').map(({ id }) => id)).toEqual([]);
  });
  test("'toys' возвращает пустой массив", () => {
    expect(filterByCategory(products, 'toys').map(({ id }) => id)).toEqual([]);
  });
  test("'sports' возвращает пустой массив", () => {
    expect(filterByCategory(products, 'sports').map(({ id }) => id)).toEqual([]);
  });
});
