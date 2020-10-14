import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { Box } from '@material-ui/core'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function () {
  //sample data
  const [list, setList] = useState([
    { id: 1, name: 'This' },
    { id: 2, name: 'list' },
    { id: 2, name: 'is restricted' },
    { id: 2, name: 'to itself' }
  ])
  return (
    <>
      {' '}
      <h4>
        Using the{' '}
        <a
          href='https://material-ui.com/components/lists/'
          target='_blank'
          rel='noopener noreferrer'
        >
          List
        </a>{' '}
        component
      </h4>
      <Box display='flex' gridGap='10px'>
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
      </Box>
      <Accordion>
        <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
          Show source
        </AccordionSummary>
        <AccordionDetails>
          <Box width='100%'>
            <SyntaxHighlighter
              language='jsx'
              style={materialDark}
              customStyle={{ display: 'block' }}
            >
              {`const [groups, setGroup] = useState([
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
<Box display='flex' gridGap='10px'>
<ReOrderableListGroup
  name='uniqueGroupName'
  group={groups}
  onListGroupUpdate={(newList) => setGroup(newList)}
>
  {groups.map((list, index) => (
    <ReOrderableList
      key={\`list-\${index}\`}
      path={\`\${index}.tasks\`}
      component={List}
      componentProps={{
        className: classes.root
      }}
    >
      {list.tasks.map((data, index) => (
        <ReOrderableItem key={\`item-\${index}\`} component={ListItem}>
          <ListItemText primary={data.name} />
        </ReOrderableItem>
      ))}
    </ReOrderableList>
  ))}
</ReOrderableListGroup>
</Box>`}
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
