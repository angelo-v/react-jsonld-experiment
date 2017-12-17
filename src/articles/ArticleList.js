import React  from 'react';

import ArticlePreview from './ArticlePreview';

import connectResource from "../lib";

const ArticleList = ({ title, content }) => <div>
    <h1>{title}</h1>
    <div>
        {content.map(uri => <ArticlePreview key={uri} uri={uri} />)}
    </div>
</div>;

export default connectResource(ArticleList, { fetch: true });