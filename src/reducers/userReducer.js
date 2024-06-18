// reducers/userReducer.js
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGN_UP':
      case 'LOGIN_USER':
        return { ...state, user: action.payload };
      case 'LOGOUT_USER':
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  export default userReducer;