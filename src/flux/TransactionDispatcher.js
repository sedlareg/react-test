import {Dispatcher} from 'flux';

class TransactionDispatcher extends Dispatcher {
  dispatch (action = {}) {
    console.log('Dispatched', action);
    super.dispatch(action);
  }
}
export default new TransactionDispatcher();
