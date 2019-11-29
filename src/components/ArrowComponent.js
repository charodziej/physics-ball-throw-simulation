import React from 'react';


class Arrow extends React.PureComponent {
    render() {
        return (
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: 1,
                    transformOrigin: "2px 0px",
                    transform: `translate(${this.props.x - 2}px, ${this.props.y}px) rotate(${-this.props.angle - Math.PI / 2}rad)`
                }}
            >
                <div 
                    style={{
                        height: this.props.value,
                        width: 4,
                        backgroundColor: this.props.color,
                    }}
                />
                <div 
                    style={{
                        position: "relative",
                        height: 0,
                        width: 0,
                        left: -8,
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop: `20px solid ${this.props.color}`,
                    }}
                />
            </div>
        )
    }
}

export default Arrow;