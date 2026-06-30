const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('convertHandler should correctly read a whole number input.', function(done) {
    let input = '10L';
    assert.equal(convertHandler.getNum(input), 10);
    done();
  });

  test('convertHandler should correctly read a decimal number input.', function(done) {
    let input = '10.5L';
    assert.equal(convertHandler.getNum(input), 10.5);
    done();
  });

  test('convertHandler should correctly read a fractional input.', function(done) {
    let input = '1/2L';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  test('convertHandler should correctly read a fractional input with a decimal.', function(done) {
    let input = '2.5/6L';
    assert.approximately(convertHandler.getNum(input), 2.5 / 6, 0.0001);
    done();
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function(done) {
    let input = '3/2/3L';
    assert.equal(convertHandler.getNum(input), 'invalid number');
    done();
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function(done) {
    let input = 'kg';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  test('convertHandler should correctly read each valid input unit.', function(done) {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(function(unit) {
      assert.equal(convertHandler.getUnit('10' + unit), unit === 'L' ? 'L' : unit.toLowerCase());
      assert.equal(convertHandler.getUnit('10' + unit.toLowerCase()), unit === 'L' ? 'L' : unit.toLowerCase());
      assert.equal(convertHandler.getUnit('10' + unit.toUpperCase()), unit === 'L' ? 'L' : unit.toLowerCase());
    });
    done();
  });

  test('convertHandler should correctly return an error for an invalid input unit.', function(done) {
    let input = '32g';
    assert.equal(convertHandler.getUnit(input), 'invalid unit');
    done();
  });

  test('convertHandler should return the correct return unit for each valid input unit.', function(done) {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    done();
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function(done) {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallon');
    assert.equal(convertHandler.spellOutUnit('L'), 'liter');
    assert.equal(convertHandler.spellOutUnit('mi'), 'mile');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometer');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pound');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilogram');
    done();
  });

  test('convertHandler should correctly convert gal to L.', function(done) {
    let result = convertHandler.convert(1, 'gal');
    assert.approximately(result, 3.78541, 0.00001);
    done();
  });

  test('convertHandler should correctly convert L to gal.', function(done) {
    let result = convertHandler.convert(1, 'L');
    assert.approximately(result, 1 / 3.78541, 0.00001);
    done();
  });

  test('convertHandler should correctly convert mi to km.', function(done) {
    let result = convertHandler.convert(1, 'mi');
    assert.approximately(result, 1.60934, 0.00001);
    done();
  });

  test('convertHandler should correctly convert km to mi.', function(done) {
    let result = convertHandler.convert(1, 'km');
    assert.approximately(result, 1 / 1.60934, 0.00001);
    done();
  });

  test('convertHandler should correctly convert lbs to kg.', function(done) {
    let result = convertHandler.convert(1, 'lbs');
    assert.approximately(result, 0.453592, 0.00001);
    done();
  });

  test('convertHandler should correctly convert kg to lbs.', function(done) {
    let result = convertHandler.convert(1, 'kg');
    assert.approximately(result, 1 / 0.453592, 0.00001);
    done();
  });

});
