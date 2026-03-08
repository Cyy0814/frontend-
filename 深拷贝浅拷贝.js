//浅拷贝
//原生方法实现
const obj = { a: 1, b: { c: 2 } };
const copy1 = Object.assign({}, obj);
const copy2 = { ...obj };
//手写实现
function shallowCopy(obj) {
  //非对象/空对象
  if (typeof obj !== "Object" || obj === null) return obj;
  let res = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) res[key] = obj[key];
  }
  return res;
}
//测试输出
console.log(shallowCopy(obj));

//深拷贝
//json方法实现,有局限：函数会丢失，日期对象变成字符串，正则对象变成空对象，循环引用会报错
const obj2 = { a: 1, b: { c: 2 }, d: new Date() };
const copy3 = JSON.parse(JSON.stringify(obj2));
console.log(copy3);

//手写实现
function deepClone(obj, map = new WeakMap()) {
  //基本类型/非对象直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (map.has(obj)) return map.get(obj);

  const result = Array.isArray(obj) ? [] : {};
  map.set(obj, result);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map);
    }
  }
  return result;
}
//测试输出
const a = { val: 1 };
a.self = a;
const b = deepClone(a);
console.log(b.val); // 1
console.log(b.self === b); // true
