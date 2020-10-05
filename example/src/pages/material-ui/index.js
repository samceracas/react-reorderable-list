import React from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Box, Container, Divider, Typography } from '@material-ui/core'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function (props) {
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
            <Typography variant='h5'>Grouped List</Typography>
            <Divider light style={{ margin: '5px 0' }} />

            <Typography variant='body'>
              A group of lists wrapped within a{' '}
              <code>
                <pre>ReOrderableListGroup</pre>
              </code>
              . Lists within the group can transfer data between each other.
              Provides less setup and a cleaner configuration for generic
              grouped lists.
            </Typography>

            <p>
              <b>Default usage.</b>
            </p>
            <SyntaxHighlighter
              language='jsx'
              style={materialDark}
              customStyle={{ display: 'block' }}
            >
              {'<Divider />'}
            </SyntaxHighlighter>

            <p>
              <b>
                Using the{' '}
                <code>
                  <pre>path</pre>
                </code>{' '}
                property for lists embedded inside an object.
              </b>
            </p>
            <SyntaxHighlighter
              language='jsx'
              style={materialDark}
              customStyle={{ display: 'block' }}
            >
              {'<Divider />'}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Container>
    </>
  )
}
