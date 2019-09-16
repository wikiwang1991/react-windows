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

const Action = {
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
				this.props.tabIndex &&
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
		this.props.onEvent(this, Action.focus, event)
	}

	blur = () => {
		this.ref.current.blur()
	}

	render() {
		const { classes, scale, antiScale } = this.props

		let style = {
			left: this.props.ax,
			top: this.props.ay,
			width: this.props.aw,
			height: this.props.ah,
			borderWidth: isNaN(antiScale) || !isFinite(antiScale) ? 0 : antiScale,
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
			{controls}
			<div style={{
				transformOrigin: 'top left',
				transform: `scale(${antiScale},${antiScale})`,
				width: `calc(100% * ${scale})`,
				height: `calc(100% * ${scale})`,
			}}>
				{this.props.children}
			</div>
		</div>
	}
}

class WindowsComponent extends React.Component {
	constructor(props) {
		super(props)
		this.container = props.outerRef ? props.outerRef : React.createRef()
		this.canvas = React.createRef()
		this.action = 0
		this.focus = null
		this.state = {
			x: 0, y: 0, scale: 1, initRender: true,
			width: props.width, height: props.height,
		}
  }

	scale = () => {return this.props.scale ? this.props.scale : this.state.scale}	

	onWheel = e => {
		if (!this.props.scalable) return
		const oldScale = this.scale()
		const newScale = oldScale - e.deltaY / 10000
		if (newScale < 0) return
		if (this.props.onScale) this.props.onScale(newScale)
		if (this.props.scale) return
		const div = newScale / oldScale
		const x = this.state.x * div
		const y = this.state.y * div
		this.setState({scale: newScale, initRender: false, x: x, y: y})
	}

	onEvent = (window, action, event) => {
		this.action = action
		this.focus = window

		if (this.action === Action.focus) {
			if (this.props.onFocus)
				this.props.onFocus({key: window.props.eventKey})
			return
		}

		const scale = this.scale()

		switch (action) {
		case Action.move:
		case Action.resizeNW:
		case Action.resizeW:
		case Action.resizeSW:
			this.x = event.clientX - window.props.ax * scale
			break
		case Action.resizeE:
		case Action.resizeNE:
		case Action.resizeSE:
			this.x = event.clientX - (window.props.ax + window.props.aw) * scale
			break
		}

		switch (action) {
		case Action.move:
		case Action.resizeN:
		case Action.resizeNE:
		case Action.resizeNW:
			this.y = event.clientY - window.props.ay * scale
			break
		case Action.resizeS:
		case Action.resizeSE:
		case Action.resizeSW:
			this.y = event.clientY - (window.props.ay + window.props.ah) * scale
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
		case null:
		case Action.focus:
			break
		default:
			if (this.focus) {
				if (this.props.onWindowChange) {
					const scale = this.scale()
					this.onWindowChange({
						tx: (event.clientX - this.x) / scale,
						ty: (event.clientY - this.y) / scale,
					})
				}
			} else if (this.action === Action.move)
				this.setState({x: event.clientX - this.x, y: event.clientY - this.y})
			break
		}
	}

	onMouseUp = () => {
		if (this.action)
			this.action = null
	}

  onWindowChange = ({tx, ty}) => {
		const width = this.props.width
		const height = this.props.height
		const rect = {
			x: this.focus.props.x, y: this.focus.props.y,
			w: this.focus.props.w, h: this.focus.props.h,
		}
		const x = Compute.computeActualLength(rect.x, width)
		const y = Compute.computeActualLength(rect.y, height)
		const w = Compute.computeActualLength(rect.w, width)
		const h = Compute.computeActualLength(rect.h, height)

		switch (this.action) {
		case Action.move:
			rect.x = this.magnetize(tx, width)
			rect.y = this.magnetize(ty, height)
			break
		case Action.resizeE: {
			const nw = this.magnetize(tx - x, width)
			if (typeof nw === 'string' || nw > 0) rect.w = nw
			break
		} case Action.resizeN: {
			const ny = this.magnetize(ty, height)
			const nh = this.magnetize(y + h - Compute.computeActualLength(ny, height), height, 1)
			if (typeof nh === 'string' || nh > 0) {rect.y = ny; rect.h = nh}
			break
		} case Action.resizeNE: {
			const nw = this.magnetize(tx - x, width)
			const ny = this.magnetize(ty, height)
			const nh = this.magnetize(y + h - Compute.computeActualLength(ny, height), height, 1)
			if ((typeof nw === 'string' || nw > 0) && (typeof nh === 'string' || nh > 0)) {
				rect.w = nw; rect.y = ny; rect.h = nh
			}
			break
		} case Action.resizeNW: {
			const nx = this.magnetize(tx, width)
			const nw = this.magnetize(x + w - Compute.computeActualLength(nx, width), width, 1)
			const ny = this.magnetize(ty, height)
			const nh = this.magnetize(y + h - Compute.computeActualLength(ny, height), height, 1)
			if ((typeof nw === 'string' || nw > 0) && (typeof nh === 'string' || nh > 0)) {
				rect.x = nx; rect.w = nw; rect.y = ny; rect.h = nh
			}
			break
		} case Action.resizeS: {
			const nh = this.magnetize(ty - y, height)
			if (typeof nh === 'string' || nh > 0) rect.h = nh
			break
		} case Action.resizeSE: {
			const nw = this.magnetize(tx - x, width)
			const nh = this.magnetize(ty - y, height)
			if ((typeof nw === 'string' || nw > 0) && (typeof nh === 'string' || nh > 0)) {
				rect.w = nw; rect.h = nh
			}
			break
		} case Action.resizeSW: {
			const nx = this.magnetize(tx, width)
			const nw = this.magnetize(x + w - Compute.computeActualLength(nx, width), width, 1)
			const nh = this.magnetize(ty - y, height)
			if ((typeof nw === 'string' || nw > 0) && (typeof nh === 'string' || nh > 0)) {
				rect.x = nx; rect.w = nw; rect.h = nh
			}
			break
		} case Action.resizeW: {
			const nx = this.magnetize(tx, width)
			const nw = this.magnetize(x + w - Compute.computeActualLength(nx, width), width, 1)
			if (typeof nw === 'string' || nw > 0) {rect.x = nx; rect.w = nw}
			break
		}
		}

		this.props.onWindowChange({key: this.focus.props.eventKey,
			x: rect.x, y: rect.y, w: rect.w, h: rect.h})
	}

	renderGrid = () => {
		const canvas = this.canvas.current
		const ctx = canvas.getContext('2d')

		ctx.clearRect(0, 0, canvas.width, canvas.height)

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
		window.addEventListener('resize', this.reset)

		this.setState({initRender: true})
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.reset)
	}

	componentDidUpdate() {
		if (this.props.grid) this.renderGrid()

		if (this.props.scalable &&
			(this.props.scale ||
				!this.state.initRender || !this.container.current))
			return

		const { clientWidth, clientHeight } = this.container.current

		let scale

		if (this.props.width / this.props.height > clientWidth / clientHeight)
			scale = clientWidth * 0.88 / this.props.width
		else scale = clientHeight * 0.88 / this.props.height

		if (scale === this.state.scale) return

		this.setState({scale: scale, initRender: false})
		if (this.props.onScale) this.props.onScale(scale)
	}
	
	magnetize = (value, total, precision) => {
		const magnet = this.props.magnet
		if (!precision) precision = total / (magnet.length >> 1)
		let min = 0, max = magnet.length - 1
		let i = Math.round(value * max / total)
		if (i <= max && i >= min) {
			while (i <= max && i >= min) {
				const m = magnet[i]
				const mv = Compute.computeActualLength(m, total)
				const diff = value - mv
				if (Math.abs(diff) < precision) return m
				else {
					if (diff > 0) ++i
					else --i
				}
			}
		}
		if (value > total || value < 0) return value
		else return value / total
	}

	static getDerivedStateFromProps(props, state) {
		if (props.width != state.width || props.height != state.height)
			return {initRender: true, width: props.width, height: props.height}
		return null
	}

	render() {
		const { classes, width, height } = this.props

		const scale = this.scale()
		const antiScale = 1 / scale
		const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
				classes: classes, onEvent: this.onEvent,
				scale: scale, antiScale: antiScale,
				x: child.props.x, y: child.props.y,
				w: child.props.w, h: child.props.h,
				ax: Compute.computeActualLength(child.props.x, width),
				ay: Compute.computeActualLength(child.props.y, height),
				aw: Compute.computeActualLength(child.props.w, width),
				ah: Compute.computeActualLength(child.props.h, height),
				eventKey: child.key,
			})
    )

		return (
			<div className={classes.windows} ref={this.container}
				onWheel={this.props.scalable ? this.onWheel : undefined}
				onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}
				onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseUp}
				style={this.props.style}>
				<div className={classes.view} onBlur={this.props.onBlur}
					style={{
						position: 'absolute',
						left: `calc((100% - ${this.props.width}px) / 2 + ${this.state.x}px)`,
						top: `calc((100% - ${this.props.height}px) / 2 + ${this.state.y}px)`,
						width: this.props.width, height: this.props.height,
						transform: 'scale('+scale+','+scale+')',
						...this.props.innerStyle,
					}}
				>
					{this.props.grid && <canvas ref={this.canvas} width={this.props.width} height={this.props.height} />}
					{children}
				</div>
				{this.props.cover}
			</div>
		)
	}
}

WindowsComponent.defaultProps = {
	width: 120, height: 120,
	magnet: [
		0, '1/120', '1/60', 0.025, '1/30', '1/24',
		0.05, '7/120', '1/15', 0.075, '1/12', '11/120',
		0.1, '13/120', '7/60', 0.125, '2/15', '17/120',
		0.15, '19/120', '1/6', 0.175, '11/60', '23/120',
		0.2, '5/24', '13/60', 0.225, '7/30', '29/120',
		0.25, '31/120', '4/15', 0.275, '17/60', '7/24',
		0.3, '37/120', '19/60', 0.325, '1/3', '41/120',
		0.35, '43/120', '11/30', 0.375, '23/60', '47/120',
		0.4, '49/120', '5/12', 0.425, '13/30', '53/120',
		0.45, '11/24', '7/15', 0.475, '29/60', '59/120',
		0.5, '61/120', '31/60', 0.525, '8/15', '13/24',
		0.55, '67/120', '17/30', 0.575, '7/12', '71/120',
		0.6, '73/120', '37/60', 0.625, '19/30', '77/120',
		0.65, '79/120', '2/3', 0.675, '41/60', '83/120',
		0.7, '17/24', '43/60', 0.725, '11/15', '89/120',
		0.75, '91/120', '23/30', 0.775, '47/60', '19/24',
		0.8, '97/120', '49/60', 0.825, '5/6', '101/120',
		0.85, '103/120', '13/15', 0.875, '53/60', '107/120',
		0.9, '109/120', '11/12', 0.925, '14/15', '113/120',
		0.95, '23/24', '29/30', 0.975, '59/60', '119/120', 1
	],
}

const Windows = withStyles(styles)(WindowsComponent)

export { Window, Windows }
