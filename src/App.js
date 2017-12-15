/* eslint no-restricted-globals: ["off", "location"] */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as jsonld from 'jsonld';

const context = {
    "title": "http://www.w3.org/1999/02/22-rdf-syntax-ns#title",
    "articleList": {
        "@id": "http://schema.example/blog/articleList",
        "@type": "@id"
    },
    "navigation": {
        "@id": "http://schema.example/blog/navigation",
        "@type": "@id"
    }
};

function resource(graph, uri) {
    return graph.find(res => res["@id"] === uri)
}

const NavItem = (props) => <li><a href={props["@id"]}>{props.title["@value"]}</a></li>;

const ArticleList = ({ uri }) => <div>TODO: fetch <a href={uri}>{uri}</a> automatically</div>;

class App extends Component {

    componentDidMount() {
        console.log('fetch', location);
        var request = new Request(location.href, {
            headers: new Headers({
                'Accept': 'application/json'
            })
        });
        fetch(request)
            .then(response => response.json())
            .then(json => jsonld.compact(json, context, (err, compacted) => this.setState(compacted)))
    }

    render() {
        if (!this.state) return null;
        const graph = this.state["@graph"];
        const self = this.state["@graph"][0];
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

export default App;
