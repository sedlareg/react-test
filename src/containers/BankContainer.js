import React, { Component } from 'react';
import {render} from 'react-dom';
import BankBalanceStore from 'flux/BankBalanceStore';
import BankActions from 'flux/BankActions';

export class BankContainer extends Component {
  constructor () {
    super(...arguments);
    BankActions.createAccount();
    this.state = {
      balance: BankBalanceStore.getState()
    };
    this.withdraw = ::this._withdraw;
    this.deposit = ::this._deposit;
  }

  componentDidMount () {
    this.storeSubscription = BankBalanceStore.addListener(data => this.handleStoreChange(data));
  }

  componentWillUnmount () {
    this.storeSubscription.remove();
  }

  handleStoreChange () {
    this.setState({balance: BankBalanceStore.getState()});
  }

  _deposit () {
    BankActions.depositIntoAccount(Number(this.refs.amount.value));
    this.refs.amount.value = '';
  }

  _withdraw () {
    BankActions.withdrawFromAccount(Number(this.refs.amount.value));
    this.refs.amount.value = '';
  }

  render () {
    return (
      <div>
        <h1>Your balance is ${(this.state.balance).toFixed(2)}</h1>
        <div className='atm'>
          <input type='text' placeholder='Enter Amount' ref='amount' />
          <br />
          <button onClick={this.withdraw}>Withdraw</button>
          <button onClick={this.deposit}>Deposit</button>
        </div>
      </div>
    );
  }
}

export default BankContainer;
