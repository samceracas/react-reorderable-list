import React from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Box, Container, Divider } from '@material-ui/core'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import UsingLists from './samples/using-lists'
import NestedLists from './samples/nested-lists'
import UsingUngrouppedList from './samples/using-ungroupped-list'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function () {
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

            <UsingLists />

            <Divider style={{ margin: '25px 0' }} />

            <NestedLists />

            <Divider style={{ margin: '25px 0' }} />

            <UsingUngrouppedList />
          </Box>
        </Box>
      </Container>
    </>
  )
}
