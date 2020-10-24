import React, { useState } from 'react'
import { ReOrderableItem, ReOrderableList } from 'react-reorderable-list'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { Box } from '@material-ui/core'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
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
        Ungroupped List
      </h4>
      <Box display='flex' gridGap='10px'>
        <ReOrderableList
          //The unique identifier for this list. Should be unique from other lists and list groups.
          name='list2'
          //your list data
          list={list}
          //the list update callback
          onListUpdate={(newList) => setList(newList)}
          component={List}
          componentProps={{
            className: classes.root
          }}
        >
          {list.map((data, index) => (
            <ReOrderableItem key={`item-${index}`} component={ListItem}>
              <ListItemText primary={data.name} />
            </ReOrderableItem>
          ))}
        </ReOrderableList>
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
              {`import React, { useState } from "react";
import { ReOrderableItem, ReOrderableList } from "react-reorderable-list";
import { Box } from "@material-ui/core";
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
   const [list, setList] = useState([
      { id: 1, name: "This" },
      { id: 2, name: "list" },
      { id: 2, name: "is restricted" },
      { id: 2, name: "to itself" },
   ]);
   return (
      <Box display="flex" gridGap="10px">
         <ReOrderableList
            //The unique identifier for this list. Should be unique from other lists and list groups.
            name="list2"
            //your list data
            list={list}
            //the list update callback
            onListUpdate={(newList) => setList(newList)}
            component={List}
            componentProps={{
               className: classes.root,
            }}>
            {list.map((data, index) => (
               <ReOrderableItem key={\`item-\${index}\`} component={ListItem}>
                  <ListItemText primary={data.name} />
               </ReOrderableItem>
            ))}
         </ReOrderableList>
      </Box>
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
