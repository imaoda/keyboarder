export default function addKeyListener(obj, param2, param3) {
  var delay = 1500;
  var cb = () => {};
  if (param2 > 0) delay = param2;
  if (param3 > 0) delay = param3;
  if (typeof param2 === "function") cb = param2;
  if (typeof param3 === "function") cb = param3;
  if (window.__key_listener_added__) return;
  window.__key_listener_added__ = true;
  var keyArr = [];
  var sto = null;
  var cmds = Object.keys(obj);
  var specialKeys = ["meta", "alt", "control", "shift"];
  function isSpecialKey(key) {
    return specialKeys.indexOf(key.toLowerCase()) !== -1;
  }

  function process(e) {
    if (e.target.tagName.match(/(textarea|input)/i)) return;
    // 干掉之前的 sto
    if (sto) clearTimeout(sto);
    // 如果点击了 esc 键，清空
    if (e.key.toLowerCase() === "escape") {
      keyArr = [];
      return;
    }
    // 如果是点击了 specialKey 重置队列，否则追加
    if (isSpecialKey(e.key)) keyArr = [e];
    else keyArr.push(e);
    // 判断当前是否命中
    var search = "default-value-qwertyuiop";
    if (isSpecialKey(keyArr[0].key) && keyArr.length > 1) {
      var keyArr2 = keyArr.slice(1);
      search = keyArr2
        .map(e => {
          var prefix = [];
          if (e.metaKey) prefix.push("m");
          if (e.altKey) prefix.push("a");
          if (e.ctrlKey) prefix.push("c");
          if (e.shiftKey) prefix.push("s");
          return (prefix.join("-") + (prefix.length ? "-" : "") + e.key).toLowerCase();
        })
        .join("|");
      // 特殊规则，对那种按了一次 specail 键并松开，再按任意1键的情形
      if (search.length === 1) search = "|" + search;
    } else if (!isSpecialKey(keyArr[0].key)) {
      search = keyArr
        .map(e => e.key)
        .join("")
        .toLowerCase();
    }

    cb(search);

    // 如果没有命中，则继续等待（不考虑那种一定错了的）
    if (!obj[search]) {
      sto = setTimeout(() => {
        keyArr = [];
      }, delay);
    } else if (cmds.filter(cmd => cmd.indexOf(search) === 0).length > 1) {
      // 命中了，并且还有待匹配的，那么延迟执行
      sto = setTimeout(() => {
        keyArr = [];
        obj[search]();
      }, delay);
    } else {
      // 命中了，且没有待匹配的，那么立即执行
      keyArr = [];
      obj[search]();
    }
  }
  document.body.addEventListener("keydown", process);
}