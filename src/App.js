import React, {Component} from 'react';

import StartPage from './startPage';
import {Article} from './articles';

import logo from './logo.svg';
import './App.css';
import Router from './router';

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.props.title}</h1>

                </header>
                <div className="App-intro">
                    <Router map={{
                        "type:StartPage": StartPage,
                        "type:Article": Article
                    }} />
                </div>
            </div>
        );
    }
}

