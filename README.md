# react-windows-component

[![Build Status](https://travis-ci.com/wikiwang1991/react-windows-component.svg?branch=master)](https://travis-ci.com/wikiwang1991/react-windows-component)

## Screenshots

![](doc/screenshot.png)

<!-- ## Feature -->

## Usage

```jsx
<Windows>
  <Window style={{left: 30, top: 0, width: 60, height: 60}}>
    1
  </Window>
  <Window style={{left: 0, top: 60, width: 60, height: 60}}>
    2
  </Window>
  <Window style={{left: 60, top: 60, width: 60, height: 60}}>
    3
  </Window>
</Windows>
```

## API

### Window

| Property | Description | Type | Default |
| - | - | - | - |
| movable | | `boolean` | `false` |
| resizable | | `boolean` | `false` |

### Windows

| Property | Description | Type | Default |
| - | - | - | - |
| movable | | `boolean` | `false` |
| scalable | | `boolean` | `false` |
| width | | `number` | `120` |
| height | | `number` | `120` |
| x | | `number` | `0` |
| y | | `number` | `0` |
| scale | | `number` | |
| onScale | | `function({scale})` | |
| onMove | | `function({x, y})` | |
| onFocus | | `function({key})` | |
| onBlur | | `function({key})` | |
| onWindowChange | | `function({key, left, top, width, height})` | |
| innerStyle | | `CSSStyleDeclaration` | |
| cover | | `React.ReactNode` | |