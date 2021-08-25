import { Box } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <Box display='flex' height='100%'>
      <Box
        margin='auto'
        textAlign='center'
        display='flex'
        flexDirection='column'
      >
        <h4>Below are some examples using different UI frameworks:</h4>
        <Link to='/docs/material-ui'>Material UI</Link>
        <Link to='/docs/react-bootstrap'>React Bootstrap</Link>

        <p>More coming soon!</p>
      </Box>
    </Box>
  )
}
