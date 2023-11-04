# @ig3/mfd-parser

This is a parser for multipart/form-data messages.

It returns an object with one property per field. The value of these
is an object with two properties: headers and value. The value of
the headers property is an array of objects, one per header. The value
of the value property is the value of the field. In the case of a single
valued field, this will be a string. In the case of a field with multiple
value, this will be an array of strings.

## Installation

```
npm install @ig3/mfd-parser
```

## Usage

```
const mfd = require('@ig3/mfd-parser');
const params = mfd.parse(multipartFormData);
```

## Provenance

This is a fork of
[multisolutions/multipart-parser](https://github.com/multisolution/multipart-parser)
by Leo Cavalcante and Dannylo Dangel. This library was selected because it
is simple and has no dependencies, and has proven adequate (with a few
modifications) for parsing Agiloft REST service requests.
