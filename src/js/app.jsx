import React from 'react';

function calculate(loan, interest, term) {
  const monthlyRate = (interest / 100 / 12);
  const monthlyTerm = (term * 12);
  const payment = (loan * (monthlyRate * (1 + monthlyRate)**monthlyTerm) / ((1 + monthlyRate)**monthlyTerm - 1)).toFixed(2);
  return payment;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      rate: 0,
      term: 15,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick() {
      const payment = calculate(this.state.balance, this.state.rate, this.state.term);
      
      if (this.state.balance == 0){
        $("#output").text(`You can't start with 0 balance!`)
      } else if (this.state.rate ==0 ) {
        $("#output").text(`You can't start with 0 rate!`)
      } else if (this.state.balance < 0) {
        $("#output").text(`You can't start with negative balance!`)
      } else if (this.state.rate < 0) {
        $("#output").text(`You can't start with negative rate!`)
      } else {
      $("#output").text(`$${payment} is your payment.`);
      }
  }

  render() {
    return (
      
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <div>
          <div className="left">
            <label className="loanLabel">Loan Balance</label>
          </div>
          <div className="right">
            <input name="balance" type="number" value={this.state.balance} onChange={this.handleChange} />
          </div>
        </div>
        <div>
          <div className="left">
            <label className="interest">Interest Rate (%)</label>
          </div>
          <div className="right">
            <input name="rate" type="number" step=".01" value={this.state.rate} onChange={this.handleChange} />
         </div>
        </div>
        <div>
          <div className="left">
            <label className="term">Loan Term (yrs)</label>
          </div>
          <div className="right">
            <select name="term" onChange={this.handleChange}>
              <option type="number" value="15">15</option>
              <option type="number" value="30">30</option>
            </select>
          </div>
        </div>
          <div className="right">
           <button name="submit" onClick={this.handleClick}>Calculate</button>
          </div>
        <div name="output">
            <p id="output"></p>
        </div>
      </div>
    );
  }
}

