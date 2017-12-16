/* eslint no-restricted-globals: ["off", "location"] */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import logo from './logo.svg';
import './App.css';

import { fetchResource } from './resources'



function resource(graph, uri) {
    return graph.find(res => res["@id"] === uri)
}

const NavItem = (props) => <li><a href={props["@id"]}>{props.title["@value"]}</a></li>;

const ArticleList = ({ uri }) => <div>TODO: fetch <a href={uri}>{uri}</a> automatically</div>;

class App extends Component {

    componentDidMount() {
        this.props.fetchResource(location.href);
    }

    render() {
        const graph = this.props["@graph"];
        if (!graph) return <div>Loading...</div>;
        const self = graph[0];
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to {self.title}</h1>

                </header>
                <div className="App-intro">
                    <ul>
                        {self.navigation.map(
                            (nav) => <NavItem key={nav} {...resource(graph, nav)} />
                        )}
                    </ul>
                    <ArticleList uri={self.articleList}/>
                </div>
            </div>
        );
    }
}

export default connect(state => state, { fetchResource })(App);
