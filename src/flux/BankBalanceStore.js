import {EventEmitter} from 'fbemitter';
import TransactionDispatcher from './TransactionDispatcher';
import TransactionConstants from './TransactionConstants';

const CHANGE_EVENT = 'change';
let __emitter = new EventEmitter();
let balance = 0;

let BankBalanceStore = {
  getState () {
    return balance;
  },

  addListener: (callback) => {
    return __emitter.addListener(CHANGE_EVENT, callback);
  }
};

BankBalanceStore.dispatchToken = TransactionDispatcher.register((action) => {
  switch (action.type) {
    case TransactionConstants.CREATED_ACCOUNT:
      balance = 0;
      break;
    case TransactionConstants.DEPOSITED_INTO_ACCOUNT:
      balance = balance + action.amount;
      break;
    case TransactionConstants.WITHDREW_FROM_ACCOUNT:
      balance = balance - action.amount;
      break;
  }
  __emitter.emit(CHANGE_EVENT);
});

export default BankBalanceStore;
