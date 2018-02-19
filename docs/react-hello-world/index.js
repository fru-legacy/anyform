import { AnimatedRoot } from 'anyform-react';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var data = [
    { type: 'header', contains: [
        { type: 'h3', text: 'Project name' },
        { type: 'nav', contains: [{
            multi: [
                {type: 'nav-item', text: 'Home', active: true},
                {type: 'nav-item', text: 'About'},
                {type: 'nav-item', text: 'Contact'}
            ]
        }] },
    ]},
    { type: 'jumbotron', header: 'Jumbotron heading', contains: [
        { type: 'p', text: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.' },
        { type: 'button', text: 'Sign up today' }
    ]},
    { type: 'row', contains: [
        { type: 'section', header: 'Subheading', content: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.' },
        { type: 'section', header: 'Subheading', content: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.' },
        { type: 'section', header: 'Subheading', content: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.' },
        { type: 'section', header: 'Subheading', content: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.' },
        { type: 'section', header: 'Subheading', content: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.' },
        { type: 'section', header: 'Subheading', content: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.' }
    ]},
    { type: 'footer', text: '&copy; Company 2017' }
];

class Example extends Component {

    constructor(props) {
        super(props);
        this.state = { data };
    }

    render () {
        return <div>
            <AnimatedRoot nodes={this.state.data} />
            <button onClick={() => {this.setState({data: this.shuffle()})}}>Shuffle</button>
        </div>;
    }

    shuffle() {
        var array = this.state.data.slice();
                
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
}


ReactDOM.render(<Example />, document.getElementById('root'));