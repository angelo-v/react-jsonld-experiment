/* eslint no-restricted-globals: ["off", "location"] */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import logo from './logo.svg';
import './App.css';
import { NavItem } from './navigation';

import { fetchResource } from './resources'
import { ArticleList } from './articles'

class App extends Component {

    componentDidMount() {
        this.props.fetchResource(location.href);
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
                        (<div className="App-intro">
                            <ul>
                                {this.props.navigation.map(
                                    (nav) => <NavItem key={nav} uri={nav} />
                                )}
                            </ul>
                            <ArticleList uri={this.props.articleList} />
                        </div>)
                }
            </div>
        );
    }
}

export default connect(state => {
    const self = state["@graph"].find(res => res["@id"] === location.href);
    return self ? {
        ...self
    } : { loading: true }
}, { fetchResource })(App);
