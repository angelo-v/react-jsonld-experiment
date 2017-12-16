/* eslint no-restricted-globals: ["off", "location"] */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import { fetchResource } from './resources'
import StartPage  from './startPage';
import { Article }  from './articles';

class App extends Component {

    componentDidMount() {
        console.log('app did mount, fetch', location.href);
        this.props.fetchResource(location.href);
        this.props.history.listen((location, action) => {
            console.log('location change, fetch', window.location.href, location.pathname);
            this.props.fetchResource(location.pathname);
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to {this.props.title}</h1>

                </header>

                {
                    this.props.loading ?
                        "Loading..." :
                        (this.props["@type"] === "type:StartPage" ? <StartPage {...this.props} /> :
                            <Article {...this.props} />)
                }
            </div>
        );
    }
}

export default connect((state) => {
        const self = state[location.href];
        return self ? {
            ...self
        } : { loading: true }
    },
    { fetchResource },
    null,
    { pure: false }
)(withRouter(App));
