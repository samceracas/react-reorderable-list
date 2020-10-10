import { Box } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <Box display='flex' height='100%'>
      <Box margin='auto' textAlign='center'>
        <h3>Below are some examples using different UI frameworks:</h3>
        <Link to='/material-ui'>Material UI</Link>
      </Box>
    </Box>
  )
}
