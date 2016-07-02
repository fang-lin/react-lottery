import React from 'react';
import random from 'lodash/random';
import classnames from 'classnames';

export default class App extends React.Component {

  min = 1;
  max = 50;
  maxCount = 50;
  count = 0;
  setIntervalHandler = null;

  constructor(props) {
    super(props);

    this.state = {
      num: '00'
    }
  }

  randomSeqGenerator(column, size) {
    let numbers = [];
    for (let i = 0; i < column; i++) {
      let seq = [];
      for (let j = 0; j < size; i++) {
        seq.push(random(this.min, this.max));
      }
      numbers.push(seq);
    }
    return numbers;
  }

  pushRandomNumberIntoSeq() {
    this.setState({
      seq: this.randomSeqGenerator(this.column, this.size)
    });
  }

  startSetInterval(max) {

    this.count = 0;
    clearInterval(this.setIntervalHandler);
    this.setIntervalHandler = null;

    this.setIntervalHandler = setInterval(() => {
      let num = random(this.min, this.max);
      this.setState({
        num: num < 10 ? '0' + num : num
      });
      if (this.count > max) {
        clearInterval(this.setIntervalHandler);
        this.setIntervalHandler = null;
      }
      this.count++;
    }, 50);
  }

  startHandler(event) {
    this.startSetInterval(this.maxCount);
  }

  render() {
    return (
      <div className="trunk">
        <button className="start-btn" onClick={this.startHandler.bind(this)}>DICE</button>
        <div className="num">{
          this.state.num
        }</div>
      </div>
    );
  }
}