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


export class AnimatedRoot extends Component {

    constructor(props) {
        super(props);
        // TODO add current, stop jumps
        this.state = {time: 0, startms: 0, lengthms: 300, before: {}, target: {}};
        this.continueCountdown();
    }

    render() {
        return <AnimatedNodeList nodes={this.props.nodes} root={this} time={this.state.time} />;
    }

    getStyle(id) {
        // TODO calculate from state
        if (!this.state.before[id] || !this.state.target[id]) return {left: 0, top: 0};

        let factor = easing.easeInOutCubic(this.state.time / this.state.lengthms);
        return {
            left: (this.state.before[id].x - this.state.target[id].x) * factor,
            top: (this.state.before[id].y - this.state.target[id].y) * factor,
        }
    }

    updateRect(id, rect) {
        this.state.target[id] = rect;
    }

    componentWillReceiveProps(nextProps) {
        // Move current rects to leagcy and start state countdown
        this.setState({
            before: Object.assign({}, this.state.target),
            time: 1.0,
            startms: Date.now()
        });
    }

    continueCountdown() {
        window.requestAnimationFrame(() => {
            if (this.state.time > 0.0) {
                
                let dif = Date.now() - this.state.startms;
                this.setState({time: Math.max(0, this.state.lengthms - dif)});
            }

            this.continueCountdown()
        });
    }
}

class AnimatedNodeList extends Component {

    render() {
        let { nodes, ...props } = this.props;
        return nodes.map((node) => this.renderNode(props, node));
    }

    getAnimated(props, node) {
        let id = this.getId(node);
        return <Animated key={id} id={id} {...props}><input value={node.value} /></Animated>;
    }

    getId = (node) => node.id;

    renderNode(props, node) {
        var input = this.getAnimated(props, node);
        
        if (!node.contains) return input;
        let children = <div style={{marginLeft: '20px'}}>
            <AnimatedNodeList {...this.props} nodes={node.contains}  />
        </div>;
        return [input, children];
    }
}

class Animated extends Component {
    render() {
        return <div ref="wrapper">
            <div style={this.getStyle()}>{this.props.children}</div>
        </div>;
    }

    getStyle() {
        return {
            position: 'relative',
            ...this.props.root.getStyle(this.props.id)
        }
    }

    notifyRootOfPosition() {
        let wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
        this.props.root.updateRect(this.props.id, wrapper.getBoundingClientRect());
    }

    componentDidUpdate = () => this.notifyRootOfPosition()
    componentDidMount = () => this.notifyRootOfPosition()
}
