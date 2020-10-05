import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'

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
