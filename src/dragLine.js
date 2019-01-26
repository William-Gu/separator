class Line{
  constructor(line){
    this.line = line
    this.x = 0; //pageX
    this.y = 0; //pageY
    this.left = 0; //pageY
    this.excursionX = 0;
    this.draging = false;
  }
  getDom(){return this.line}
  getStyle(){
    var style = window.getComputedStyle(this.line,null)
    return {
      left: parseInt(style.getPropertyValue("left")),
      right: parseInt(style.getPropertyValue("right"))
    }
  }
  setStyle(data){
    this.line.setAttribute('style',data)
  }
}
function dragLine(obj) {
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
      
      if((vDomLine.left + excursionX)>=310 && (vDomLine.left + excursionX)<=570){
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