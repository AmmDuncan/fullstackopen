import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const init = (actionType) => {
    store.dispatch({type: actionType})
  }

  const get = (prop) => {
    return store.getState()[prop]
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={() => init("OK")}>ok</button>
      <button onClick={() => init("BAD")}>bad</button>
      <button onClick={() => init("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {get('ok')}</div>
      <div>bad {get('bad')}</div>
    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)