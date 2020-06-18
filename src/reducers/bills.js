const INITIAL_STATE = {
  total: 0,
  bills: [],
};

export const actionTypes = {
  ADD_BILL: 'addBill',
  UPDATE_BILL: 'updateBill',
  DELETE_BILL: 'deleteBill',
  CLEAR_ALL_BILL: 'clearBills',
};

const billsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        total: 1000,
        bills: [{...action.payload}, ...state.bills],
      };

    case actionTypes.ADD_BILL:
      const {amount} = action.payload;
      const total = Number(state.total) + Number(amount);
      const bills = [...state.bills, {...action.payload}];
      return {
        total,
        bills,
      };

    case actionTypes.UPDATE_BILL:
      const id = action.payload.id;
      let selectedElement = null;
      for (let i = 0; i < state.bills.length; i++) {
        const element = state.bills[i];
        if (element.id === id) {
          selectedElement = {...element, index: i};
        }
      }
      const updatedBill = {...action.payload};

      return {
        total:
          Number(state.total) - selectedElement.amount + action.payload.amount,
        bills: [
          ...state.bills.slice(0, selectedElement.index),
          updatedBill,
          ...state.bills.slice(selectedElement.index + 1, state.bills.length),
        ],
      };

    case actionTypes.DELETE_BILL:
      let selectedDeleteElement = null;
      for (let i = 0; i < state.bills.length; i++) {
        const element = state.bills[i];
        if (element.id === action.payload.id) {
          selectedElement = {...element, index: i};
        }
      }

      return {
        total: state.total - selectedElement.amount,
        bills: [...state.bills.filter((item) => item.id !== action.payload.id)],
      };

    case actionTypes.CLEAR_ALL_BILL:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default billsReducer;
