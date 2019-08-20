import React from 'react'
import {Windows, Window} from 'react-windows-component'

export default Basic = () => {
  return <Windows style={{width: 480, height: 270, border: '1px solid gray'}}>
    <Window x={30} y={0} w={60} h={60}>
      1
    </Window>
    <Window x={0} y={0.5} w={0.5} h={0.5}>
      2
    </Window>
    <Window x='1/2' y='1/2' w='1/2' h='1/2'>
      3
    </Window>
  </Windows>
}
