import { useParams } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import MaterialNestedLists from '../samples/material-ui/nested-lists'
import MaterialUsingLists from '../samples/material-ui/using-lists'
import MaterialUsingUngrouppedList from '../samples/material-ui/using-ungroupped-list'

import ReactBootstrapNestedLists from '../samples/react-bootstrap/nested-lists'
import ReactBootstrapUsingLists from '../samples/react-bootstrap/using-lists'
import ReactBootstrapUsingUngrouppedList from '../samples/react-bootstrap/using-ungroupped-list'
import ExamplesList from '../components/examples-list'

const availableFrameworks = {
  'material-ui': {
    components: [
      MaterialUsingLists,
      MaterialNestedLists,
      MaterialUsingUngrouppedList
    ]
  },
  'react-bootstrap': {
    components: [
      ReactBootstrapUsingLists,
      ReactBootstrapNestedLists,
      ReactBootstrapUsingUngrouppedList
    ],
    extras: () => {
      return ReactDOM.createPortal(
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
          integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'
          crossOrigin='anonymous'
        ></link>,
        document.head
      )
    }
  }
}

export default function () {
  const { framework } = useParams()
  const docs = availableFrameworks[framework]
  if (!docs) return <div>404 not found!</div>
  return (
    <>
      {docs.extras && docs.extras()}
      <ExamplesList samples={docs.components} />
    </>
  )
}
