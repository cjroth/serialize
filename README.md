# Serialize.js
Recursively serialize objects before sending them over HTTP.

## Quick Start:
Just define a `serialize` instance method for any object that you want to be serializable.
```
var chris = {
  firstName: 'Chris',
  lastName: 'Roth',
  serialize: function() {
    return this.firstName + ' ' + this.lastName;
  }
}
var serialization = serialize(chris);
console.log(serialization);
```

## Use with Express.js
```
app.use(require('./serialize'));
app.get('/chris', function(req, res, next) {
  res.serialize(chris);
});
```

## Philosophy
This is essentially the same thing as `Object.toJSON()` but with under the name "serialize". This allows you to preserve the behavior of `Object.toJSON()` and use `instance.serialize()` to define a function that is specifically intended for preparing an object to be sent in an HTTP response. I've also created `serialize.middleware` to integrate this behavior right into express. The middleware will use `res.send()` if the serialization is a string and `res.json()` if the serialization is an object.
