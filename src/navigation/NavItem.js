import React  from 'react';
import { connect } from 'react-redux'


const NavItem = ({ uri, title }) => <li><a href={uri}>{title["@value"]}</a></li>;

export default connect((state, ownProps) => {
    if (!state["@graph"]) return { loading: true };
    return {
        ...state["@graph"].find(res => res["@id"] === ownProps.uri)
    }
})(NavItem);