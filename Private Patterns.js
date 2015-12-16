//Immediately Invoked Function Expressions

//Module Pattern
var person = (function() {

  var age = 34;

  return {
    name: "Matt",

    getAge: function() {
      return age;
    },

    growOlder: function() {
      age++;
    }
  };

}());


/*Revealing Module Pattern
 - some prefer this pattern as it keeps the variable and function declarations together.
 - age, getAge() and growOlder() are all defined local to the IIFE
*/
var dog = (function() {

  var age = 11;

  function getAge() {
    return age;
  }

  function growOlder() {
    age++;
  }

  return {
    name: "Leila",
    getAge: getAge,
    growOlder: growOlder
  };

}());


/*Constructor pattern
Placing methods on the object instance is less efficient than placing on the prototype, however this is the only approach when you want private, instance specific data.
*/


function Person(name) {
//defines a variable only available in the Person constructor
  var age = 25;

  this.name = name;

  this.getAge = function() {
    return age;
  };

  this.growOlder = function() {
    age++;
  };
};


/*Hybrid
 - Can be used if you want the private data to be shared across all instances(as if it was on the prototype) - it looks like a module patern but uses a constructor
*/
var Person = (function() {

  //everybody shares the same age
  var age = 25;

  function InnerPerson(name) {
    this.name = name;
  }

  InnerPerson.prototype.getAge = function() {
    return age;
  };

  InnerPerson.prototype.getOlder = function() {
    age++;
  };
  return InnerPerson;
}());
