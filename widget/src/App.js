import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import RequestQuoteForm from './app/containers/RequestQuoteForm';
import showResults from './app/commons/utils/showResults';
import logo from './logo.jpg';
import $ from 'jquery';
import './App.scss';

class App extends Component {// eslint-disable-line
	state = {
		loading: true
	};

  componentDidMount() {
	  
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <div className="wrapper">
              <header className="App-header">
                <img src={logo} className="App-logo" />
                <h3>{}</h3>
              </header>
              <RequestQuoteForm onSubmit={showResults} />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
