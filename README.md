# mfd-parser

This is a parser for multipart/form-data messages.

It returns an object with one property per field. The value of these
is an object with two properties: headers and value. The value of
the headers property is an array of objects, one per header. The value
of the value property is the value of the field. In the case of a single
valued field, this will be a string. In the case of a field with multiple
value, this will be an array of strings.

## Installation

```
npm install mfd-parser
```

