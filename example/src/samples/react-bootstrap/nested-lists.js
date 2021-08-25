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
  const [todo, setTodo] = useState([
    {
      id: 1,
      name: 'In Progress',
      tasks: [
        { id: 1, name: 'This task is in progress.' },
        { id: 2, name: 'This one too.' },
        { id: 3, name: 'Hello World!' }
      ]
    },
    {
      id: 2,
      name: 'Complete',
      tasks: [
        { id: 1, name: 'This task is completed.' },
        { id: 2, name: 'Im a task!' }
      ]
    }
  ])
  return (
    <>
      <h4 style={styleReset}>Nested Lists</h4>

      <p>
        The categories "In Progress" and "Complete" can be reordered as well as
        its children.
      </p>

      <ReOrderableList
        name='categories'
        list={todo}
        orientation='horizontal'
        onListUpdate={(newList) => setTodo(newList)}
        componentProps={{
          style: { display: 'flex', gap: '20px' }
        }}
      >
        {todo.map((list, index) => {
          return (
            <ReOrderableItem key={`cat-${index}`}>
              <ReOrderableList
                name='todo-list'
                group={todo}
                path={`${index}.tasks`}
                onListUpdate={(newList) => setTodo(newList)}
                component={ListGroup}
              >
                <h6>{list.name}</h6>
                {list.tasks.map((data, index) => (
                  <ReOrderableItem key={`item-${index}`}>
                    <ListGroup.Item>{data.name}</ListGroup.Item>
                  </ReOrderableItem>
                ))}
              </ReOrderableList>
            </ReOrderableItem>
          )
        })}
      </ReOrderableList>

      <Accordion>
        <AccordionSummary aria-controls='panel2a-content' id='panel2a-header'>
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
  const [todo, setTodo] = useState([
    {
      id: 1,
      name: 'In Progress',
      tasks: [
        { id: 1, name: 'This task is in progress.' },
        { id: 2, name: 'This one too.' },
        { id: 3, name: 'Hello World!' }
      ]
    },
    {
      id: 2,
      name: 'Complete',
      tasks: [
        { id: 1, name: 'This task is completed.' },
        { id: 2, name: 'Im a task!' }
      ]
    }
  ])
  return (
    <ReOrderableList
      name='categories'
      list={todo}
      orientation='horizontal'
      onListUpdate={(newList) => setTodo(newList)}
      componentProps={{
        style: { display: 'flex', gap: '20px' }
      }}
    >
      {todo.map((list, index) => {
        return (
          <ReOrderableItem key={\`cat-\${index}\`}>
            <ReOrderableList
              name='todo-list'
              group={todo}
              path={\`\${index}.tasks\`}
              onListUpdate={(newList) => setTodo(newList)}
              component={ListGroup}
            >
              <h6>{list.name}</h6>
              {list.tasks.map((data, index) => (
                <ReOrderableItem key={\`item-\${index}\`}>
                  <ListGroup.Item>{data.name}</ListGroup.Item>
                </ReOrderableItem>
              ))}
            </ReOrderableList>
          </ReOrderableItem>
        )
      })}
    </ReOrderableList>
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
