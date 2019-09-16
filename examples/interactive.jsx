import React, { useState } from 'react'
import {Windows, Window} from 'react-windows-component'

export default Interactive = () => {
  const [windows, setWindows] = useState({
    '1': {x: 30, y: 0, w: 60, h: 60},
    '2': {x: 0, y: 0.5, w: 0.5, h: 0.5},
    '3': {x: '1/2', y: '1/2', w: '1/2', h: '1/2'},
  })
  const [focus, setFocus] = useState()

  const children = []
  for (const id in windows) {
    const win = windows[id]
    const current = id === focus
    children.push(<Window key={id} x={win.x} y={win.y} w={win.w} h={win.h}
      tabIndex={id} movable={current} resizable={current}>
      <div style={{background: 'gray'}}>
        {id}
      </div>
    </Window>)
  }

  return <Windows style={{width: 480, height: 270, border: '1px solid gray'}}
    innerStyle={{border: '1px dashed gray'}}
    movable scalable
    onFocus={({key}) => {setFocus(key)}}
    onBlur={() => {setFocus(null)}}
    onWindowChange={({key, x, y, w, h}) => {
      const newWindows = {...windows}
      for (const id in windows)
        if (id === key) newWindows[id] = {x: x, y: y, w: w, h: h}
        else newWindows[id] = {...windows[id]}
      setWindows(newWindows)
    }}
    cover={focus && <div>
      <div>{windows[focus].x}</div>
      <div>{windows[focus].y}</div>
      <div>{windows[focus].w}</div>
      <div>{windows[focus].h}</div>
    </div>}>
    {children}
  </Windows>
}
