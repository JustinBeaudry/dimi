var Dimi = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var stringify_1 = createCommonjsModule(function (module, exports) {
	exports = module.exports = stringify;
	exports.getSerialize = serializer;
	function stringify(obj, replacer, spaces, cycleReplacer) {
	  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
	}
	function serializer(replacer, cycleReplacer) {
	  var stack = [], keys = [];
	  if (cycleReplacer == null) cycleReplacer = function(key, value) {
	    if (stack[0] === value) return "[Circular ~]"
	    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
	  };
	  return function(key, value) {
	    if (stack.length > 0) {
	      var thisPos = stack.indexOf(this);
	      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
	      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
	      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
	    }
	    else stack.push(value);
	    return replacer == null ? value : replacer.call(this, key, value)
	  }
	}
	});

	var lodash_merge = createCommonjsModule(function (module, exports) {
	var LARGE_ARRAY_SIZE = 200;
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;
	var MAX_SAFE_INTEGER = 9007199254740991;
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    asyncTag = '[object AsyncFunction]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    nullTag = '[object Null]',
	    objectTag = '[object Object]',
	    proxyTag = '[object Proxy]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    undefinedTag = '[object Undefined]',
	    weakMapTag = '[object WeakMap]';
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	var root = freeGlobal || freeSelf || Function('return this')();
	var freeExports =  exports && !exports.nodeType && exports;
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
	var moduleExports = freeModule && freeModule.exports === freeExports;
	var freeProcess = moduleExports && freeGlobal.process;
	var nodeUtil = (function() {
	  try {
	    var types = freeModule && freeModule.require && freeModule.require('util').types;
	    if (types) {
	      return types;
	    }
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;
	var coreJsData = root['__core-js_shared__'];
	var funcToString = funcProto.toString;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	var nativeObjectToString = objectProto.toString;
	var objectCtorString = funcToString.call(Object);
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	var Buffer = moduleExports ? root.Buffer : undefined,
	    Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
	    getPrototype = overArg(Object.getPrototypeOf, Object),
	    objectCreate = Object.create,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice,
	    symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	    nativeMax = Math.max,
	    nativeNow = Date.now;
	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	  return index < 0 ? undefined : data[index][1];
	}
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);
	  this.size = data.size;
	  return result;
	}
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           key == 'length' ||
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}
	var baseFor = createBaseFor();
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    stack || (stack = new Stack);
	    if (isObject(srcValue)) {
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
	        : undefined;
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = safeGet(object, key),
	      srcValue = safeGet(source, key),
	      stacked = stack.get(srcValue);
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;
	  var isCommon = newValue === undefined;
	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || isFunction(objValue)) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	  buffer.copy(result);
	  return result;
	}
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});
	  var index = -1,
	      length = props.length;
	  while (++index < length) {
	    var key = props[index];
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	  return value === proto;
	}
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}
	function safeGet(object, key) {
	  if (key === 'constructor' && typeof object[key] === 'function') {
	    return;
	  }
	  if (key == '__proto__') {
	    return;
	  }
	  return object[key];
	}
	var setToString = shortOut(baseSetToString);
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;
	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);
	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	var isArray = Array.isArray;
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	var isBuffer = nativeIsBuffer || stubFalse;
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});
	function constant(value) {
	  return function() {
	    return value;
	  };
	}
	function identity(value) {
	  return value;
	}
	function stubFalse() {
	  return false;
	}
	module.exports = merge;
	});

	const time = () => new Date().toISOString();
	var time_1 = time;
	const arrayToObject = array => array.reduce((memo, datum) => {
		return lodash_merge(memo, Arary.isArray(datum) ? arrayToObject(datum) : datum);
	}, {});
	var arrayToObject_1 = arrayToObject;
	var utils = {
		time: time_1,
		arrayToObject: arrayToObject_1
	};

	const { arrayToObject: arrayToObject$1, time: time$1 } = utils;
	const defaultMsgFormat = (msg, metadata, level, time) => {
		const msgPrefix = `${time} [${level.toUpperCase()}]`;
		const msgPostfix = Object.keys(metadata).length > 0 ? `: ${metadata}` : '';
		return `${msgPrefix} - ${msg}:${msgPostfix}`;
	};
	const levels = Object.freeze({
		error: 50, warn:  40, info:  30, debug: 20, trace: 10
	});
	const dimi = (level, msgFormat, serialize) => {
		level = levels[level] || levels.info;
		serialize = serialize === true;
		msgFormat = typeof msgFormat === 'function' ? msgFormat : defaultMsgFormat;
		const log = logLevel => {
			return function() {
				if (levels[logLevel] >= level) {
					let metadata = arrayToObject$1(Array.prototype.slice.call(arguments, 1));
					let msg = msgFormat(
						arguments[0],
						serialize ? stringify_1(metadata, null, 2) : metadata,
						logLevel,
						time$1()
					);
					let write = console[logLevel];
					if (logLevel === 'trace') write = console.log;
					write(msg);
				}
			};
		};
		return {
			error: log('error'),
			warn:  log('warn'),
			info:  log('info'),
			debug: log('debug'),
			trace: log('trace'),
			setLevel: newLevel => {
				level = levels[newLevel] || levels.info;
			}
		};
	};
	var dimi_1 = dimi;

	return dimi_1;

}());
