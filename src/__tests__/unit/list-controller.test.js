import ListController from '../../controllers/list-controller'

const objectGroup = [
  {
    id: 1,
    name: 'test',
    tasks: [
      { id: 1, name: 'Test' },
      { id: 2, name: 'Hello' },
      { id: 3, name: 'World!' }
    ]
  },
  {
    id: 2,
    name: 'test2',
    tasks: [
      { id: 1, name: 'Item' },
      { id: 2, name: 'Name' }
    ]
  }
]

const arrayGroup = [
  [
    { id: 1, name: 'Test' },
    { id: 2, name: 'Hello' },
    { id: 3, name: 'World!' }
  ],
  [
    { id: 1, name: 'Item' },
    { id: 2, name: 'Name' }
  ]
]

const list = [
  { id: 2, name: 'Hello' },
  { id: 1, name: 'Test' },
  { id: 3, name: 'World!' }
]

function makeObjectBasedListGroup() {
  return [
    { group: objectGroup, name: 'object-group', path: '0.tasks' },
    { group: objectGroup, name: 'object-group', path: '1.tasks' }
  ]
}

function makeArrayBasedListGroup() {
  return [
    { group: arrayGroup, name: 'array-group', path: 0 },
    { group: arrayGroup, name: 'array-group', path: 1 }
  ]
}

/**
 * Initializes a set of ```ListController```.
 *
 * @param {Array<Object>} listGroup
 * @returns {Array<ListController>}
 */
function initializeControllers(listGroup) {
  const groups = []
  listGroup.forEach((props) => groups.push(new ListController(props)))
  return groups
}

describe('List Controller', () => {
  it('When list is embedded in an object, model.listData must be array', () => {
    const groups = initializeControllers(makeObjectBasedListGroup())
    expect(groups[0].model.listData).toBeInstanceOf(Array)
  })
  it('When list is embedded in an object, model.listData must have the proper length', () => {
    const groups = initializeControllers(makeObjectBasedListGroup())
    expect(groups[0].model.listData).toHaveLength(3)
  })
  it('When list is embedded in an object, model.listData must contain the proper data', () => {
    const groups = initializeControllers(makeObjectBasedListGroup())
    expect(groups[0].model.listData[0].name).toBe('Test')
  })

  it('When list is embedded in an object, model.listItems must be an array', () => {
    const groups = initializeControllers(makeObjectBasedListGroup())
    expect(groups[0].model.listItems).toBeInstanceOf(Array)
  })
  it('When list is embedded in an object, model.listItems must have the proper length', () => {
    const groups = initializeControllers(makeObjectBasedListGroup())
    expect(groups[0].model.listItems).toHaveLength(3)
  })
  it('When list is embedded in an object, model.listItems must contain the proper data', () => {
    const groups = initializeControllers(makeObjectBasedListGroup())
    expect(groups[0].model.listItems[0].data).toEqual({
      id: 1,
      name: 'Test'
    })
  })

  it('When list is embedded in an object, transfers data properly between lists', () => {
    const groups = initializeControllers(makeObjectBasedListGroup())
    const firstGroup = groups[0]
    const secondGroup = groups[1]

    expect.assertions(2)

    secondGroup.updateList(firstGroup.model.listItems[0], 0, firstGroup.model, {
      onListUpdate: (group) => {
        expect(group[0].tasks).toEqual([
          { id: 2, name: 'Hello' },
          { id: 3, name: 'World!' }
        ])
        expect(group[1].tasks).toEqual([
          { id: 1, name: 'Test' },
          { id: 1, name: 'Item' },
          { id: 2, name: 'Name' }
        ])
      }
    })
  })

  it('When list is not embedded in an object, model.listData must be array', () => {
    const groups = initializeControllers(makeArrayBasedListGroup())
    expect(groups[0].model.listData).toBeInstanceOf(Array)
  })
  it('When list is not embedded in an object, model.listData must have the proper length', () => {
    const groups = initializeControllers(makeArrayBasedListGroup())
    expect(groups[0].model.listData).toHaveLength(3)
  })
  it('When list is not embedded in an object, model.listData must contain the proper data', () => {
    const groups = initializeControllers(makeArrayBasedListGroup())
    expect(groups[0].model.listData[0].name).toBe('Test')
  })

  it('When list is not embedded in an object, model.listItems must be an array', () => {
    const groups = initializeControllers(makeArrayBasedListGroup())
    expect(groups[0].model.listItems).toBeInstanceOf(Array)
  })
  it('When list is not embedded in an object, model.listItems must have the proper length', () => {
    const groups = initializeControllers(makeArrayBasedListGroup())
    expect(groups[0].model.listItems).toHaveLength(3)
  })
  it('When list is not embedded in an object, model.listItems must contain the proper data', () => {
    const groups = initializeControllers(makeArrayBasedListGroup())
    expect(groups[0].model.listItems[0].data).toEqual({
      id: 1,
      name: 'Test'
    })
  })

  it('When list is not embedded in an object, transfers data properly between lists', () => {
    const groups = initializeControllers(makeArrayBasedListGroup())
    const firstGroup = groups[0]
    const secondGroup = groups[1]

    expect.assertions(2)

    secondGroup.updateList(firstGroup.model.listItems[0], 0, firstGroup.model, {
      onListUpdate: (group) => {
        expect(group[0]).toEqual([
          { id: 2, name: 'Hello' },
          { id: 3, name: 'World!' }
        ])
        expect(group[1]).toEqual([
          { id: 1, name: 'Test' },
          { id: 1, name: 'Item' },
          { id: 2, name: 'Name' }
        ])
      }
    })
  })

  it('Reorders data properly on a list', () => {
    const listController = new ListController({
      list,
      name: 'list'
    })
    listController.updateList(listController.model.listItems[0], 1, null, {
      onListUpdate: (list) => {
        expect(list).toEqual([
          { id: 1, name: 'Test' },
          { id: 2, name: 'Hello' },
          { id: 3, name: 'World!' }
        ])
      }
    })
  })
})
