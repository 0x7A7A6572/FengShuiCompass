/**
 *  
 */

/** 层内数据展示样式 */
const [TOGERTHER_STYLE_EMPTY,
  TOGERTHER_STYLE_EQUALLY,
  TOGERTHER_STYLE_SON,
  CORRECTION_ANGLE] = ['empty', 'equally', 'son', -90];
/**
 *  罗盘数据
 */
class CompassData {
  data = [
    {
      name: '八数',
      startAngle: 0,
      // fontSize: 108,
      textColor: 'white',
      vertical: false,
      togetherStyle: 'empty',
      data: ["一", "二", "三", "四", "五", "六", "七", "八"]
    },
    {
      name: ['后先天八卦', '先天八卦', '龙上八煞'],
      startAngle: 0,
      // fontSize: 18,
      textColor: ['white', 'red', 'white'],
      vertical: false,
      togetherStyle: 'equally',
      data: [
        ['坎', '艮', '震', '巽', '离', '坤', '兑', '乾'],
        ['☰', '☲', '☱', '☴', '☵', '☶', '☳', '☷'],
        ["辰", "寅", "申", "酉", "亥", "卯", "巳", "午"]
      ]
    },
    {
      name: '九星',
      startAngle: 0,
      // fontSize: 18,
      textColor: 'white',
      //vertical:false,
      //togetherStyle: 'equally',
      data: ["贪", "巨", "禄", "文", "武", "廉", "破", "辅", "弼"] //["白", "黑", "碧", "绿", "黄", "白", "赤", "白", "紫"]], //九星宿var _9_XING_SE = ["白", "黑", "碧", "绿", "黄", "白", "赤", "白", "紫"] //九星对应色
    },
    {
      name: '二十四山',
      startAngle: 0,
      //  fontSize: 18,
      textColor: 'white',
      //vertical:false,
      //togetherStyle: 'equally',
      data: ["子", "癸", "丑", "艮", "寅", "甲", "卯", "乙", "辰", "巽", "巳", "丙", "午", "丁", "未", "坤", "申", "庚", "酉", "辛", "戌", "乾", "亥", "壬"]
    },
    {
      name: '微盘二十四星',
      startAngle: 0,
      // fontSize: 28,
      textColor: 'white',
      //vertical:false,
      //togetherStyle: 'equally',
      data: ["天辅", "天垒", "天汉", "天厨", "天市", "天桔", "天苑", "天衡", "天官", "天罡", "太乙", "天屏", "太微", "天马", "南极", "天常", "天钺", "天关", "天潢", "少微", "天乙", "天魁", "天厩", "天皇"]
    },
    {
      name: '透地六十龙',
      startAngle: 0,
      // fontSize: 18,
      textColor: 'white',
      vertical: true,
      togetherStyle: 'equally',
      data: ["甲子", "丙子", "戊子", "庚子", "壬子", "乙丑", "丁丑", "己丑", "辛丑", "癸丑", "甲寅", "丙寅", "戊寅", "庚寅", "壬寅", "乙卯", "丁卯", "己卯", "辛卯", "癸卯", "甲辰", "丙辰", "戊辰", "庚辰", "壬辰", "乙巳", "丁巳", "己巳", "辛巳", "癸巳", "甲午", "丙午", "戊午", "庚午", "壬午", "乙未", "丁未", "己未", "辛未", "癸未", "甲申", "丙申", "戊申", "庚申", "壬申", "乙酉", "丁酉", "己酉", "辛酉", "癸酉", "甲戌", "丙戌", "戊戌", "庚戌", "壬戌", "乙亥", "丁亥", "己亥", "辛亥", "癸亥"]
    },
    {
      name: '透地六十龙旺相',
      startAngle: 0,
      // fontSize: 18,
      textColor: 'white',
      vertical: false,
      //togetherStyle: 'equally',
      data: ["三", "八", "二", "一", "四", "三", "六", "一", "三", "九", "八", "三", "三", "七", "三", "四", "五", "一", "三", "五", "四", "七", "二", "八", "四", "六", "一", "七", "三", "六", "五", "九", "二", "四", "一", "五", "三", "五", "三", "三", "三", "八", "五", "七", "一", "八", "三", "七", "七", "九", "八", "五", "二", "九", "五", "七", "九", "四", "九", "五"]
    }
  ];
  /** 获取层级数据 */
  getDataByName(name) {
    return this.data[name].data;
  }
  /** 获取层级初始角度 */
  getAngleByName(name) {
    return this.data[name].startAngle;
  }
  /** 获取所有层级数据 */
  getAllData() {
    return this.data;
  }
}

/** 罗盘工具类 */
class CompressUtil {
  CompassData;
  /** 初始化构造器 */
  constructor(compressDate) {
    this.CompassData = compressDate;
  }
  getAngleData(name, angle) {
    let compLenght = CompassData.getDataByName(name).length;
    let singleDateAngle = 360 / compLenght;
    let data = CompassData.getDataByName(name)[(CompassData.getAngleByName(name) + angle) / singleDateAngle];
    return data;
  }
}

/**
 * 
 * 
 * 重定义（文字所处位置与半径的关系）：
 *    R  =  天池r + （边框w * （总层数+1））+ 刻度h + 外层r
 *   层R = 天池r + （边框w * （层数+1））+ （层h* 层数）
 *   层文R = 层R - （层高 - （Padding*2））/2
 *   层文S = 层高 - （Padding*2）|| 垂直时 -> 再/2
 * 
 * 
 * 
 */
class FengShuiCompass {
  Draw = new _DrawCompass(this);
  COMPASS = {
    radius: 500, //默认500
    centralPoint: { x: 500, y: 500 },
    selfAdaption: true,
    defaultFontSize: 30,
    _LayerPadding: 5,
    borderWidth: 3,
    bordeeColor: 'aqua',
    /** 刻度样式 （bate） */
    scaleStyle: {
      minLineHeight: 10,
      midLineHeight: 15,
      maxLineHeight: 20,
      numberFontSize: 30
    },
    /** 刻度高度 */
    scaleHeight: 40 + 3 + 5,/** 3 = borderWidth， 5 = _LayerPadding  暂时不支持修改刻度样式*/
    /** 天心十字 */
    tianXinCross: {
      show: true,
      borderWidth: 3,
      bordeeColor: 'aqua'
    },
    tianChiRadiu: 100,
    data: []
  };
  /** 弃用_fontSpace = 5; 用 LayerPadding 
   * _zoom 缩放系数
   * _rotate 旋转角度系数
   * _moveX/Y 平移量系数
   * */
  _zoom = 1;
  _rotate = 0;
  _moveX = 0;
  _moveY = 0;

  _layerHigh = [];
  _latticeFill = []; /**[[第几宫,层数,'颜色值'],[...], ...] */
  _layerFill = []; /** [层数，'颜色值'] */

  constructor(center, radius) {
    this.COMPASS.radius = radius;
    this.COMPASS.centralPoint = center instanceof Array ? center : { x: 0, y: 0 };
    return this;
  }

  /**
   * 初始化层数据 并作一些调整
   */
  init() {

    for (let i = 0; i < this.getLayersLength(); i++) {
      this._layerHigh.push(this.Draw._caclLayerHigh(i, this.getLayerData(i).fontSize, this.getLayerData(i).vertical))
    }

    /** test */


  }

  /*中心点*/
  setCenterPoint(px, py) {
    this.COMPASS.centralPoint = typeof (px + py) == "number" ? { x: px, y: py } : { x: 0, y: 0 };
    return this;
  }
  getCenterPoint() { return this.COMPASS.centralPoint; }
  /* 罗盘半径,默认500*/
  setRadius(rad) {
    this.COMPASS.radius = typeof (rad) == "number" ? rad : 500;
    return this;
  }
  getRadius() { return this.COMPASS.radius; }
  /*罗盘的边框线园和纵线*/
  setBorder(width, color) {
    this.COMPASS.borderWidth = typeof width == "number" ? width : 3;
    this.COMPASS.borderColor = typeof color == "string" ? color : 'black';
    return this;
  }
  _getBorderWidth() {
    return this.COMPASS.borderWidth;
  }
  _getBorderColor() {
    return this.COMPASS.bordeeColor;
  }
  /**
   *  设置天下心十字 
   * （天心十字需要固定 暂时不使用）
   *  */
  setTianXinCorss(show, width, color) {
    this.COMPASS.tianXinCross.show = typeof (show) == "boolean" ? show : true;
    this.COMPASS.tianXinCross.borderWidth = typeof (width) == "number" ? width : 3;
    this.COMPASS.tianXinCross.borderColor = typeof (color) == "string" ? color : 'red';
    return this;
  }

  /* setCompassData其他set之后调用 */
  setCompassData(cdata) {
    this.COMPASS.data = this._checkCompassData(cdata);
    this.init();
    return this.Draw;
  }

  /*所有层数据*/
  getCompassData() {
    return this.COMPASS.data;
  }
  /*单层数据*/
  getLayerData(index) {
    return this.COMPASS.data[index];
  }
  /** 设置层数据 */
  setLayerData(index, datas) {
    this.COMPASS.data[index] = {
      name: datas.name,
      startAngle: datas.startAngle,
      fontSize: datas.fontSize,
      textColor: datas.textColor,
      vertical: datas.vertical,
      togetherStyle: datas.togetherStyle,
      data: datas.data
    }
  }
  /** 设置宫填充 */
  setLatticeFill(filldata) {
    this._latticeFill = filldata;
    return this;
  }
  getLatticeFill() {
    return this._latticeFill;
  }
  /** 设置层填充 */
  setLayerFill(filldata) {
    this._layerFill = filldata;
    return this;
  }
  getLayerFill() {
    return this._layerFill;
  }
  getLayerPadding() {
    return this.COMPASS._LayerPadding;
  }
  /** 设置层内边距 */
  setLayerPadding(value) {
    this.COMPASS._LayerPadding = value;
    return this;
  }

  isSelfAdaption() {
    return this.COMPASS.selfAdaption;
  }
  setSelfAdaption(boolean) {
    this.selfAdaption = boolean;
    return this;
  }
  getRadius() {
    return this.COMPASS.radius;
  }
  setRadius(value) {
    this.COMPASS.radius = value;
    return this;
  }
  getLayersLength() {
    return this.COMPASS.data.length;
  }
  /**   获取层数据的数据长度  */
  getLayerDataLength(index) {
    let dataLength = 0;
    if (this.getLayerData(index).data[0] instanceof Array) {
      dataLength = this.getLayerData(index).data[0].length;
    } else {
      dataLength = this.getLayerData(index).data.length;
    }
    return dataLength;
  }

  getTianChiRadiu() {
    return this.COMPASS.tianChiRadiu;
  }
  setTianChiRadiu(value) {
    this.COMPASS.tianChiRadiu = value;
    return this;
  }
  getScaclHeight() {
    return this.COMPASS.scaleHeight;
  }

  getlayersHigh() {
    return this._layerHigh;
  }

  setlayersHigh(layerHigh) {
    this._layerHigh = layerHigh;
    return this;
  }

/* 获取刻度样式 */
  getScaclStyle(){
    return this.COMPASS.scaleStyle;
  }

/* 设置刻度样式 */
setScaclStyle(style){
     this.COMPASS.scaleStyle = style;
     return this;
  }
  /** 获取刻度字体大小 */
  getScaclFontSize() {
    return this.COMPASS.scaleStyle.numberFontSize;
  }
  /** 设置刻度字体大小 */
  setScaclFontSize(fontsize) {
    this.COMPASS.scaleStyle.numberFontSize = fontsize;
    return this;
  }



  _checkCompassData(cdata) {
    if (cdata != null)
      for (let i = 0; i < cdata.length; i++) {
        if (cdata[i].name instanceof Array ? typeof (cdata[i][0]) != "string" ? false : true : typeof (cdata[i].name) != "string") { console.warn("index:" + i + " 罗盘第" + (i + 1) + "层数据,参数name应为非空字符串"); cdata[i].name = cdata[i].name.toString(); }
        if (cdata[i].startAngle == null || cdata[i].startAngle > 360 || cdata[i].startAngle < 0) { cdata[i].startAngle = 0; console.warn("罗盘第" + i + "层数据   0 < startAngle < 360  否则 = 0"); }
        if (typeof (cdata[i].vertical) != 'boolean') { cdata[i].vertical = false; }
        if (typeof (cdata[i].fontSize) != 'number') { cdata[i].fontSize = this.COMPASS.defaultFontSize; }
        /* 根据罗盘半径自动校准字体大小
         * 除天池部分的半径 平均给每一层 考虑层间距
         */
        if (this.COMPASS.selfAdaption) { /*cdata[i].fontSize = cdata[i].vertical == true ? (this.COMPASS.radius - this.COMPASS.tianChiRadiu - (this.COMPASS._LayerPadding * 2)) / cdata.length : this.COMPASS.radius - this.COMPASS.tianChiRadiu - (this.COMPASS._LayerPadding * 2)*/ }
        if (cdata[i].togetherStyle != 'empty' && cdata[i].togetherStyle != 'son' && cdata[i].togetherStyle != 'equally') {
          cdata[i].togetherStyle = 'empty';
        } else if (cdata[i].togetherStyle == 'son' || cdata[i].togetherStyle == 'equally') {
          if (cdata[i].data[0] instanceof Array == false) {
            cdata[i].togetherStyle = 'empty';
          }
        }
      }

    return cdata;
  }

}


class _DrawCompass {
  ObjCompass = null;
  ctx = null;

  constructor(compassData) {
    this.ObjCompass = compassData;
  }

  /** 获取指定层的半径 */
  _getLayerRadiu(index) {
    let radius = 0 + this.ObjCompass.getTianChiRadiu() + this.ObjCompass._getBorderWidth() * 2;
    for (let i = 0; i < index; i++) {
      radius += this.ObjCompass.getlayersHigh()[i];
    }
    return radius;
  }

  /* 计算每一层的高  （自定义宽高存在未解决问题 ）*/
  _caclLayerHigh(layerIndex, layerFonSize, textVertical) {
    let clayer = this.ObjCompass.getLayerData(layerIndex);
    let layerHight = 0;
    // let MaxWidth = 0;
    let layerTextLentgh = clayer.data[0].length;
    if (clayer.data[0] instanceof Array) {
      /** 同宫的数据处理 */
      layerTextLentgh = clayer.data[0][0].length;
    }
    layerHight = this._caclVertical(textVertical, layerTextLentgh, layerFonSize);

    if (this.ObjCompass.isSelfAdaption()) {
      /** 自动调整以罗盘半径为基数 平分再调整 */

      layerHight = ((this.ObjCompass.getRadius() - this.ObjCompass.getTianChiRadiu() - this.ObjCompass.getScaclHeight())
        /
        this.ObjCompass.getLayersLength())
        -
        (this.ObjCompass._getBorderWidth() * (this.ObjCompass.getLayersLength()));

      /*if (layerHight > (layerFonSize * 1.5) + this.ObjCompass.getLayerPadding() * 2) {
layerHight = this._caclVertical(textVertical, layerTextLentgh, layerFonSize);     
}*/

      /** 自动调整顺便设置fonsize */
      let textsHeight = layerFonSize * layerTextLentgh;
      // console.log(textsHeight,layerFonSize ,layerTextLentgh)
      this._correctFonSize(layerIndex, clayer, layerHight, textsHeight, layerTextLentgh)

      /** 计算MaxWidth */
      /* let C = 2 * Math.PI * layerHight;
       if (ctx.measureText(clayer.data.join()).width > C) {
         if (clayer.data[0] instanceof Array) {
           MaxWidth = (C / (clayer.data.length * clayer.data[0].length)) - (this.ObjCompass.getLayerPadding() * 2);
         } else {
           MaxWidth = (C / clayer.data.length) - (this.ObjCompass.getLayerPadding() * 2);
         }
       } */
    }
    return layerHight;

  }

  /*initLayersHight(autoHeight) {
    let heights = [];
    for (let i = 0; i < this.ObjCompass.getLayersLength(); i++) {
      heights.push(autoHeight);
      this._correctFonSize(i, this.ObjCompass.getLayerData(i), layerHight, textsHeight, layerTextLentgh)

    }
    this.ObjCompass.setlayersHigh(heights);
  } */

  _caclVertical(textVertical, layerTextLentgh, layerFonSize) {
    let layerHight = 0;
    if (textVertical) {
      /** fonsize * 一个宫的字数 + 宫padding-top&padding-bottom */
      layerHight = layerTextLentgh * layerFonSize + this.ObjCompass.getLayerPadding() * 2;
    } else {
      layerHight = layerFonSize + this.ObjCompass.getLayerPadding() * 2;
    }
    return layerHight;
  }

  _correctFonSize(layerIndex, clayer, layerHight, textsHeight, textLenght) {
    if (textsHeight > layerHight - this.ObjCompass.getLayerPadding() * 2) {
      clayer.fontSize = (layerHight - this.ObjCompass.getLayerPadding() * 2) / textLenght;
    }
    this.ObjCompass.setLayerData(layerIndex, clayer);
  }

  drawLayerText(clayer, layerIndex) {
    console.log("TOGERTHER_STYLE_EMPTY", TOGERTHER_STYLE_EMPTY)
    for (let i = 0; i < clayer.data.length; i++) {
      let startAngle = clayer.startAngle;
      let fontSize = clayer.fontSize;

      let textColor = clayer.textColor;
      let vertical = clayer.vertical;
      let togetherStyle = clayer.togetherStyle;
      let str = clayer.data[i];
      let xyr = {
        x: this.ObjCompass.getCenterPoint().x,
        y: this.ObjCompass.getCenterPoint().y,
        radius: this._getLayerRadiu(layerIndex)
      }
      if (clayer.data[i] instanceof Array) {
        for (var j = 0; j < clayer.data[i].length; j++) {
          str = clayer.data[i][j];
          if (clayer.data.length > 3) { console.error("一层不能超过3个同宫"); break; }
          let index_Gaong;
          /* 同宫样式 -- 平分 */
          if (togetherStyle == TOGERTHER_STYLE_EQUALLY) {
            if (clayer.data.length == 2) {
              let single = 360 / clayer.data[i].length;
              switch (i) {
                case 0: index_Gaong = - single / 2 / 2;
                  break;
                case 1: index_Gaong = 0 + single / 2 / 2;
                  break;
              }
            } else if (clayer.data.length == 3) {
              let single = 360 / clayer.data[i].length;
              switch (i) {
                case 0: index_Gaong = - single / 3 + single * j;
                  break;
                case 1: index_Gaong = 0 + single * j;
                  break;
                case 2: index_Gaong = single / 3 + single * j;
                  break;
              }
            }
            /* ps：画单个字的起始角度与罗盘判定角度对应宫位的‘起始角度’不同 */
            let textStartAngle = this.rads(startAngle + (360 / clayer.data[i][j].length) * j + index_Gaong);
            this._drawCircularText(xyr, str, textStartAngle, fontSize, textColor, vertical);
            /* 同宫样式 -- 主次 */
          } else if (togetherStyle == TOGERTHER_STYLE_SON) {
            /*console.debug("我还没写这个")*/
          }

        }
      } else {
        let textStartAngle = this.rads(startAngle + (360 / clayer.data.length) * i);
        this._drawCircularText(xyr, str, textStartAngle, fontSize, textColor, vertical);
      }
    }

  }

  _drawCircularText(xyr, string, startAngle, fontSize, textColor, vertical) {
    string = string.toString();
    let radius = xyr.radius;
    let angle = parseFloat(startAngle);
    let index = 0;
    let character;

    this.ctx.save();
    this.ctx.fillStyle = textColor;
    this.ctx.font = fontSize + 'px 楷书';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    if (vertical) {
      while (index < string.length) {
        character = string.charAt(index);
        /* this.ctx.textBaseline = 'bottom';*/
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(xyr.x + Math.cos(angle) * radius, xyr.y + Math.sin(angle) * radius);
        this.ctx.rotate(Math.PI / 2 + angle);
        this.ctx.fillText(character, 0, fontSize * index - (this.ObjCompass.getLayerPadding() * 2));
        index++;
        this.ctx.restore();
      }
    } else {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.translate(xyr.x + Math.cos(angle) * radius,
        xyr.y + Math.sin(angle) * radius);
      this.ctx.rotate(Math.PI / 2 + angle);
      this.ctx.fillText(string, 0, 0);
      this.ctx.restore();
    }
    this.ctx.restore();
  }


  /**
   * 
   * @param {*} s xy坐标 r半径
   * @param {*} startAngle 起始角度
   * @param {*} startX 开始画的x
   * @param {*} startY 开始画的y
   * @param {*} endX 结束画的x
   * @param {*} endY 结束画的y
   * @param {*} color 颜色
   */
  _drawCircularLine(s, startAngle, startX, startY, endX, endY, color) {
    color = color != null ? color : this.ObjCompass._getBorderColor();
    let lineWidth = this.ObjCompass._getBorderWidth();
    let radius = s.radius;
    let angle = parseFloat(startAngle);
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(s.x + Math.cos(angle) * radius,
      s.y + Math.sin(angle) * radius);
    this.ctx.rotate(Math.PI / 2 + angle);
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.strokeStyle = color;
    this.ctx.closePath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawLayerStroke(index, strokeColor, lineWidth) {
    let centerPoint = this.ObjCompass.getCenterPoint();
    let layerHeight = this.ObjCompass.getlayersHigh();
    let xyr = {
      x: centerPoint.x,
      y: centerPoint.y,
      radius: this._getLayerRadiu(index)
    }

    this.ctx.beginPath();
    this.ctx.arc(centerPoint.x, centerPoint.y, this._getLayerRadiu(index) + layerHeight[index] / 2, 0, Math.PI * 2, false);
    /*floorHeight/2 不然会画在字中间*/
    this.ctx.lineWidth = typeof (lineWidth) == 'number' ? lineWidth : _lineWidth;
    this.ctx.strokeStyle = typeof (strokeColor) == 'string' ? strokeColor : 'aqua';
    this.ctx.closePath();
    this.ctx.stroke();
    /* 画宫隔断 */
    let singleLenght = this.ObjCompass.getLayerDataLength(index);
    for (let j = 0; j < singleLenght; j++) {
      this._drawCircularLine(xyr,
        this.rads((360 / singleLenght) * j + (360 / singleLenght) / 2)
        , 0, layerHeight[index] / 2, 0, -layerHeight[index] / 2);
    }
  }

  _drawTianChi() {
    /* 画天池 */
    let centerPoint = this.ObjCompass.getCenterPoint();
    let tianChiHight = this.ObjCompass.getTianChiRadiu();
    this.ctx.strokeStyle = this.ObjCompass._getBorderColor();
    this.ctx.lineWidth = this.ObjCompass._getBorderWidth();
    this.ctx.arc(centerPoint.x, centerPoint.y, tianChiHight + tianChiHight / 2, 0, Math.PI * 2, false);
    this.ctx.stroke();
  }

  /* 非零环绕 圈填充 */
  layerFill(index, fillColor) {
    let centerPoint = this.ObjCompass.getCenterPoint();
    let layerHeight = this.ObjCompass.getlayersHigh();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(centerPoint.x, centerPoint.y, this._getLayerRadiu(index) - layerHeight[index] / 2, 0, Math.PI * 2, false);
    this.ctx.arc(centerPoint.x, centerPoint.y, this._getLayerRadiu(index + 1) - layerHeight[index] / 2, 0, Math.PI * 2, true);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
  }

  /*  宫填充 */
  latticeFill(latticeIndex, layerIndex, fillColor) {
    let tianChiHight = this.ObjCompass.getTianChiRadiu();
    let centerPoint = this.ObjCompass.getCenterPoint();
    let layerHeight = this.ObjCompass.getlayersHigh();
    let a = (360 / this.ObjCompass.getLayerDataLength(layerIndex)) * latticeIndex - (360 / this.ObjCompass.getLayerDataLength(layerIndex)) / 2;
    let r = this._getLayerRadiu(layerIndex) - layerHeight[layerIndex] / 2;
    let r2 = this._getLayerRadiu(layerIndex + 1) - layerHeight[layerIndex] / 2;
    this.ctx.beginPath();
    this.ctx.arc(centerPoint.x, centerPoint.y, r, this.rads(a), this.rads(a + 360 / this.ObjCompass.getLayerDataLength(layerIndex)), false);
    this.ctx.arc(centerPoint.x, centerPoint.y, r2, this.rads(a + 360 / this.ObjCompass.getLayerDataLength(layerIndex)), this.rads(a), true);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
  }

  /* 计算角度 */
  rads(x) {
    return Math.PI * (x + CORRECTION_ANGLE) / 180;
  }
  /** 依次绘制所有 */
  draw(ctx) {
    if (ctx) {
      let latfills = this.ObjCompass.getLatticeFill();
      let layfills = this.ObjCompass.getLayerFill();
      this.ctx = ctx;
      this.ctx.beginPath();
      this._drawTianChi();
      for (let i = 0; i < layfills.length; i++) {
        this.layerFill(layfills[i][0], layfills[i][1]);
      }
      for (let i = 0; i < latfills.length; i++) {
        this.latticeFill(latfills[i][0], latfills[i][1], latfills[i][2]);
      }
      for (let i = 0; i < this.ObjCompass.getCompassData().length; i++) {
        let clayer = this.ObjCompass.getLayerData(i);

        this.drawLayerText(clayer, i);
        this.drawLayerStroke(i, this.ObjCompass._getBorderColor(), this.ObjCompass._getBorderWidth())
      }

      /**
       *   画刻度
       */
      // let averageHeight = (this.ObjCompass.getCenterPoint().x - this.ObjCompass.getTianChiRadiu()) / this.ObjCompass.getLayersLength();
      let scaclStyle = this.ObjCompass.getScaclStyle();
      let xyrScalc = {
        x: this.ObjCompass.getCenterPoint().x,
        y: this.ObjCompass.getCenterPoint().y,
        radius: this._getLayerRadiu(this.ObjCompass.getLayersLength()) + (this.ObjCompass.getScaclHeight() / 2)
      }
      let xyrScalcText = {
        x: this.ObjCompass.getCenterPoint().x,
        y: this.ObjCompass.getCenterPoint().y,
        radius: xyrScalc.radius - scaclStyle.maxLineHeight * 2
      }
      let fontSize = this.ObjCompass.getScaclFontSize();
      let textColor = 'red'
      let vertical = false;

      for (var i = 0; i < 360; i++) {
        if (i % 10 == 0) {
          this._drawCircularLine(xyrScalc, this.rads(1 * i), 0, -10, 0, scaclStyle.maxLineHeight, 'red');
          this._drawCircularText(xyrScalcText, "" + i, this.rads(1 * i), fontSize, textColor, vertical)
        }
        else if (i % 5 == 0) {
          this._drawCircularLine(xyrScalc, this.rads(1 * i), 0, -10, 0, scaclStyle.midLineHeight)
        }
        else {
          this._drawCircularLine(xyrScalc, this.rads(1 * i), 0, -10, 0, scaclStyle.minLineHeight)
        }
      }


    }

  }


}

export { FengShuiCompass, CompassData, CompressUtil };