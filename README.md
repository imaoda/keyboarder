## introduction

网页也可以想 vim 编辑器一样的支持快捷键

keyboader 封装了对复杂按键的监听，从而让我们的网页事件更丰富

## quick start

```bash
yarn add keyboader
```

```js
import addKeyListener from 'keyboarder'

addKeyListener({
  a: () => alert('用户按下了 a 键'),
  abc: () => alert('用户顺序按下了 abc 键')
})
```

## 复杂按键配置

按键配置：

```js
addKeyListener({
  a: () => {
    alert("a");
    // 由于有 ab 的存在，因此会延迟执行
  },
  ab: () => {
    alert("ab");
    // 没有后续待匹配的，则直接执行
  },
  // 复杂按键，用 | 分割
  "m-a|m-b": () => {
    // 全部复杂按键的
    alert("用户按住meta(即mac下的command), 并顺序按了 a、b");
  },
  "m-a|b": () => {
    // 首字母复杂按键的
    alert("用户按住meta，并按下a，之后松开meta，并按下 b");
  },
  "m-c-c|b": () => {
    // 多复杂按键的 按照 meta alt control shift 的顺序，如 m-a-c-s-v 表示按下了 meta、alt、control、shift 并按了 v 键。注：mac 下实际 alt(option) 用不上，因为会改变字符
    alert("用户按住 meta 和 control 键，并按下了 c，之后松开，并按下了 b");
  },
  "m-c-c|m-c-v": () => {
    // 全部多复杂按键
    alert("m-c-c|m-c-v");
  },
  "a|b", // 特殊规则：按过 cmd 之后，弹起，再输入 ab
  "|a", // 特殊规则：针对按过 meta 并弹起，再按 a
});
```

其他配置

```js
addKeyListener(orders, 2000, command => {
  alert(`用户当前命令为: ${command}`)
})
```

2、3 参可选，一个是设置超时时间，默认 1500，一个设置回调，显示当前的命令

esc 键能清空之前的命令