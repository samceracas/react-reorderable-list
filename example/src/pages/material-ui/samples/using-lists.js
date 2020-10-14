import React, { useState } from 'react'
import {
  ReOrderableItem,
  ReOrderableList,
  ReOrderableListGroup
} from 'react-reorderable-list'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { Box } from '@material-ui/core'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { makeStyles } from '@material-ui/core/styles'

SyntaxHighlighter.registerLanguage('jsx', jsx)
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid gray'
  }
}))

export default function () {
  const classes = useStyles()
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
        <ReOrderableListGroup
          name='uniqueGroupName'
          group={groups}
          onListGroupUpdate={(newList) => setGroup(newList)}
        >
          {groups.map((list, index) => (
            <ReOrderableList
              key={`list-${index}`}
              path={`${index}.tasks`}
              component={List}
              componentProps={{
                className: classes.root
              }}
            >
              {list.tasks.map((data, index) => (
                <ReOrderableItem key={`item-${index}`} component={ListItem}>
                  <ListItemText primary={data.name} />
                </ReOrderableItem>
              ))}
            </ReOrderableList>
          ))}
        </ReOrderableListGroup>
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
