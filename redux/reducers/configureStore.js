import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./rootReducer";

const configureStore = (preloadState) => {
  // console.log(preloadState)
  // const logger = createLogger();

  // const enhancer = compose(composeWithDevTools(applyMiddleware(logger)));

  // const store = createStore(rootReducer, enhancer);
  // const store = createStore(rootReducer,preloadState);
  const store = createStore(rootReducer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: false });

export default wrapper;