# separator
  这是一个可拖拽的插件，性能优异，代码简洁，可复用。
  - 使用例子

参数： 以左侧栏为标准
{Number} inital: 初始宽度
{Number} min: 可拖拉的最小宽度
{Number} max: 可拖拉的最大宽度
{Function} cb: 回调，可设置调整后的比例

```
  dragLine({
    initial: 310,
    min: 310,
    max: 570,
    cb: function(data){
      var left = document.querySelector('.left')
          left.style.width = data + "px";
      var right = document.querySelector('.right')
          right.style.left = data + "px";
    }
  });

```