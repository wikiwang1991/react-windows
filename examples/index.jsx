import React from 'react'
import ReactDOM from 'react-dom'

import Basic from './basic.jsx'
import Interactive from './interactive.jsx'
import Minimap from './minimap.jsx'

const Examples = () => {
  const [tab, setTab] = React.useState('basic')

  render = tab => {
    switch (tab) {
    case 'basic': return <Basic />
    case 'interactive': return <Interactive />
    case 'minimap': return <Minimap />
    }
  }

  return <div>
    <button onClick={() => setTab('basic')}>Basic</button>
    <button onClick={() => setTab('interactive')}>Interactive</button>
    <button onClick={() => setTab('minimap')}>Minimap</button>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {render(tab)}
    </div>
  </div>
}

ReactDOM.render(<Examples />, document.body)
