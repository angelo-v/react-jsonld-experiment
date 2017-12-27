/* eslint no-restricted-globals: ["off", "location"] */

import {fetchResource} from '../resources'

import Spinner from 'react-spinkit';
import React, {Component} from 'react';
import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom';

class Router extends Component {

    componentDidMount() {
        console.log('app did mount, fetch', location.href);
        this.props.fetchResource(location.href);
        this.props.history.listen(() => {
            console.log('location change, fetch', window.location.href);
            this.props.fetchResource(window.location.href);
        });
    }

    render() {
        const Page = this.props.map[this.props["@type"]];
        const defaultTable = <table>Unknown page type. {Object.keys(this.props).map(p => this.props[p] instanceof Object ? null : <tr>
            <td>{p}</td>
            {this.props[p]}</tr>)}
        </table>;
        return this.props.loading ?
            <Spinner/> : (Page ? <Page uri={this.props["@id"]} {...this.props} /> : defaultTable);
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
)(withRouter(Router));
