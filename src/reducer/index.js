export const indexInitialState = {
    countryModalOpen: false,
    checkedItems: []
  };
  
  export const indexReducer = (state, action) =>{
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state, countryModalOpen: true
        };
      case 'CLOSE_MODAL':
        return {
          ...state, countryModalOpen: false
        };
      case 'CHECK_ITEM':
        return {
          ...state, checkedItems: [...new Set([...state.checkedItems, action.data])]
        }
      case 'UNCHECK_ITEM':
        return {
          ...state, checkedItems: state.checkedItems.filter(item=>item !== action.data)
        }
      case 'CHECK_MULTIPLE_CHECKBOX':
        return {
          ...state, checkedItems: action.data
        }
      case 'RESET_ALL_CHECKBOX':{
        return {
          ...state, checkedItems: []
        }
      }
  
      default:
        return indexInitialState;
    }
  }
  
  
  