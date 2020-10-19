/* eslint-disable no-undef */
const { dragAndDrop } = require('../__lib__/drag-and-drop')

describe('ReOrderableList component', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3001/#/material-ui')
  })

  it('transfers items from one list to another', async () => {
    const firstListSelector = '.list-group-uniqueGroupName:nth-child(1)'
    const secondListSelector = '.list-group-uniqueGroupName:nth-child(2)'
    await dragAndDrop(
      `${firstListSelector} .ui-reorderable-item:first-child`,
      `${secondListSelector} .ui-reorderable-item:first-child`
    )
    let firstList = await page.$eval(firstListSelector, (e) => e.textContent)
    let secondList = await page.$eval(secondListSelector, (e) => e.textContent)
    expect(firstList).toBe('HelloWorld!')
    expect(secondList).toBe('TestItemName')
    await dragAndDrop(
      `${secondListSelector} .ui-reorderable-item:first-child`,
      `${firstListSelector} .ui-reorderable-item:first-child`
    )
    firstList = await page.$eval(firstListSelector, (e) => e.textContent)
    secondList = await page.$eval(secondListSelector, (e) => e.textContent)
    expect(firstList).toBe('TestHelloWorld!')
    expect(secondList).toBe('ItemName')
  })
})
