import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const exampleInitialState = {
  displayAlert: {
    show: false,
    message: "",
    severity: "warning",
    autoHideDuration: 3000
  },
  isLoggedIn: false,
  user: {
    id: null,
    token: "",
    name: ""
  }
}

export const actionTypes = {
  CATCH_POKEMON: 'CATCH_POKEMON',
  SHOW_ALERT: 'SHOW_ALERT',
  CLOSE_ALERT: 'CLOSE_ALERT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.data,
        isLoggedIn: true,
      }
    case actionTypes.LOGIN_SUCCESS:
      const newUser = {
        id: action.data.id,
        token: action.data.token,
        name: action.data.name,
      };
      return {
        ...state,
        user: newUser,
        isLoggedIn: true,
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: exampleInitialState.user,
        isLoggedIn: exampleInitialState.isLoggedIn,
      }
    case actionTypes.CATCH_POKEMON:
      return {
        ...state,
        currentCart: state.currentCart + 1,
        cartId: action.data.cart_id
      }
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        displayAlert: {
          show: true,
          message: action.data.message,
          autoHideDuration: action.data.autoHideDuration || exampleInitialState.displayAlert.autoHideDuration,
          severity: action.data.severity || exampleInitialState.displayAlert.severity,
        }
      }
    case actionTypes.CLOSE_ALERT:
      return {
        ...state,
        displayAlert: {
          show: false,
          message: exampleInitialState.displayAlert.message,
          autoHideDuration: exampleInitialState.displayAlert.autoHideDuration,
          severity: exampleInitialState.displayAlert.severity,
        }
      }
    default:
      return state
  }
}

// ACTIONS
export const register = (data) => {
  return { type: actionTypes.REGISTER_SUCCESS, data }
}

export const login = (data) => {
  return { type: actionTypes.LOGIN_SUCCESS, data }
}

export const logout = () => {
  return { type: actionTypes.LOGOUT_SUCCESS }
}

export const catchPokemon = (data) => {
  return { type: actionTypes.CATCH_POKEMON, data }
}

export const showAlert = (data) => {
  return { type: actionTypes.SHOW_ALERT, data }
}

export const closeAlert = () => {
  return { type: actionTypes.CLOSE_ALERT }
}

const persistConfig = {
  key: 'primary',
  storage,
  blacklist: ['displayAlert']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}
