import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { Box, ListSubheader } from '@material-ui/core'
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
      <h4>Nested Lists</h4>

      <ReOrderableList
        name='categories'
        list={todo}
        orientation='horizontal'
        onListUpdate={(newList) => setTodo(newList)}
        component={Box}
        componentProps={{
          style: { display: 'flex', gap: '20px' }
        }}
      >
        {todo.map((list, index) => {
          return (
            <ReOrderableItem
              key={`cat-${index}`}
              componentProps={{ className: classes.root }}
            >
              <ReOrderableList
                name='todo-list'
                group={todo}
                path={`${index}.tasks`}
                onListUpdate={(newList) => setTodo(newList)}
                component={List}
                componentProps={{
                  subheader: (
                    <ListSubheader component='div' id='nested-list-subheader'>
                      {list.name}
                    </ListSubheader>
                  )
                }}
              >
                {list.tasks.map((data, index) => (
                  <ReOrderableItem key={`item-${index}`}>
                    <ListItem>
                      <ListItemText primary={data.name} />
                    </ListItem>
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
              {`import React, { useState } from "react";
import { ReOrderableItem, ReOrderableList } from "react-reorderable-list";
import { Box, ListSubheader } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      border: "1px solid gray",
   },
}));
export default function () {
   const classes = useStyles();
   const [todo, setTodo] = useState([
      {
         id: 1,
         name: "In Progress",
         tasks: [
            { id: 1, name: "This task is in progress." },
            { id: 2, name: "This one too." },
            { id: 3, name: "Hello World!" },
         ],
      },
      {
         id: 2,
         name: "Complete",
         tasks: [
            { id: 1, name: "This task is completed." },
            { id: 2, name: "Im a task!" },
         ],
      },
   ]);
   return (
      <ReOrderableList
         name="categories"
         list={todo}
         orientation="horizontal"
         onListUpdate={(newList) => setTodo(newList)}
         component={Box}
         componentProps={{
            style: { display: "flex", gap: "20px" },
         }}>
         {todo.map((list, index) => {
            return (
               <ReOrderableItem
                  key={\`cat-\${index}\`}
                  componentProps={{ className: classes.root }}>
                  <ReOrderableList
                     name="todo-list"
                     group={todo}
                     path={\`\${index}.tasks\`}
                     onListUpdate={(newList) => setTodo(newList)}
                     component={List}
                     componentProps={{
                        subheader: (
                           <ListSubheader
                              component="div"
                              id="nested-list-subheader">
                              {list.name}
                           </ListSubheader>
                        ),
                     }}>
                     {list.tasks.map((data, index) => (
                        <ReOrderableItem key={\`item-\${index}\`}>
                          <ListItem>
                           <ListItemText primary={data.name} />
                         </ListItem>
                        </ReOrderableItem>
                     ))}
                  </ReOrderableList>
               </ReOrderableItem>
            );
         })}
      </ReOrderableList>
   );
}
`}
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
