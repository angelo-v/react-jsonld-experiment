import React  from 'react';
import { connect } from 'react-redux'


const ArticlePreview = ({ uri, title, description }) => <div>
    <h2><a href={uri}>{title}</a></h2>
    <p>
        {description}
    </p>
</div>;

export default connect((state, ownProps) => {
    const self = state["@graph"].find(res => res["@id"] === ownProps.uri);
    return self ? {
        ...self
    } : { loading: true }
})(ArticlePreview);