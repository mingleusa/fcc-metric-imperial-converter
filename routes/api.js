'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  function handleConvert(input, res) {
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.json({
        initNum: 'invalid number',
        initUnit: 'invalid number and unit'
      });
    }

    if (initNum === 'invalid number') {
      return res.json({ initNum: 'invalid number' });
    }

    if (initUnit === 'invalid unit') {
      return res.json({ initUnit: 'invalid unit' });
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    returnNum = Math.round(returnNum * 100000) / 100000;

    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  }

  app.get('/api/convert', function (req, res) {
    const input = req.query.input;
    if (!input) {
      return res.status(404).type('text').send('Not Found');
    }
    handleConvert(input, res);
  });

  app.get(/^\/api\/convert\/(.+)$/, function (req, res) {
    handleConvert(req.params[0], res);
  });

};
