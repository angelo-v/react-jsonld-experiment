import React from "react";

import AuthorMark from "./AuthorMark";

import connectResource from "../lib";

const Article = ({ uri, title, description, author }) => <div>
    <h2><a href={uri}>{title}</a></h2>
    <p>
        {description}
    </p>
    <AuthorMark uri={author} />
</div>;

export default connectResource(Article);