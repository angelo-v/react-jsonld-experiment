import parse from 'parse-path';

const qs = (uri) => uri.search ? `?${uri.search}` : '';
const hash = (uri) => uri.hash ? `#${uri.hash}` : '';

export default (uri) => {
    const current = parse(window.location.href);
    const parsed = parse(uri);
    if (!parsed.resource) return { href: uri, external: false };
    const external = parsed.resource !== current.resource || parsed.protocol !== current.protocol;
    const href = external ? uri : `${parsed.pathname}${qs(parsed)}${hash(parsed)}`;
    return {
        href,
        external
    }
}
