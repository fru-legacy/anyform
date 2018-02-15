import { AnimatedRoot } from 'anyform-react';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Example extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [
                {id: 1, value: '1'},
                {id: 2, value: '2'},
                {id: 3, value: '3', contains: [
                    {id: 4, value: '4'},
                    {id: 5, value: '5'},
                    {id: 6, value: '6'},
                    {id: 7, value: '7'},
                ]}, 
                {id: 8, value: '8'},
            ]
        };
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