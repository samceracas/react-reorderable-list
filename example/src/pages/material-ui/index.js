import React, { useState } from 'react'
import {
  ReOrderableItem,
  ReOrderableList,
  ReOrderableListGroup
} from 'react-reorderable-list'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Box, Container, Divider, ListSubheader } from '@material-ui/core'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

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
  let history = useHistory()
  const homeClick = () => {
    history.push('/')
  }
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' onClick={homeClick}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Box my={3}>
          <Box my={3}>
            <Divider light style={{ margin: '5px 0' }} />
            <p>
              <b>
                Using the{' '}
                <a
                  href='https://material-ui.com/components/lists/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  List
                </a>{' '}
                component.
              </b>
            </p>
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
                      <ReOrderableItem
                        key={`item-${index}`}
                        component={ListItem}
                      >
                        <ListItemText primary={data.name} />
                      </ReOrderableItem>
                    ))}
                  </ReOrderableList>
                ))}
              </ReOrderableListGroup>
            </Box>

            <Accordion>
              <AccordionSummary
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
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
    onListGroupUpdate={(newList) => setGroup(newList)}>
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
          <ReOrderableItem
            key={\`item-\${index}\`}
            component={ListItem}
          >
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

            <p>
              <b>Nested lists</b>
            </p>

            <ReOrderableList
              name='categories'
              list={groups}
              orientation='horizontal'
              onListUpdate={(newList) => setGroup(newList)}
              component={Box}
              componentProps={{
                style: { display: 'flex', gap: '20px' }
              }}
            >
              {groups.map((list, index) => {
                return (
                  <ReOrderableItem
                    key={`cat-${index}`}
                    componentProps={{ className: classes.root }}
                  >
                    <ReOrderableList
                      name='list3'
                      group={groups}
                      path={`${index}.tasks`}
                      onListUpdate={(newList) => setGroup(newList)}
                      component={List}
                      componentProps={{
                        subheader: (
                          <ListSubheader
                            component='div'
                            id='nested-list-subheader'
                          >
                            {list.name}
                          </ListSubheader>
                        )
                      }}
                    >
                      {list.tasks.map((data, index) => (
                        <ReOrderableItem
                          key={`item-${index}`}
                          component={ListItem}
                        >
                          <ListItemText primary={data.name} />
                        </ReOrderableItem>
                      ))}
                    </ReOrderableList>
                  </ReOrderableItem>
                )
              })}
            </ReOrderableList>
          </Box>
        </Box>
      </Container>
    </>
  )
}
