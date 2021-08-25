import React, { useState } from 'react'
import {
  ReOrderableItem,
  ReOrderableList,
  ReOrderableListGroup
} from 'react-reorderable-list'
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
    <>
      {' '}
      <h4 style={styleReset}>
        Using the{' '}
        <a
          href='https://react-bootstrap.github.io/components/list-group/'
          target='_blank'
          rel='noopener noreferrer'
        >
          ListGroup
        </a>{' '}
        component
      </h4>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <ReOrderableListGroup
          name='uniqueGroupName'
          group={groups}
          onListGroupUpdate={(newList) => setGroup(newList)}
        >
          {groups.map((list, index) => (
            <ReOrderableList
              key={`list-${index}`}
              path={`${index}.tasks`}
              component={ListGroup}
              componentProps={{
                style: { minHeight: '200px', minWidth: '100px' }
              }}
            >
              {list.tasks.map((data, index) => (
                <ReOrderableItem key={`item-${index}`}>
                  <ListGroup.Item>{data.name}</ListGroup.Item>
                </ReOrderableItem>
              ))}
            </ReOrderableList>
          ))}
        </ReOrderableListGroup>
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
import {
  ReOrderableItem,
  ReOrderableList,
  ReOrderableListGroup
} from 'react-reorderable-list'
import { ListGroup } from 'react-bootstrap'

export default function () {
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
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      <ReOrderableListGroup
        name='uniqueGroupName'
        group={groups}
        onListGroupUpdate={(newList) => setGroup(newList)}
      >
        {groups.map((list, index) => (
          <ReOrderableList
            key={\`list-\${index}\`}
            path={\`\${index}.tasks\`}
            component={ListGroup}
            componentProps={{
              style: { minHeight: '200px', minWidth: '100px' }
            }}
          >
            {list.tasks.map((data, index) => (
              <ReOrderableItem key={\`item-\${index}\`}>
                <ListGroup.Item>{data.name}</ListGroup.Item>
              </ReOrderableItem>
            ))}
          </ReOrderableList>
        ))}
      </ReOrderableListGroup>
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
