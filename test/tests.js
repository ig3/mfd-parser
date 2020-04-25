'use strict';

const tap = require('tap');
const { parse } = require('../index');
const fs = require('fs');
const path = require('path');

tap.test('parse', (t) => {
  const data = parse(fs.readFileSync(path.resolve(__dirname, 'fixture-lf.txt'), 'utf8'));
  console.log('data ', data);

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
  console.log('data ', data);

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

  t.strictSame(
    data,
    {
      "$lang":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"$lang\""
          }
        ],
        "value":"en"
      },
      "$KB":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"$KB\""
          }
        ],
        "value":"TestKB"
      },
      "$login":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"$login\""
          }
        ],
        "value":"login"
      },
      "$password":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"$password\""
          }
        ],
        "value":"password"
      },
      "$table":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"$table\""
          }
        ],
        "value":"test_table"
      },
      "field_a":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"field_a\""
          }
        ],
        "value":"a"
      },
      "field_b":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"field_b\""
          }
        ],
        "value":["a","b","c"]
      },
      "field_c":{
        "headers":[
          {
            "name":"Content-Disposition",
            "value":"form-data; name=\"field_c\"; filename=\"test.txt\""
          },
          {
            "name":"Content-Type",
            "value":"text/plain"
          }
        ],
        "value":"This is a test file"
      }
    }
  );
  t.end();
});
