function ConvertHandler() {

  this.getNum = function(input) {
    const splitIndex = input.search(/[a-z]/i);
    let num = input.substring(0, splitIndex);

    if (num === '') return 1;

    if (num.split('/').length > 2) return 'invalid number';

    if (num.includes('/')) {
      const parts = num.split('/');
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return 'invalid number';
      }
      return numerator / denominator;
    }

    const result = parseFloat(num);
    if (isNaN(result)) return 'invalid number';
    return result;
  };

  this.getUnit = function(input) {
    const splitIndex = input.search(/[a-z]/i);
    let unit = input.substring(splitIndex).toLowerCase();

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) return 'invalid unit';

    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unit = initUnit === 'L' ? 'L' : initUnit.toLowerCase();
    switch (unit) {
      case 'gal': return 'L';
      case 'L': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
    }
  };

  this.spellOutUnit = function(unit) {
    const unitMap = {
      'gal': 'gallon',
      'L': 'liter',
      'mi': 'mile',
      'km': 'kilometer',
      'lbs': 'pound',
      'kg': 'kilogram'
    };
    return unitMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const unit = initUnit === 'L' ? 'L' : initUnit.toLowerCase();

    switch (unit) {
      case 'gal': return initNum * galToL;
      case 'L': return initNum / galToL;
      case 'lbs': return initNum * lbsToKg;
      case 'kg': return initNum / lbsToKg;
      case 'mi': return initNum * miToKm;
      case 'km': return initNum / miToKm;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);

    if (initNum !== 1) initUnitString += 's';
    if (returnNum !== 1) returnUnitString += 's';

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };

}

module.exports = ConvertHandler;
