import reduce from '../reduceGraph';

describe('reduce graph', () => {
    it('should map all resources by id', () => {
        const graph = [
            {
                ["@id"]: "http://foo",
                value: 42,
                any: "string"
            },
            {
                ["@id"]: "http://bar",
                value: 43,
                whatever: "data"
            }
        ]
        const result = reduce(graph);
        expect(result).toEqual({
            "http://foo": {
                ["@id"]: "http://foo",
                value: 42,
                any: "string"
            },
            "http://bar": {
                ["@id"]: "http://bar",
                value: 43,
                whatever: "data"
            }
        })
    });

});
