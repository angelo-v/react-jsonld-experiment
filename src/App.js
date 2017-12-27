import React, {Component} from 'react';


import logo from './logo.svg';
import './App.css';
import Page from './Page';

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.props.title}</h1>

                </header>
                <div className="App-intro">
                    <Page />
                </div>
            </div>
        );
    }
}

