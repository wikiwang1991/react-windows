import React from 'react'
import withStyles from 'react-jss'

import * as Compute from './compute.js'

const lineHWidth = 10
const lineWidth = lineHWidth * 2

const styles = {
	window: {
		position: 'absolute',
		border: '0px solid #8a8a8c',
		borderCollapse: 'collapse',
		overflow: 'hidden',
	},
	windows: {
		position: 'relative',
		overflow: 'hidden',
		width: '100%',
		height: '100%',
	},
	view: {
		boxShadow: '0 0 black',
	},
	move: {
		position: 'absolute',
		width: 'calc(100% - ' + lineWidth + 'px)',
		height: 'calc(100% - ' + lineWidth + 'px)',
		left: lineHWidth,
		top: lineHWidth,
    cursor: 'move',
		overflow: 'hidden',
	},
	resizeE: {
		position: 'absolute',
		width: lineWidth,
		height: 'calc(100% - ' + lineWidth + 'px)',
		right: -lineHWidth,
		top: lineHWidth,
		cursor: 'e-resize',
	},
	resizeN: {
		position: 'absolute',
		width: 'calc(100% - ' + lineHWidth + 'px)',
		height: lineWidth,
		left: lineHWidth,
		top: -lineHWidth,
		cursor: 'n-resize',
	},
	resizeNE: {
		position: 'absolute',
		width: lineWidth,
		height: lineWidth,
		right: -lineHWidth,
		top: -lineHWidth,
		cursor: 'ne-resize',
	},
	resizeNW: {
		position: 'absolute',
		width: lineWidth,
		height: lineWidth,
		left: -lineHWidth,
		top: -lineHWidth,
		cursor: 'nw-resize',
	},
	resizeS: {
		position: 'absolute',
		width: 'calc(100% - ' + lineWidth + 'px)',
		height: lineWidth,
		left: lineHWidth,
		bottom: -lineHWidth,
		cursor: 's-resize',
	},
	resizeSE: {
		position: 'absolute',
		width: lineWidth,
		height: lineWidth,
		right: -lineHWidth,
		bottom: -lineHWidth,
		cursor: 'se-resize',
	},
	resizeSW: {
		position: 'absolute',
		width: lineWidth,
		height: lineWidth,
		left: -lineHWidth,
		bottom: -lineHWidth,
		cursor: 'sw-resize',
	},
	resizeW: {
		position: 'absolute',
		width: lineWidth,
		height: 'calc(100% - ' + lineWidth + 'px)',
		left: -lineHWidth,
		top: lineHWidth,
		cursor: 'w-resize',
	},
	title: {
		transformOrigin: 'top left',
	},
}

export const Action = {
	focus:		0,
	move:     1,
	resizeE:  2,
	resizeN:  3,
	resizeNE: 4,
	resizeNW: 5,
	resizeS:  6,
	resizeSE: 7,
	resizeSW: 8,
	resizeW:  9,
}

class Window extends React.Component {
	mouseDown = false
	ref = React.createRef()

	onMove = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.move, event)
	}

	onResizeE = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeE, event)
	}

	onResizeN = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeN, event)
	}

	onResizeNE = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeNE, event)
	}

	onResizeNW = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeNW, event)
	}

	onResizeS = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeS, event)
	}

	onResizeSE = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeSE, event)
	}

	onResizeSW = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeSW, event)
	}

	onResizeW = event => {
		event.preventDefault()
		this.props.onEvent(this, Action.resizeW, event)
	}

	onMouseDown = event => {
		this.mouseDown = true
		this.x = event.clientX
		this.y = event.clientY
		event.preventDefault()
	}

	onMouseUp = event => {
		if (this.mouseDown) {
			if (!event.target.onclick &&
				this.props.onSelect &&
				this.x === event.clientX &&
				this.y === event.clientY)
				this.ref.current.focus()
			this.mouseDown = false
		}
	}

	onMouseLeave = () => {this.mouseDown = false}

	onDragOver = event => {
		if (this.props.onDragOver)
			this.props.onDragOver(event, this.props.id)
	}

	onDrop = event => {
		if (this.props.onDrop)
			this.props.onDrop(event, this.props.id)
	}

	onFocus = event => {
		if (this.props.onSelect)
			this.props.onSelect(this.props.id)
		this.props.onEvent(this, Action.focus, event)
	}

	blur = () => {
		this.ref.current.blur()
	}

	render() {
		const { classes, scale } = this.props

		let style = {
			left: this.props.x,
			top: this.props.y,
			width: this.props.w,
			height: this.props.h,
			borderWidth: isNaN(scale) || !isFinite(scale) ? 0 : scale,
		}

		const controls = []
		if (this.props.movable)
			controls.push(<div key='q' className={classes.move} onMouseDown={this.onMove} />)
		if (this.props.resizable) {
			controls.push(<div key='u' className={classes.resizeE} onMouseDown={this.onResizeE} />)
			controls.push(<div key='i' className={classes.resizeN} onMouseDown={this.onResizeN} />)
			controls.push(<div key='c' className={classes.resizeNE} onMouseDown={this.onResizeNE} />)
			controls.push(<div key='k' className={classes.resizeNW} onMouseDown={this.onResizeNW} />)
			controls.push(<div key='f' className={classes.resizeS} onMouseDown={this.onResizeS} />)
			controls.push(<div key='o' className={classes.resizeSE} onMouseDown={this.onResizeSE} />)
			controls.push(<div key='x' className={classes.resizeSW} onMouseDown={this.onResizeSW} />)
			controls.push(<div key='j' className={classes.resizeW} onMouseDown={this.onResizeW} />)
		}
		if (this.props.title)
			controls.push(<div key='u' className={classes.title} style={{
				transform: 'scale('+scale+','+scale+')'
			}}>{this.props.title}</div>)

		if (this.props.style) {
			let propStyle = {}
			Object.assign(propStyle, this.props.style)
			Object.assign(style, propStyle)
		}

		return <div ref={this.ref} className={classes.window}
			style={style} onDrop={this.onDrop}
			onMouseDown={this.onMouseDown} onMouseLeave={this.onMouseLeave}
			onMouseUp={this.onMouseUp} onDragOver={this.onDragOver}
			tabIndex={this.props.tabIndex} onFocus={this.onFocus}
			onKeyUp={this.props.onKeyUp}>
			{controls}{this.props.children}
		</div>
	}
}

class WindowsComponent extends React.Component {
	constructor(props) {
		super(props)
		this.container = React.createRef()
		this.canvas = React.createRef()
		this.action = 0
		this.focus = null
		this.state = {
			x: 0, y: 0, scale: 1, initRender: true,
			width: props.width, height: props.height,
		}
  }

	onWheel = e => {
		if (!this.props.scalable) return
		const oldScale = this.state.scale
		const newScale = oldScale - e.deltaY / 10000
		if (newScale < 0) return
		const div = newScale / oldScale
		const x = this.state.x * div
		const y = this.state.y * div
		this.setState({scale: newScale, initRender: false, x: x, y: y})
		if (this.props.onScale) this.props.onScale(newScale)
	}

	onEvent = (window, action, event) => {
		this.action = action
		this.focus = window

		switch (action) {
		case Action.move:
		case Action.resizeNW:
		case Action.resizeW:
		case Action.resizeSW:
			this.x = event.clientX - window.props.x * this.state.scale
			break
		case Action.resizeE:
		case Action.resizeNE:
		case Action.resizeSE:
			this.x = event.clientX - (window.props.x + window.props.w) * this.state.scale
			break
		}

		switch (action) {
		case Action.move:
		case Action.resizeN:
		case Action.resizeNE:
		case Action.resizeNW:
			this.y = event.clientY - window.props.y * this.state.scale
			break
		case Action.resizeS:
		case Action.resizeSE:
		case Action.resizeSW:
			this.y = event.clientY - (window.props.y + window.props.h) * this.state.scale
			break
		}

		event.stopPropagation()
	}

	onMouseDown = event => {
		if (!this.props.movable) return
		this.action = Action.move
		this.focus = null
		this.x = event.clientX - this.state.x
		this.y = event.clientY - this.state.y
	}

	onMouseMove = event => {
		switch (this.action) {
		case null: break
		case Action.move:
			if (this.focus) {
				if (this.props.onWindowMove)
					this.props.onWindowMove({window: this.focus.props.id,
						x: (event.clientX - this.x) / this.state.scale,
						y: (event.clientY - this.y) / this.state.scale,
					})
			} else this.setState({x: event.clientX - this.x, y: event.clientY - this.y})
			break
		default:
			if (this.focus)
				this.props.onWindowResize({
					window: this.focus.props.id, action: this.action,
					x: (event.clientX - this.x) / this.state.scale,
					y: (event.clientY - this.y) / this.state.scale,
				})
			break
		}
	}

	onMouseUp = event => {
		if (this.action) {
			// ugly fix
			if (!event.target.onclick &&
				this.action === Action.move && this.focus) {
				const window = this.focus
				if (window.props.onSelect &&
					this.x === event.clientX - window.props.x * this.state.scale &&
					this.y === event.clientY - window.props.y * this.state.scale)
					window.props.onSelect(window.props.id)
			}
			this.action = null
		}
	}

	renderGrid = () => {
		const ctx = this.canvas.current.getContext('2d')

		ctx.lineWidth = 1
		ctx.strokeStyle = '#8a8a8c80'
		ctx.setLineDash([8, 4])
		
		for (const i of this.props.grid) {
			const width = Compute.computeActualLength(i, this.props.width)
			const height = Compute.computeActualLength(i, this.props.height)

			ctx.moveTo(width, 0)
			ctx.lineTo(width, this.props.height)

			ctx.moveTo(0, height)
			ctx.lineTo(this.props.width, height)
		}
		ctx.stroke()
	}

	reset = () => {
		this.setState({initRender: true, x: 0, y: 0})
	}

	componentDidMount() {
		this.setState({initRender: true})
	}

	componentDidUpdate() {
		if (this.props.scalable &&
			(!this.state.initRender || !this.container.current))
			return

		const { clientWidth, clientHeight } = this.container.current

		let scale

		if (this.props.width / this.props.height > clientWidth / clientHeight)
			scale = clientWidth * 0.88 / this.props.width
		else scale = clientHeight * 0.88 / this.props.height

		if (scale === this.state.scale) return

		if (this.props.grid) this.renderGrid()
		setTimeout(() => {
			this.setState({scale: scale, initRender: false})
			if (this.props.onScale) this.props.onScale(scale)
		}, 0)
	}
	
	static getDerivedStateFromProps(props, state) {
		if (props.width != state.width || props.height != state.height)
			return {initRender: true, width: props.width, height: props.height}
		return null
	}

	render() {
		const { classes } = this.props

		const antiScale = 1 / this.state.scale
		const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
				classes: classes, onEvent: this.onEvent, scale: antiScale,
			})
    )

		return (
			<div className={classes.windows} ref={this.container}
				onWheel={this.props.scalable ? this.onWheel : undefined}
				onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}
				onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseUp}
				style={this.props.style}>
				<div className={classes.view} style={{
					position: 'absolute',
					left: `calc((100% - ${this.props.width}px) / 2 + ${this.state.x}px)`,
					top: `calc((100% - ${this.props.height}px) / 2 + ${this.state.y}px)`,
					width: this.props.width, height: this.props.height,
					transform: 'scale('+this.state.scale+','+this.state.scale+')',
					...this.props.innerStyle,
				}}>
					{this.props.grid && <canvas ref={this.canvas} width={this.props.width} height={this.props.height} />}
					{children}
				</div>
				{this.props.cover}
			</div>
		)
	}
}

Window.defaultProps = {
	x: 0, y: 0, w: 0, h: 0, z: 0,
	visible: true, movable: false, resizable: false, onSelect: null,
}

WindowsComponent.defaultProps = {
	onWindowMove: null,
}

const Windows = withStyles(styles)(WindowsComponent)

export { Window, Windows }
