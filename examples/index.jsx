import React from 'react'
import ReactDOM from 'react-dom'

const Basic = React.lazy(() => import('./basic.jsx'))
const Interactive = React.lazy(() => import('./interactive.jsx'))
const Minimap = React.lazy(() => import('./minimap.jsx'))

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
