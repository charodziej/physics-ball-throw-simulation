import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper      from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Arrow from './ArrowComponent';
import Ball  from './BallComponent';

const styles = theme => ({
    container: {
        padding: theme.spacing(2),
        margin:  theme.spacing(0),
        float: "right",
        display: "inline-block",
        flexShrink: 1,
        position: "relative",
        zIndex: 10,
    },
})

class Simulation extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            canvasHeight: 100,
            canvasWidth:  100,
            canvasTop:    0,
            canvasLeft:   0,
        }
        this.canvas_container = React.createRef();
        this.canvas = React.createRef();
    }
    
    componentDidMount() {
        this.updateDimensions()
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate(prevprops) {
        if (this.props.time === prevprops.time || this.props.time === this.props.results.accelerations.length - 1)
            this.updateCanvas()
    }

    updateCanvas = () => {
        this.canvas.current.width = this.state.canvasWidth
        const ctx = this.canvas.current.getContext("2d")
        var hex = this.props.theme.palette.primary.main
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16),
            a = 255;

        if (this.scale() > 20) {
            ctx.strokeStyle = this.props.theme.palette.lines;
            var i;
            for (i = 0; i < this.state.canvasHeight; i += this.scale()) {
                ctx.moveTo(0, this.state.canvasHeight - i);
                ctx.lineTo(this.state.canvasWidth, this.state.canvasHeight - i);
                ctx.stroke();
            }

            for (i = 0; i < this.state.canvasWidth; i += this.scale()) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, this.state.canvasHeight);
                ctx.stroke();
            }
        }

        var canvasData = ctx.getImageData(0, 0, this.state.canvasWidth, this.state.canvasHeight);
        this.props.results.locations.forEach(loc => {
            var x = Math.round(loc.x * this.scale())
            var y = this.state.canvasHeight - Math.round(loc.y * this.scale()) - 1
            if (x < 0 || x > this.state.canvasWidth - 1 || y < 0 || y > this.state.canvasHeight - 1) return
            var index = (x + y * this.state.canvasWidth) * 4;

            canvasData.data[index + 0] = r;
            canvasData.data[index + 1] = g;
            canvasData.data[index + 2] = b;
            canvasData.data[index + 3] = a;
        });
        ctx.putImageData(canvasData, 0, 0);
    }

    updateDimensions = () => {
        const canvas = this.canvas_container.current
        const canvasRect = canvas.getBoundingClientRect()
        const documentRect = document.body.getBoundingClientRect()

        this.setState({
            canvasHeight: canvas.clientHeight - 6,
            canvasWidth:  canvas.clientWidth - 6,
            canvasLeft:  canvasRect.left - documentRect.left,
            canvasTop:   canvasRect.top  - documentRect.top,
        })
    }

    scale = () => {
        return Math.min((this.state.canvasWidth - 1) / this.props.reach, (this.state.canvasHeight - 1) / this.props.maxHeight, 300)
    }

    render() {
        const time = this.props.time
        const loc = this.props.results.locations[time]
        const velXY = this.props.results.velocities[time]
        const accXY = this.props.results.accelerations[time]
        
        const arrowLoc = {
            x: this.state.canvasLeft + (Math.round(loc.x * this.scale())),
            y: this.state.canvasTop  + (this.state.canvasHeight - Math.round(loc.y * this.scale()) - 1) 
        }

        const velocity = {
            value: Math.hypot(velXY.x, velXY.y),
            angle: Math.atan2(velXY.y, velXY.x)
        }

        const acceleration = {
            value: Math.hypot(accXY.x, accXY.y),
            angle: Math.atan2(accXY.y, accXY.x)
        }

        const ballRadius = this.props.ballRadius

        const classes = this.props.classes

        return (
            <>
                <div
                    style={{
                        width:  "100%",
                        height: "100%",
                    }}
                    ref={this.canvas_container}
                >
                    <canvas 
                        style={{ position: "absolute", zIndex: 0 }}
                        width ={this.state.canvasWidth}
                        height={this.state.canvasHeight}
                        ref={this.canvas}
                    />
                    <Paper 
                        className={classes.container}
                        elevation={5}
                    >
                        {[
                            { variable: <>t</>,                      unit: "ms",       value: this.props.time * this.props.timeChange, },
                            { variable: <>h<sub>max</sub></>,        unit: "m",        value: this.props.maxHeight, },
                            { variable: <>x<sub>max</sub></>,        unit: "m",        value: this.props.reach },
                            { variable: <>x<sub>t</sub></>,          unit: "m",        value: loc.x },
                            { variable: <>h<sub>t</sub></>,          unit: "m",        value: loc.y },
                            { variable: <>|v&#8407;<sub>t</sub>|</>, unit: "m/s",      value: velocity.value },
                            { variable: <>&alpha;<sub>v</sub></>,    unit: <>&deg;</>, value: 180 * velocity.angle / Math.PI },
                            { variable: <>v<sub>x</sub></>,          unit: "m/s",      value: velXY.x },
                            { variable: <>v<sub>y</sub></>,          unit: "m/s",      value: velXY.y },
                            { variable: <>|a&#8407;<sub>t</sub>|</>, unit: "m/s^2",    value: acceleration.value },
                            { variable: <>&alpha;<sub>a</sub></>,    unit: <>&deg;</>, value: 180 * acceleration.angle / Math.PI },
                            { variable: <>a<sub>x</sub></>,          unit: "m/s^2",    value: accXY.x },
                            { variable: <>a<sub>y</sub></>,          unit: "m/s^2",    value: accXY.y },
                        ].map((values, index) => (
                            <Typography key={index}>
                                {values.variable} = {values.value.toFixed(2)} {values.unit}
                            </Typography>
                        ))}
                    </Paper>
                </div>

                {(this.props.showVelocity) ? (
                    <Arrow
                        x={arrowLoc.x}
                        y={arrowLoc.y}
                        value={velocity.value * this.scale() / 10}
                        angle={velocity.angle}
                        color={this.props.theme.palette.showVelocity}
                    />
                ) : (null)}
                {(this.props.showAcceleration) ? (
                    <Arrow
                        x={arrowLoc.x}
                        y={arrowLoc.y}
                        value={acceleration.value * this.scale() / 10}
                        angle={acceleration.angle}
                        color={this.props.theme.palette.showAcceleration}
                    />
                ) : (null)}
                {(this.props.showBall) ? (
                    <Ball
                        x={arrowLoc.x}
                        y={arrowLoc.y}
                        radius={ballRadius * this.scale() / 100}
                        color={this.props.theme.palette.showBall}
                    />
                ) : (null)}
            </>
        )
    }
}

export default withStyles(styles, { withTheme: 1 })(Simulation);