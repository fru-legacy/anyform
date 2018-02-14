import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class AnimatedRoot extends Component {

    constructor(props) {
        super(props);
        // TODO add current, stop jumps
        this.state = {time: 0, before: {}, target: {}};
    }

    render() {
        return <AnimatedNodeList nodes={this.props.nodes} root={this} time={this.state.time} />;
    }

    getStyle(id) {
        // TODO calculate from state
        if (!this.state.before[id] || !this.state.target[id]) return {left: 0, top: 0};

        return {
            left: (this.state.before[id].x - this.state.target[id].x) * this.state.time,
            top: (this.state.before[id].y - this.state.target[id].y) * this.state.time,
        }
    }

    updateRect(id, rect) {
        this.state.target[id] = rect;
    }

    componentWillReceiveProps(nextProps) {
        // Move current rects to leagcy and start state countdown
        this.state.before = Object.assign({}, this.state.target);
        this.state.time = 1.0;
        this.continueCountdown();
    }

    continueCountdown() {
        if (this.state.time <= 0.0) return;
        // TODO replace mock animation
        let decremented = this.state.time - 0.05;
        this.setState({time: decremented});
        window.requestAnimationFrame(() => this.continueCountdown());
    }
}

class AnimatedNodeList extends Component {

    render() {
        let {nodes} = this.props;
        return nodes.map((node) => <Animated key={node.id} id={node.id} root={this.props.root} time={this.props.time}>
            {this.renderNode(node)}
        </Animated>);
    }

    renderNode(node) {
        // TODO: render AnimatedNodeList and pass params to: multi, contains
        return <input value={node.value} />;
    }
}

class Animated extends Component {
    render() {
        return <div ref="wrapper" style={this.getStyle()}>{this.props.children}</div>;
    }

    getStyle() {
        return {
            position: 'relative',
            ...this.props.root.getStyle(this.props.id)
        }
    }
    componentDidUpdate(prevProps) {
        let wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
        this.props.root.updateRect(this.props.id, wrapper.getBoundingClientRect());        
    }
}
