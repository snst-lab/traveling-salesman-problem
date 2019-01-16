const assert = require('power-assert');
const src = require('../src/solver.js');

const cost1=[
    [0,5,2],
    [5,0,4],
    [2,4,0]
];

const cost2=[
    [0,8,7,3],
    [8,0,9,1],
    [7,9,0,4],
    [3,1,4,0]
];
    
describe('Test program is running...', () => {
    it('TSP x cost1', () => {
        assert.equal(src.TSP(cost1), 6);
    });
    it('TSP x cost2', () => {
        assert.equal(src.TSP(cost2), 11);
    });
    it('TSPfromStartNode x cost1', () => {
        assert.equal(src.TSPfromStartNode(cost1,0), 6);
    });
    it('TSPfromStartNode x cost2', () => {
        assert.equal(src.TSPfromStartNode(cost2,0), 12);
    });
});