import React from 'react'
import ReactDOM from 'react-dom'

import Basic from './basic.jsx'
import Interactive from './interactive.jsx'

const Examples = () => {
  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Basic />
    <br />
    <Interactive />
  </div>
}

ReactDOM.render(<Examples />, document.body)
