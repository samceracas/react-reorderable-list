# react-reorderable-list 📄

> A simple UI framework friendly reorderable list component for React.

[![NPM](https://img.shields.io/npm/v/react-reorderable-list.svg)](https://www.npmjs.com/package/react-reorderable-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.com/samceracas/react-reorderable-list.svg?branch=master)](https://travis-ci.com/samceracas/react-reorderable-list)

## Install

**npm**
```bash
npm install react-reorderable-list
```
**yarn**
```bash
yarn add react-reorderable-list
```

## Usage
There are 2 types of lists available for use. You can use an ungrouped list if you don't want to transfer items between lists or you can use a grouped list which gives you the ability to transfer data from one list to another by dragging and dropping the list item.

Below are supported use case scenarios for grouped and ungrouped lists.

#### Wrapped reorderable list group
A group of lists wrapped within a ```ReOrderableListGroup```. Lists within the group can transfer data to each other. Provides  less setup and a cleaner configuration for generic grouped lists.

![Example](https://i.imgur.com/OkdsVjH.gif)

```jsx
import React, { useState } from 'react'
import {
  ReOrderableItem,
  ReOrderableList,
  ReOrderableListGroup
} from 'react-reorderable-list'
import 'react-reorderable-list/dist/index.css'

export default function () {
  //sample data
  const [group, setGroup] = useState([
    [
      { id: 1, name: 'Test' },
      { id: 2, name: 'Hello' },
      { id: 3, name: 'World!' }
    ],
    [
      { id: 1, name: 'Item' },
      { id: 2, name: 'Name' }
    ]
  ])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ReOrderableListGroup
        //The name for this group must be unique as this serves as the identifier
        //when validating if the item should be transfered to the list or not.
        //Items can only be transferred to the list with the same group name.
        name='uniqueGroupName'
        //group data
        group={group}
        //update list group
        onListGroupUpdate={(newList) => setGroup(newList)}
      >
        {group.map((list, index) => (
          <ReOrderableList key={`list-${index}`} style={{ width: '300px' }}>
            {list.map((data, index) => (
              <ReOrderableItem key={`item-${index}`}>
                <div style={{ border: '1px solid black' }}>{data.name}</div>
              </ReOrderableItem>
            ))}
          </ReOrderableList>
        ))}
      </ReOrderableListGroup>
    </div>
  )
}

```


#### Using the ```path``` property to access your list array.
```jsx
import React, { useState } from 'react'
import {
  ReOrderableItem,
  ReOrderableList,
  ReOrderableListGroup
} from 'react-reorderable-list'
import 'react-reorderable-list/dist/index.css'

export default function () {
  //sample data
  const [groups, setGroup] = useState([
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
  ])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ReOrderableListGroup
        //The name for this group must be unique as this serves as the identifier
        //when validating if the item should be transfered to the list or not.
        //Items can only be transferred to the list with the same group name.
        name='uniqueGroupName'
        //group data
        group={groups}
        //update list group
        onListGroupUpdate={(newList) => setGroup(newList)}
      >
        {groups.map((list, index) => (
          //here we use the path property to access the list array from the object
          <ReOrderableList
            key={`list-${index}`}
            path={`${index}.tasks`}
            style={{ width: '300px' }}
          >
            {list.tasks.map((data, index) => (
              <ReOrderableItem key={`item-${index}`}>
                <div style={{ border: '1px solid black' }}>{data.name}</div>
              </ReOrderableItem>
            ))}
          </ReOrderableList>
        ))}
      </ReOrderableListGroup>
    </div>
  )
}

```

#### Unwrapped reorderable list group
A group of lists not bound within a ```ReOrderableListGroup``` component. Useful for use cases where you need to put multiple reorderable lists into different components while still making them interactable with each other. A state management system such as Redux is required for managing app states for such scenarios.

```jsx
import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import 'react-reorderable-list/dist/index.css'

export default function () {
  //sample data
  const [group, setGroup] = useState([
    [
      { id: 1, name: 'Ayy ' },
      { id: 2, name: 'This ' },
      { id: 3, name: 'One' },
      { id: 4, name: 'Is' }
    ],
    [
      { id: 1, name: 'An example of' },
      { id: 2, name: 'A non wrapped' },
      { id: 3, name: 'list group' }
    ]
  ])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ReOrderableList
        //The name for this group must be unique as this serves as the identifier
        //when validating if the item should be transfered to the list or not.
        //Items can only be transferred to the list with the same group name.
        name='list3'
        //group data
        group={group}
        //The object path that tells our component where to access the actual array for our list.
        //For lists not embedded within an object simply use the index for our list.
        //The path below retrieves the 1st list from our group.
        path={0}
        //our list update callback
        onListUpdate={(newList) => setGroup(newList)}
        style={{
          width: '300px'
        }}
      >
        {group[0].map((data, index) => (
          <ReOrderableItem key={`item-${index}`}>
            <div
              style={{
                border: '1px solid black'
              }}
            >
              {data.name}
            </div>
          </ReOrderableItem>
        ))}
      </ReOrderableList>

      <ReOrderableList
        //The name for this group must be unique as this serves as the identifier
        //when validating if the item should be transfered to the list or not.
        //Items can only be transferred to the list with the same group name.
        name='list3'
        group={group}
        //The object path that tells our component where to access the actual array for our list.
        //For lists not embedded within an object simply use the index for our list.
        //The path below retrieves the 2nd list from our group.
        path={1}
        //our list update callback
        onListUpdate={(newList) => setGroup(newList)}
        style={{
          width: '300px'
        }}
      >
        {group[1].map((data, index) => (
          <ReOrderableItem key={`item-${index}`}>
            <div
              style={{
                border: '1px solid black'
              }}
            >
              {data.name}
            </div>
          </ReOrderableItem>
        ))}
      </ReOrderableList>
    </div>
  )
}
```

#### Ungrouped list
Ungrouped lists cannot transfer and recieve items from other lists. You can only reorder items from within the list.

![Example](https://i.imgur.com/i7o8rsz.gif)
```jsx
import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import 'react-reorderable-list/dist/index.css'

export default function () {
  //sample data
  const [list, setList] = useState([
    { id: 1, name: 'This' },
    { id: 2, name: 'list' },
    { id: 2, name: 'is restricted' },
    { id: 2, name: 'to itself' }
  ])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ReOrderableList
        //The unique identifier for this list. Should be unique from other lists and list groups.
        name='list2'
        //your list data
        list={list}
        //the list update callback
        onListUpdate={(newList) => setList(newList)}
        style={{
          width: '300px'
        }}
      >
        {list.map((data, index) => (
          <ReOrderableItem key={`item-${index}`}>
            <div
              style={{
                border: '1px solid black'
              }}
            >
              {data.name}
            </div>
          </ReOrderableItem>
        ))}
      </ReOrderableList>
    </div>
  )
}
```

## Components
Below are the primary components used when making lists along with the available properties for the respective component.

####  ReOrderableListGroup
| Property                           | Type     | Description                                                                                   | Default         |
| ---------------------------------- | -------- | --------------------------------------------------------------------------------------------- | --------------- |
| ```name``` (Required)              | String   | The identifier when validating transferred items. This must be unique from other list groups. | ```undefined``` |
| ```group``` (Required)             | Array    | The array of lists for this group.                                                            | ```null```      |
| ```onListGroupUpdate``` (Required) | Function | The callback function which passes the new value for ```group``` as parameter.                             | ```undefined``` |


####  ReOrderableList
| Property                                                                                                              | Type     | Description                                                                                  | Default         |
| --------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- | --------------- |
| ```name``` (Required) | String   | The identifier when validating transferred items. This must be unique from other list groups. | ```undefined``` |
| ```group``` (Required when the list is not wrapped within a ```ReOrderableListGroup``` component, otherwise Optional)                                                                                                | Array    | The array of lists for this group.                                                           | ```null```      |
| ```list``` (Required when this list is ungrouped, otherwise Optional)                                                                                    | Array | The data for this list. This is automatically set when wrapped within a ```ReOrderableListGroup```.                            | ```[]``` |
| ```onListUpdate``` (Required)                                                                                    | Function | The callback function which passes the new value for ```group```.                            | ```undefined``` |
| ```path``` (Optional)                                                                                    | String \| Number | The index or object path needed to access the list array from the group. This property is automatically set when wrapped within a ```ReOrderableListGroup``` using the index as the accessor the to the list array.| ```0``` 
| ```component``` (Optional) | String \| Component | Define a custom component for this list. | ```div``` |
| ```componentProps``` (Optional) | Object | The props for the component. | ```null``` |
| ```orientation``` (Optional) | String  | The orientation for this list. Use ```vertical``` for vertically oriented lists, otherwise use ```horizontal```. | ```vertical``` |
| ```placeholder``` (Optional) | Function | A function that returns a ```Component``` or ```HTMLElement``` to be used as placeholder when an item is being hovered on the list. Passes the currently dragged ```ReOrderableItem``` as parameter. | ```(item) => <div style={{  width: `${item.rect.width}px`, height: `${item.rect.height}px`, backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />```

 
####  ReOrderableItem
| Property| Type| Description | Default |
| ---------------------------------- | -------- | --------------------------------------------------------------------------------------------- | --------------- |
| ```drag``` (Optional) | String   | A function that returns a ```Component``` or ```HTMLElement``` to be used as graphic when dragging an item. Manually setting the ```width``` and ```height``` styles is required before returning the element or component. Passes the currently dragged ```ReOrderableItem``` as parameter. | A clone of the item element. |
| ```component``` (Optional) | String \| Component | The component to be used for this item. | ```div``` |
| ```componentProps``` (Optional) | Object | The props for the component. | ```null``` |
| ```itemIndex``` (Optional) | Number | The index for this item on the list. This property is automatically set by the ```ReOrderableList``` component but can be manually overridden.. | ```0``` |
| ```itemData``` (Optional) | Object | The data for this item. This property is automatically set by the ```ReOrderableList``` component but can be manually overridden. | ```null``` |
| ```onItemDragStart``` (Optional) | Function | Event triggered on item drag start. Passes an object with the following properties <pre>{<br /> item, //the currently dragged item component.<br /> dragX, //the calculated drag coordinate for the X axis.<br /> dragY, //the calculated drag coordinate for the Y axis.<br /> pageX, //the page coordinate for the X axis.<br /> pageY, //the page coordinate for the Y axis.<br /> clientX, //the client viewport coordinate for the X axis.<br /> clientY //the client viewport coordinate for the Y axis.<br />}</pre> | ```null``` |
| ```onItemDrag``` (Optional) | Function | Event triggered on item drag. Passes an object with the following properties <pre>{<br /> item, //the currently dragged item component.<br /> dragX, //the calculated drag coordinate for the X axis.<br /> dragY, //the calculated drag coordinate for the Y axis.<br /> pageX, //the page coordinate for the X axis.<br /> pageY, //the page coordinate for the Y axis.<br /> clientX, //the client viewport coordinate for the X axis.<br /> clientY //the client viewport coordinate for the Y axis.<br />}</pre> | ```null``` |
| ```onItemDragEnd``` (Optional) | Function | Event triggered on item drag end. Passes an object with the following properties <pre>{<br /> item, //the currently dragged item component.<br /> pageX, //the page coordinate for the X axis.<br /> pageY, //the page coordinate for the Y axis.<br /> clientX, //the client viewport coordinate for the X axis.<br /> clientY //the client viewport coordinate for the Y axis.<br />}</pre> | ```null``` |

## API

####  ReOrderableItem
| Property| Type| Description |
| ---------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| ```instanceID``` | String   | The instance ID for this reorderable item. |
| ```model``` | Object | An model with the following properties. <pre>{<br /> data, //the data for this item.<br /> index, //the index for this item on the list.<br /> instanceID, //the instance id for this item.<br />}</pre> |
| ```draggedElement``` | HTMLElement | The element being dragged. This is basically a copy of the item element but is used as graphic when dragging the item. |
| ```listComponent``` | ReOrderableList | The ```ReOrderableList``` component this item belongs to. |
| ```overlappingListElement``` | HTMLElement | The currently overlapping list container element. |
| ```clonedItemElement``` | HTMLElement | A clone of the item element. |
| ```rect``` | ClientRect | The bounding client rect of the item element. |


## License

MIT © [samceracas](https://github.com/samceracas)
