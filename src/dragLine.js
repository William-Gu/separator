class Line{
  constructor(line){
    this.line = line;
    this.x = 0; //pageX
    this.y = 0; //pageY
    this.left = 0; //pageY
    this.excursionX = 0;
    this.draging = false;
  }
  getDom(){return this.line}
  getStyle(){
    var style = window.getComputedStyle(this.line, null)
    return {
      left: parseInt(style.getPropertyValue("left")),
      right: parseInt(style.getPropertyValue("right"))
    }
  }
  setStyle(data){
    this.line.setAttribute('style',data)
  }
}
function initialDom(obj){
  if(!obj.el){
    obj.el = "separator-dom"
  }
  var separatorDom = document.getElementById(obj.el);
  if(!separatorDom){
    console.error("U Should set el: 'separator-dom'");
    return false;
  };

  var vdragWrap = createElement("div", {id: "vdragWrap", class: "vdragWrap"})
  
  var dragLine = createElement("div", {
    id: "dragLine",
    class: "dragLine",
  })

  var vdragLine = createElement("div", {id: "vdragLine", class: "vdragLine"})
  var vdragLineDashed = createElement("div", {id: "vdragLine-dashed", class: "vdragLine-dashed"})
  createAppend(vdragLine, dragLine)
  createAppend(vdragLineDashed, dragLine)
  
  createAppend(vdragWrap, separatorDom)
  createAppend(dragLine, separatorDom)
  return separatorDom;
}

function dragLine(obj) {
  initialDom(obj); // 设立separator Dom元素

  var vdragWrap = document.querySelector('#vdragWrap');
  var Dom = document.querySelector('#dragLine'); //实际使用的Dom分割线
  var DomLine = new Line(Dom);
  var vDom = document.querySelector('#vdragLine');//drag拖拽的线
  var vDomLine = new Line(vDom);
      vDomLine.left = obj.initial;

  var vDomDashed = document.querySelector('#vdragLine-dashed');//虚线
  var vDomDashedLine = new Line(vDomDashed);
      vDomDashedLine.left = obj.initial;

  var lineStyle = 'border-left:1px dashed #000;border-right:1px dashed #000;';

  vDom.addEventListener('mousedown', function(e){
    vDomLine.draging = true;
    vdragWrap.setAttribute('style','display:inline-block')
    vDomDashedLine.setStyle(lineStyle)
    var x = e.clientX, y = e.clientY;
          vDomLine.x = x;
    vDomDashedLine.x = x;
          vDomLine.y = y;
    vDomDashedLine.y = y;
  })
  vdragWrap.addEventListener('mousemove', function(e){
    e.preventDefault();
    if(vDomLine.draging){
      
      var excursionX =  e.clientX - vDomLine.x;
      console.log(vDomLine.left , excursionX);
      
      if((vDomLine.left + excursionX) >= obj.min && (vDomLine.left + excursionX) <= obj.max){
        vDomLine.excursionX = excursionX;
        vDomDashedLine.setStyle(lineStyle + 'transform:translateX(' + excursionX + 'px)')
      }
    }
  })
  vdragWrap.addEventListener('mouseup', function(e){
    if(vDomLine.draging){
      var left = vDomLine.left + vDomLine.excursionX
      obj.cb(left)
      DomLine.setStyle('left:'+left+'px')
      vDomDashedLine.setStyle('');
      vDomLine.left = left;
      vDomDashedLine.left = left;
      vDomLine.excursionX = 0;
      vDomDashedLine.excursionX = 0;
  
      vdragWrap.setAttribute('style','display:none')
      console.log('drop',left);
      console.log('drop1',vDomLine);
      console.log('drop2',vDomDashedLine);
      vDomLine.draging = false;
    }
  })
  // lineIn.addEventListener('dragstart',function(e){})
  // document.addEventListener('dragover',function(e){})
  // document.addEventListener('dragend',function(e){})
}

function hasClass(ele, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}
 
function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}
 
function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}
function createElement(elementName, obj) {
  var element = document.createElement(elementName);

  for (let key in obj) {
    if (key === "class") {
      element.className = obj[key];
    } else if (key === "style") {
      if (element.setAttribute) {
        element.setAttribute("style", obj[key]);
      } else {
        element.style.cssText = obj[key];
      }
    } else {
      element[key] = obj[key];
    }
  }
  return element;
}
function createAppend(node, parent) {
  let nodeDom;

  if (node.nodeType !== 1 && typeof node === "string") {
    nodeDom = document.createElement("div");
    nodeDom.className = node.replace(/^\./, "");
  } else {
    nodeDom = node;
  }
  parent.appendChild(nodeDom);
  return nodeDom;
}

// export default dragLine;