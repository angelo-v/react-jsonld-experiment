/* eslint no-restricted-globals: ["off", "location"] */

import React, {Component} from 'react';
import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import {fetchResource} from './resources'
import StartPage from './startPage';
import {Article} from './articles';

import Spinner from 'react-spinkit';

import { GenericTable } from './lib'

const routing = (props) => {
    switch (props["@type"]) {
        case "type:StartPage":
            return <StartPage uri={props["@id"]} {...props} />;
        case "type:Article":
            return <Article uri={props["@id"]} {...props} />;
        default:
            return <table>Unknown page type. {Object.keys(props).map(p => props[p] instanceof Object ? null : <tr><td>{p}</td>{ props[p]}</tr>)}</table>
    }
};

class App extends Component {

    componentDidMount() {
        console.log('app did mount, fetch', location.href);
        this.props.fetchResource(location.href);
        this.props.history.listen(() => {
            console.log('location change, fetch', window.location.href);
            this.props.fetchResource(window.location.href);
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.props.title}</h1>

                </header>
                <div className="App-intro">
                    {
                        this.props.loading ?
                            <Spinner/> : routing(this.props)

                    }
                </div>
            </div>
        );
    }
}


export default connect((state) => {
        const self = state[location.href];
        return self ? {
            ...self
        } : {loading: true}
    },
    {fetchResource},
    null,
    {pure: false}
)(withRouter(App));
