/* eslint-disable no-undef */
const { dragAndDrop } = require('../__lib__/drag-and-drop')

describe('ReOrderableList component', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3001/#/material-ui')
  })

  it('transfers items from wrapped list to another', async () => {
    const firstListSelector = '.list-group-uniqueGroupName:nth-child(1)'
    const secondListSelector = '.list-group-uniqueGroupName:nth-child(2)'
    await dragAndDrop(
      `${firstListSelector} .ui-reorderable-item:first-child`,
      `${secondListSelector} .ui-reorderable-item:first-child`
    )
    const firstList = await page.$eval(firstListSelector, (e) => e.textContent)
    const secondList = await page.$eval(
      secondListSelector,
      (e) => e.textContent
    )
    expect(firstList).toBe('HelloWorld!')
    expect(secondList).toBe('TestItemName')
  })
})
