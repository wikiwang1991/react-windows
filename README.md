# react-windows-component

[![Build Status](https://travis-ci.com/wikiwang1991/react-windows-component.svg?branch=master)](https://travis-ci.com/wikiwang1991/react-windows-component)

## Screenshots

![](doc/screenshot.png)

<!-- ## Feature -->

## Usage

```jsx
<Windows}>
  <Window style={{x: 30, y: 0, w: 60, h: 60}}>
    1
  </Window>
  <Window style={{x: 0, y: 60, w: 60, h: 60}}>
    2
  </Window>
  <Window style={{x: 60, y: 60, w: 60, h: 60}}>
    3
  </Window>
</Windows>
```

## API

### Window

| Property | Description | Type | Default |
| - | - | - | - |
| x | | `number` | |
| y | | `number` | |
| w | | `number` | |
| h | | `number` | |
| movable | | `boolean` | `false` |
| resizable | | `boolean` | `false` |

### Windows

| Property | Description | Type | Default |
| - | - | - | - |
| movable | | `boolean` | `false` |
| scalable | | `boolean` | `false` |
| width | | `number` | `120` |
| height | | `number` | `120` |
| innerStyle | | `CSSProperties` | |
| cover | | `React.ReactNode` | |
