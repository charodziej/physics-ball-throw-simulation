
import React from 'react';


class Ball extends React.PureComponent {
    render() {
        return (
            <div
                style={{
                    position: "absolute",
                    left: -this.props.radius,
                    top: -this.props.radius,
                    zIndex: 2,
                    transform: `translate(${this.props.x}px, ${this.props.y}px)`
                }}
            >
                <div 
                    style={{
                        borderRadius: "50%",
                        width: this.props.radius * 2,
                        height: this.props.radius * 2,
                        backgroundColor: this.props.color,
                    }}
                />
            </div>
        )
    }
}

export default Ball;