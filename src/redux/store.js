import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {userReducer} from "./reducers/userReducer";
import {uiReducer} from "./reducers/uiReducer";
import {dataReducer} from "./reducers/dataReducer";

const initialState = {}
const middleware = [thunk]

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
})

export const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(
        ...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)