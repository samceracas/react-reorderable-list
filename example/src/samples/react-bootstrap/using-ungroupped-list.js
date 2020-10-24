import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import { ListGroup } from 'react-bootstrap'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { Box } from '@material-ui/core'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function () {
  const styleReset = {
    fontSize: 'revert',
    marginBottom: 'revert',
    fontWeight: 'revert',
    lineHeight: 'revert'
  }
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
      <h4 style={styleReset}>Ungroupped List</h4>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <ReOrderableList
          //The unique identifier for this list. Should be unique from other lists and list groups.
          name='list2'
          //your list data
          list={list}
          //the list update callback
          onListUpdate={(newList) => setList(newList)}
          component={ListGroup}
        >
          {list.map((data, index) => (
            <ReOrderableItem key={`item-${index}`}>
              <ListGroup.Item>{data.name}</ListGroup.Item>
            </ReOrderableItem>
          ))}
        </ReOrderableList>
      </div>
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
              {`import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import { ListGroup } from 'react-bootstrap'

export default function () {
  const [list, setList] = useState([
    { id: 1, name: 'This' },
    { id: 2, name: 'list' },
    { id: 2, name: 'is restricted' },
    { id: 2, name: 'to itself' }
  ])
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      <ReOrderableList
        //The unique identifier for this list. Should be unique from other lists and list groups.
        name='list2'
        //your list data
        list={list}
        //the list update callback
        onListUpdate={(newList) => setList(newList)}
        component={ListGroup}
      >
        {list.map((data, index) => (
          <ReOrderableItem key={\`item-\${index}\`}>
            <ListGroup.Item>{data.name}</ListGroup.Item>
          </ReOrderableItem>
        ))}
      </ReOrderableList>
    </div>
  )
}
`}
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
