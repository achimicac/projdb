/*ไม่ได้ใส่อะไรด้านหน้า = Public*/
/*_ = Protected*/
/* # = Private*/

var Interface = (function() {
      function _ensureConstructorRequire(name, methods) {
            if (typeof name !== 'string') {
                throw new Error("Constructor of Interface class require first argument is \"string\", but is \"" + (typeof name) + "\".");
            }
     
            if (Object.prototype.toString.call(methods) !== '[object Array]') {
                throw new Error("Constructor of Interface class require second argument is \"array of string\", but is \"" + (typeof methods) + "\".");
            }
      }
      function _ensureMethodType(method, index) {
            if (typeof method !== 'string') {
                throw new Error("Constructor of Interface class require second argument is \"array of string\", but method index " + index + " is not \"string\", is \"" + (typeof method) + "\".");
            }
     
            return method;
      }
      return function(name, methods) {
            if (arguments.length !== 2) {
                throw new Error("Constructor of Interface class require 2 arguments => Interface(name(String), [methodName1(String), methodName2(String), ...]).");
            }
            _ensureConstructorRequire(name, methods);
     
            var _name = name;
            var _methods = [];
     
            for (var index = 0; index < methods.length; index++) {
                var method = _ensureMethodType(methods[index], index);
                _methods.push(method);
            }
     
            this.getName = function() {
                return _name;
            }
     
            this.getMethods = function() {
                return _methods;
            }
        }
})();

Interface.ensureImplements = function(clazz, interfacs) {
      if (arguments.length !== 2) {
          throw new Error("Interface.ensureImplements require 2 arguments, Interface.ensureImplement(Class(Object), [Interface1(Object), Interface2(Object), ...]).");
      }
   
      if (typeof clazz !== 'object') {
          throw new Error("First argument of Interface.ensureImplements is not \"object\", but is \"" + (typeof clazz) + "\".");
      }
   
      if (Object.prototype.toString.call(object) !== '[object Array]') {
          throw new Error("Second argument of Interface.ensureImplements is not \"array of Interface\", but is \"" + (typeof interfacs) + "\".");
      }
   
      for (var index = 0; index < interfacs.length; index++) {
          var inter = interfacs[index];
          if (inter.constructor !== Interface) {
              throw new Error("Second argument of Interface.ensureImplements index " + index + " is not Interface.");
          }
   
          var methods = inter.getMethods();
          for (var property in methods) {
              var method = methods[property];
   
              if (clazz[method] === undefined) {
                  throw new Error("Implementation class is not define method \"" + method + "\" of Interface \"" + inter.getName() + "\".");
              }
   
              if (typeof clazz[method] !== 'function') {
                  throw new Error("Implementation class define \"" + method + "\" is not \"method\", but is \"" + (typeof clazz[method]) + "\".");
              }
          }
      }
};


export var Information = new Interface('Information',
      ['getInform', 
      'checkAccount', 
      'addProfile', 
      'editProfile', 
      'deleteProfile']);