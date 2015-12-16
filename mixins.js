/*Mixins occur when one object aqquires the properties of another without modifying the prototype chain.

The first object( a receiver) actually recievves the properties of the second object( the supplier) directly.

Can be traditionally created using the below function */

function mixin(receiver, supplier) {
  for (var property in supplier) {
    if (supplier.hasOwnProperty(property)) {
      receiver[property] = supplier[property]
    }
  }
  return receiver;
}

function EventTarget() {

}

EventTarget.prototype = {

  constructor: EventTarget,

  addListener: function(type, listener) {

    //create an  array if it doesn't exist
    if(!this.hasOwnProperty("_listeners")) {
      this._listeners = [];
    }

    if (typeof this._listeners[type] == "undefined"){
      this._listeners[type] = []
    }

    this.listeners[type].push(listener);
  },

  fire: function(event) {

    if (!event.target) {
      event.target = this;
    }

    if (!event.type) { //falsy
      throw new Error("Event object missing 'type' property.");
    }

    if (this._listeners && this._listeners[event.type] instanceof Array){
      var listeners = this._listeners[event.type];
      for (var i=0, len=listeners.length; i < len; i++){
        listeners[i].call(this, event);
      }
    }
  },

  removeListener: function(type, listener){
    if (this._listeners && this._listeners[type] instanceof Array){
      var listeners = this._listeners[type];
      for (var i=0, len = listeners.length; i < len; i++){
        if (listeners[i] === listener){
          listeners.splice(i,1);
          break;
        }
      }
    }
  }
};
