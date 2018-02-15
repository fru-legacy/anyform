import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var easing = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity 
    easeInCubic: function (t) { return t*t*t },
    // decelerating to zero velocity 
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity 
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity 
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
};

const LENGTH_ANIMATION_MS = 300;

export class AnimatedRoot extends Component {

    constructor(props) {
        super(props);
        this.state = {time: 0, epoch: 0, startms: 0};
    }

    render = () => <AnimatedNodeList 
            nodes={this.props.nodes} root={this}
            epoch={this.state.epoch} time={this.state.time} />;

    componentWillReceiveProps(nextProps) {
        // Start animation countdown
        this.setState({
            before: Object.assign({}, this.state.target),
            time: LENGTH_ANIMATION_MS,
            startms: Date.now(),
            epoch: this.state.epoch + 1
        });
        this.continueCountdown();
    }

    continueCountdown() {
        window.requestAnimationFrame(() => {
            if (this.state.time > 0.0) {
                
                let diff = Date.now() - this.state.startms;
                let time = Math.max(0, LENGTH_ANIMATION_MS - diff);
                this.setState({ time });
                this.continueCountdown();
            }
        });
    }
}

class AnimatedNodeList extends Component {

    render() {
        let { nodes, ...props } = this.props;
        return nodes.map((node) => this.renderNode(props, node));
    }

    getAnimated(props, node) {
        return <Animated {...props}>
            <input value={node.value} />
        </Animated>;
    }

    getId = (node) => node.id;

    renderNode(props, node) {
        var children, element = this.getAnimated(props, node);
        
        if (node.contains) children = <div style={{marginLeft: '20px'}}>
            <AnimatedNodeList {...this.props} nodes={node.contains}  />
        </div>;
        
        return <div key={this.getId(node)}>{element}{children}</div>
    }
}

class Animated extends Component {
    constructor()  {
        super();
        this.state = { offset: null, from: null };
    }

    render() {
        return <div ref={(n) => this.recieveBoundingRect(n)}>
            <div style={this.getStyle()}>{this.props.children}</div>
        </div>;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.epoch !== this.props.epoch) {
            if (this.state.to && this.state.offset) {

                let x = this.state.to.x + this.state.offset.x;
                let y = this.state.to.y + this.state.offset.y;

                this.setState({ from: {x, y}, offset: null });
            }   
        }
    }

    getStyle() {
        if (this.state.offset) return {
            position: 'relative',
            left: this.state.offset.x,
            top:  this.state.offset.y
        };
    }

    recieveBoundingRect(wrapper) {
        if (!wrapper) return;
        let to = wrapper.getBoundingClientRect();

        if (this.props.time === 0 || !this.state.from) {
            if (this.state.offset || !this.state.from) {
                this.setState({ from: to, to, offset: null });
            }

        } else {
            let factor = easing.easeInOutCubic(this.props.time / LENGTH_ANIMATION_MS);
            let x = (this.state.from.x - to.x) * factor;
            let y = (this.state.from.y - to.y) * factor;

            if (!this.state.offset || this.state.offset.x !== x || this.state.offset.y !== y) {
                this.setState({ offset: { x, y }, to });
            }
        }
    }
}
