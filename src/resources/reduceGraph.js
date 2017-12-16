export default (graph) => graph.map(resource => ({
    [resource["@id"]]: {
        ...resource
    }
})).reduce((result, item, index) => {
    const id = Object.keys(item)[0];
    result[id] = item[id];
    return result;
}, {});