import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles }     from '@material-ui/core/styles';
import { ThemeProvider }  from '@material-ui/styles';
import * as colors        from '@material-ui/core/colors';
import { CssBaseline }    from '@material-ui/core';
import Paper              from '@material-ui/core/Paper';
import Grid               from '@material-ui/core/Grid';
import Slider             from '@material-ui/core/Slider';
import IconButton         from '@material-ui/core/IconButton';
import PlayArrowIcon      from '@material-ui/icons/PlayArrow';
import PauseIcon          from '@material-ui/icons/Pause';


import Simulation from './SimulationComponent'
import Settings   from './SettingsComponent'

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            //main: colors.grey[800],
            main: colors.orange[400],
        },
        secondary: {
            main: colors.orange[400],
        },
        showAcceleration: colors.cyan[400],
        showVelocity: colors.lightGreen["A700"],
        showBall: colors.orange["A700"],
        lines: colors.grey[700],
    },
    contrastThreshold: 3,
});

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: colors.indigo[600],
        },
        secondary: {
            main: colors.orange[500],
        },
        showAcceleration: colors.cyan[400],
        showVelocity: colors.lightGreen["A700"],
        showBall: colors.orange["A700"],
        lines: colors.grey[300],
    },
    contrastThreshold: 3,
})

const styles = theme => ({
    app: {
        height: "100%",
        width:  "100%",
        position: "absolute", 
        top:  0,
        left: 0, 
        display: "flex",
        flexFlow: "column",
    },
    container: {
        padding: theme.spacing(2),
        margin:  theme.spacing(2),
        flexGrow: 1,
    },
    paper_container: {
        display: "flex", 
        flexFlow: "column",
    }
});

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            theme: darkTheme,
            results: {
                locations: [ ],
                velocities: [ ],
                accelerations: [ ],
            },
            start: {
                height: 1,
                velocity: 40,
                angle: Math.PI / 4,
            },
            constants: {
                gravity: 9.81,
                airDensity: 1.225,
                dragCoefficient: 0.5,
                ballRadius: 30,
                ballMass: 0.5,
            },
            maxHeight: 0,
            reach: 0,
            iterationLimit: 10000,
            timeChange: 1,
            time: 0,
            shouldCalculate: true,
            showVelocity: true,
            showAcceleration: true,
            showBall: true,
            animateInterval: null,
        }
        for (let index = 0; index < 100; index++) {
            this.state.results.locations.push({ x: 100, y: 100+index })
        }
    }

    calculate = () => {
        var locations     = [], 
            velocities    = [], 
            accelerations = [];
        var reach = 0,
            maxHeight = 0;

        const constants = {
            ...this.state.constants, 
            gravity: parseFloat(this.state.constants.gravity)
        };

        const k = 0.5 * constants.dragCoefficient * constants.airDensity * Math.pow(constants.ballRadius / 100, 2) * Math.PI / constants.ballMass

        const timeChange = this.state.timeChange / 1000

        locations[0] = { x: 0, y: parseFloat(this.state.start.height) }
        velocities[0] = { 
            x: Math.cos(this.state.start.angle) * this.state.start.velocity,
            y: Math.sin(this.state.start.angle) * this.state.start.velocity 
        }

        if (this.state.iterationLimit < 2) return

        for(let i = 0; i < this.state.iterationLimit; i++) {
            accelerations[i] = {
                x: -(k * velocities[i].x * Math.sqrt(Math.pow(velocities[i].x, 2) + Math.pow(velocities[i].y, 2))),
                y: -(k * velocities[i].y * Math.sqrt(Math.pow(velocities[i].x, 2) + Math.pow(velocities[i].y, 2)) + constants.gravity),
            }

            velocities[i + 1] = {
                x: velocities[i].x + accelerations[i].x * timeChange,
                y: velocities[i].y + accelerations[i].y * timeChange,
            }

            locations[i + 1] = {
                x: locations[i].x + velocities[i].x * timeChange + accelerations[i].x * Math.pow(timeChange, 2) * 0.5,
                y: locations[i].y + velocities[i].y * timeChange + accelerations[i].y * Math.pow(timeChange, 2) * 0.5,
            }

            if (locations[i + 1].y < 0) break

            reach     = Math.max(reach,     locations[i].x)
            maxHeight = Math.max(maxHeight, locations[i].y)
        }
        console.log(accelerations)

        this.setState({
            results: {
                locations,
                velocities,
                accelerations,
            },
            reach,
            maxHeight,
            time: Math.min(this.state.time, accelerations.length - 1),
            shouldCalculate: false,
        })
    }

    changeConstant = (evt) => {
        this.animation(0)
        this.setState({
            constants: { 
                ...this.state.constants,
                [evt.target.name]: evt.target.value,
            },
            shouldCalculate: true,
        })
    }

    changeStart = (evt) => {
        this.animation(0)
        let event = { ...evt }
        if (event.target.name === "angleDeg") {
            event = {
                ...evt,
                target: {
                    ...evt.target,
                    value: Math.PI * ((parseFloat(event.target.value) / 180) % 0.5),
                    name: "angle",
                }
            }
        } else if (event.target.name === "angle") {
            event = {
                ...evt,
                target: {
                    ...evt.target,
                    value: Math.PI * (parseFloat(event.target.value) % 0.5),
                    name: "angle",
                }
            }
        }

        this.setState({
            start: { 
                ...this.state.start,
                [event.target.name]: event.target.value,
            },
            shouldCalculate: true,
        })
    }

    changeSetting = (evt) => {
        this.animation(0)
        if (evt.target.name === "timeChange" || evt.target.name === "iterationLimit") {
            this.setState({
                [evt.target.name]: evt.target.value,
                shouldCalculate: true,
            })
        } else if (evt.target.name === "showAcceleration" || 
                   evt.target.name === "showVelocity" ||
                   evt.target.name === "showBall") {
            this.setState({
                [evt.target.name]: evt.target.checked,
            })
        } else {
            this.setState({
                [evt.target.name]: evt.target.value,
            })
        }
    }

    changeTime = (evt, value) => {
        this.setState({
            time: value
        })
    }

    changeTheme = () => {
        if (this.state.theme.palette.type === "dark") {
            this.setState({
                theme: lightTheme
            })
        } else {
            this.setState({
                theme: darkTheme
            })
        }
    }

    animation = (result = -1) => {
        if ((result === -1 && this.state.animateInterval !== null) || result === 0) {
            clearInterval(this.state.animateInterval)
            this.setState({
                animateInterval: null,
            })
        } else {
            let animateInterval = setInterval(() => this.animationTick(Math.max(1, Math.round((this.state.results.accelerations.length - 1) / 300))), 30)
            //let animateInterval = setInterval(() => this.animationTick(10, 30))
            this.setState({
                animateInterval
            })
        }
    }

    animationTick = (tickTime) => {
        if (this.state.time + tickTime > (this.state.results.accelerations.length - 1)) {
            clearInterval(this.state.animateInterval)
            this.setState({
                time: 0,
                animateInterval: null,
            })
        } else {
            this.setState((state, props) => ({
                time: state.time + tickTime,
            }))
        }
    }

    componentWillMount() {
        this.calculate()
    }

    componentDidUpdate() {
        if (this.state.shouldCalculate === true) {
            this.calculate()
        }
    }

    render() {
        const classes = this.props.classes
        return (
            <ThemeProvider theme={this.state.theme}>
                <CssBaseline />
                <div className={classes.app}>
                    <Grid 
                        container
                        style={{
                            flexGrow: 1 
                        }}
                    >
                        <Grid item xs={9} className={classes.paper_container} >
                            <Paper 
                                className={classes.container}
                                style={{
                                    display: "flex",
                                }}
                            >
                                <Simulation 
                                    results={this.state.results}
                                    time={this.state.time}
                                    timeChange={this.state.timeChange}
                                    reach={this.state.reach}
                                    maxHeight={this.state.maxHeight}
                                    ballRadius={this.state.constants.ballRadius}
                                    showAcceleration={this.state.showAcceleration}
                                    showVelocity={this.state.showVelocity}
                                    showBall={this.state.showBall}
                                />
                            </Paper>
                        </Grid>
                        <Grid item className={classes.paper_container} >
                            <Paper 
                                className={classes.container}
                                style={{
                                    padding:       this.props.theme.spacing(1),
                                    paddingTop:    this.props.theme.spacing(3),
                                    paddingBottom: this.props.theme.spacing(3),
                                }}
                            >
                                <Slider
                                    orientation="vertical"
                                    variant="secondary"
                                    defaultValue={30}
                                    value={this.state.time}
                                    min={0}
                                    max={this.state.results.accelerations.length - 1}
                                    onChange={this.changeTime}
                                    style={{ height: "90%" }}
                                />
                                <IconButton 
                                    color="inherit"
                                    aria-label="Menu"
                                    onClick={() => this.animation()}
                                    style={{ display: "flex" }}
                                >
                                    {(this.state.animateInterval) ? (<PauseIcon />) : (<PlayArrowIcon />)}
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs className={classes.paper_container} >
                            <Paper className={classes.container}>
                                <Settings
                                    constants={this.state.constants}
                                    start={this.state.start}
                                    reach={this.state.reach}
                                    maxHeight={this.state.maxHeight}
                                    iterationLimit={this.state.iterationLimit}
                                    timeChange={this.state.timeChange}
                                    showVelocity={this.state.showVelocity}
                                    showAcceleration={this.state.showAcceleration}
                                    showBall={this.state.showBall}
                                    changeConstant={this.changeConstant}
                                    changeStart={this.changeStart}
                                    changeSetting={this.changeSetting}
                                    changeTheme={this.changeTheme}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(styles, { withTheme: 1 })(App);