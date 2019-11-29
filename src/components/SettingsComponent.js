import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Switch             from '@material-ui/core/Switch';
import TextField          from '@material-ui/core/TextField';
import InputAdornment     from '@material-ui/core/InputAdornment';
import FormControlLabel   from '@material-ui/core/FormControlLabel';
import Checkbox           from '@material-ui/core/Checkbox';

const styles = theme => ({

})

class Settings extends React.PureComponent {

    render() {
        const startAngleDeg = 180 * this.props.start.angle / Math.PI
        const startAngle    =       this.props.start.angle / Math.PI
        return (
            <>
                {[
                    { label: "Przyspieszenie grawitacyjne", name: "gravity",         unit: "m/s^2" },
                    { label: "Gęstość powietrza",           name: "airDensity",      unit: "kg/m^3" },
                    { label: "Współczynnik oporu",          name: "dragCoefficient", unit: "" },
                    { label: "Promień piłki",               name: "ballRadius",      unit: "cm" },
                    { label: "Masa piłki",                  name: "ballMass",        unit: "kg" },
                ].map((values) => (
                    <TextField
                        label={values.label}
                        key={values.name}
                        type="number"
                        margin="normal"
                        name={values.name}
                        value={this.props.constants[values.name]}
                        onChange={this.props.changeConstant}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{values.unit}</InputAdornment>,
                        }}
                        inputProps={{ step: 0.1 }}
                    />
                ))}
                {[
                    { label: "Wysokość",            name: "height",   value: this.props.start.height,   precision: 0.1,  unit: "m" },
                    { label: "Prędkość początkowa", name: "velocity", value: this.props.start.velocity, precision: 0.1,  unit: "m/s" },
                    { label: "Kąt",                 name: "angle",    value: startAngle,                precision: 0.01, unit: <>&pi;</> },
                    { label: "Kąt",                 name: "angleDeg", value: startAngleDeg,             precision: 0.1,  unit: <>&deg;</> },
                ].map((values) => (
                    <TextField
                        label={values.label}
                        key={values.name}
                        type="number"
                        margin="normal"
                        name={values.name}
                        value={values.value}
                        onChange={this.props.changeStart}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{values.unit}</InputAdornment>,
                        }}
                        inputProps={{ step: values.precision }}
                    />
                ))}
                {[
                    { label: "Liczba iteracji", name: "iterationLimit", unit: "" },
                    { label: "Czas 1 iteracji", name: "timeChange",     unit: "ms" },
                ].map((values) => (
                    <TextField
                        label={values.label}
                        key={values.name}
                        type="number"
                        margin="normal"
                        name={values.name}
                        value={this.props[values.name]}
                        onChange={this.props.changeSetting}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{values.unit}</InputAdornment>,
                        }}
                    />
                ))}
                <br />
                {[
                    { label: "Prędkość",       name: "showVelocity" },
                    { label: "Przyspieszenie", name: "showAcceleration" },
                    { label: "Piłka",          name: "showBall" },
                ].map((values) => (
                    <FormControlLabel
                        label={values.label}
                        key={values.name}
                        control={
                            <Checkbox
                                color="primary"
                                name={values.name}
                                checked={this.props[values.name]}
                                onChange={this.props.changeSetting}
                                style={{ color: this.props.theme.palette[values.name] }}
                            />
                        }
                    />
                ))}

                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.theme.palette.type === "dark"}
                            onChange={this.props.changeTheme}
                            color="primary"
                        />
                    }
                    label="Dark mode <3"
                />
            </>
        )
    }
}

export default withStyles(styles, { withTheme: 1 })(Settings);