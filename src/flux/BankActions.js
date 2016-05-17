import TransactionDispatcher from './TransactionDispatcher';
import TransactionConstants from './TransactionConstants';

let BankActions = {
  /**
   * Create an account with an empty value
   */
  createAccount () {
    TransactionDispatcher.dispatch({
      type: TransactionConstants.CREATED_ACCOUNT,
      amount: 0
    });
  },
  /**
   * @param {number} amount to whithdraw
   */
  depositIntoAccount (amount) {
    TransactionDispatcher.dispatch({
      type: TransactionConstants.DEPOSITED_INTO_ACCOUNT,
      amount: amount
    });
  },
  /**
   * @param {number} amount to whithdraw
   */
  withdrawFromAccount (amount) {
    TransactionDispatcher.dispatch({
      type: TransactionConstants.WITHDREW_FROM_ACCOUNT,
      amount: amount
    });
  }
};
export default BankActions;
