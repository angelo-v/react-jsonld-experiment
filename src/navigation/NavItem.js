import React  from 'react';
import { connect } from 'react-redux'


const NavItem = ({ uri, title }) => <li><a href={uri}>{title}</a></li>;

export default connect((state, ownProps) => {
    const self = state[ownProps.uri];
    return self ? {
        ...self
    } : { loading: true }
})(NavItem);