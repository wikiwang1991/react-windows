import React, { useState } from 'react'
import {Windows, Window} from 'react-windows-component'

const content = [
  <Window x={30} y={0} w={60} h={60}>1</Window>,
  <Window x={0} y={0.5} w={0.5} h={0.5}>2</Window>,
  <Window x='1/2' y='1/2' w='1/2' h='1/2'>3</Window>,
]

export default Minimap = () => {
  const ref = React.useRef()

  const [vpRect, setVpRect] = useState({x: 0, y: 0, w: 1, h: 1})
  const [scale, setScale] = useState()

  return <div style={{display: 'flex'}}>
    <Windows style={{width: 480, height: 270, border: '1px solid gray'}}
      movable scalable outerRef={ref} onScale={scale => setScale(scale)}
      cover={scale}>
      {content}
    </Windows>
    <Windows style={{width: 240, height: 135, border: '1px solid gray'}}>
      {content}
      <Window x={vpRect.x} y={vpRect.y} w={vpRect.w} h={vpRect.h}
        style={{borderColor: 'blue'}} />
    </Windows>
  </div>
}
