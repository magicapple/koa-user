/**
 * Created by JinWYP on 20/02/2017.
 */



/**
 * describe 测试套件 test suite 表示一组相关的测试
 * it 测试用例 test case 表示一个单独的测试
 * assert 断言 表示对结果的预期
 */

const assert = require('assert');



describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(4));
        })

        it('length', function(){
            assert.equal(3, [1, 2, 3].length);
        })
    })
});


const expect = require('chai').expect;

describe('chai expect demo', function() {
    it('expect equal', function() {
        expect(1+1).to.equal(2);
        expect(1+1).not.equal(3);
    });
});