import React, { Component } from 'react';

export class AnimatedNodeList extends Component {

    render() {
        let {nodes} = this.props;
        return nodes.map((node) => <Animated key={node.id}>
            {this.renderNode(node)}
        </Animated>);
    }

    renderNode(node) {
        // TODO: render AnimatedNodeList and pass params to: multi, contains
        return <input value={node.value} />;
    }
}

export class Animated extends Component {
    render() {
        return <div ref="wrapper" style={{ position: 'relative' }}>
            {this.props.children}
        </div>;
    }
}










/*
export class AnimatedRoot {

    constructor(props) {
        this.state = {
            animation: {
                before: {},
                current: {},
                after: {}
            },

        }
    }

    // Caled by component d
    measurePostion() {

    }
    updateIntermediatePosition(id, after) {

    }
}
__anyform_internal_animation


// Params: props, id, timestamp, root, from{x, y, width, height}
export function Animated(Original) {

    return React.createClass({
        getInitialState: function () {
            return { offset: null }; // null means measure
        },
        componentWillReceiveProps: function (nextProps) {
            


            if (nextProps.timestamp === this.props.timestamp) {
                this.setState({ offset: null });
            } else {
                if (this.state.measure) this.setState({ measure: false });
            }
        },
        getStyles: function () {
            return { position: 'absolute', ...this.state.offset };
        },
        render: function () {
            var original = <Original {...this.props.props} />;
            if (!this.state.offset) return original;

            return <div ref="wrapper" style={{ position: 'relative' }}>
                <div style={this.getStyles()}>{original}</div>
            </div>
        },
        afterRender(prevProps) {
            if ()
        },
        updateGlobal
        componentDidUpdate(prevProps) {
            if (this.state.measure) {
                let wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
                let rect = wrapper.getBoundingRect();
            }
            // get position 
            this.props.animation.
            
        }
    })

    return React.


}*/