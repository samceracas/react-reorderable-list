import React from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Box, Container, Divider } from '@material-ui/core'
import 'react-reorderable-list/dist/index.css'

export default function (props) {
  const samples = props.samples || []
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
            {samples.map((sample) => {
              const Component = sample;
              return (
                <>
                  <Divider light style={{ margin: '25px 0' }} />
                  <Component />
                </>
              )
            })}
          </Box>
        </Box>
      </Container>
    </>
  )
}
