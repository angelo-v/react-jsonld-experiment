import React from 'react';

import getLinkTarget from './getLinkTarget';

import { Link } from 'react-router-dom';

export default ({ to, children }) => {
    const target = getLinkTarget(to);
    return target.external ? <a href={target.href}>{children}</a> : <Link to={target.href} >{children}</Link>;
}