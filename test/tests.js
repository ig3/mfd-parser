'use strict';

const tap = require('tap');
const { parse } = require('../index');
const fs = require('fs');
const path = require('path');

tap.test('parse', (t) => {
  const data = parse(fs.readFileSync(path.resolve(__dirname, 'fixture-lf.txt'), 'utf8'));

  t.test('should parse each part headers', (t) => {
    t.strictSame(data.name.headers, [
      { name: 'Content-Disposition', value: 'form-data; name="name"' }
    ]);

    t.strictSame(data.key.headers, [
      { name: 'Content-Disposition', value: 'form-data; name="key"' }
    ]);

    t.end();
  });

  t.test('should parse a raw multipart/form-data text', (t) => {
    t.equal(data.name.value, 'attachment.txt');
    t.equal(data.key.value, 'data/3830719/attachment.txt');
    t.end();
  });

  t.end();
});

tap.test('parse crlf', (t) => {
  const data = parse(fs.readFileSync(path.resolve(__dirname, 'fixture-crlf.txt'), 'utf8'));

  t.test('should parse each part headers', (t) => {
    t.strictSame(data.name.headers, [
      { name: 'Content-Disposition', value: 'form-data; name="name"' }
    ]);

    t.strictSame(data.key.headers, [
      { name: 'Content-Disposition', value: 'form-data; name="key"' }
    ]);

    t.end();
  });

  t.test('should parse a raw multipart/form-data text', (t) => {
    t.equal(data.name.value, 'attachment.txt');
    t.equal(data.key.value, 'data/3830719/attachment.txt');
    t.end();
  });

  t.end();
});

tap.test('parse agiloft request', (t) => {
  const data = parse(fs.readFileSync(path.resolve(__dirname, 'agiloft.txt'), 'utf8'));

  console.log('data ', data);
  t.strictSame(data.field_a.value, [ 'a', 'b', 'c' ]);
  t.end();
});
