import React, { useMemo, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { India } from './components/India';
import { CompareCountries } from './containers/CompareCountries';
import { Country } from './containers/Country';
import { Home } from './containers/Home';
import { indexInitialState, indexReducer } from './reducer';



export const AppContext = React.createContext();
export const ModalContext = React.createContext();
export const ModalContentContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(indexReducer, indexInitialState);

  const modalContextVal = useMemo(() => ({ countryModalOpen: state.countryModalOpen, dispatch }), [state.countryModalOpen]);
  const contentContextVal = useMemo(() => ({ checkedItems: state.checkedItems, dispatch }), [state.checkedItems]);

  return (
    <div className="App">
      <ModalContentContext.Provider value={contentContextVal}>

        <ModalContext.Provider value={modalContextVal}>
          <Router>
            <Header />

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/corona-india-statewise" exact component={India} />
              {/* <Route path="/country" exact component={Country} /> */}
              <Route path="/country/:countryName" component={Country} />
              <Route path="/compare-countries/:countries" component={CompareCountries} />

            </Switch>
          </Router>
        </ModalContext.Provider>
      </ModalContentContext.Provider>
    </div>
  );
}

export default App;
