class TianXinCross {
    width; height;
    ctx;

/**
 * 构造器
 * @param {Context} ctx 
 * @param {number} width 
 * @param {number} height 
 */
  constructor(ctx, width, height) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  draw(lineColor, lineWidth){
    // 颜色设置
    this.ctx.strokeStyle = lineColor;
    // 线宽设置
    this.ctx.lineWidth = lineWidth || 3;

    this.ctx.beginPath();   //开始一个新的绘制路径
	this.ctx.moveTo(0, this.height/2);   //定义直线的起点坐标为(10,10)
	this.ctx.lineTo(this.width, this.height/2);   //定义直线的终点坐标为(200,10)
	this.ctx.stroke();   //沿着坐标点的路径顺序绘制直线
	this.ctx.closePath();   //关闭当前的绘制路径

    this.ctx.beginPath();   
	this.ctx.moveTo(this.width/2, 0);  
	this.ctx.lineTo(this.width/2, this.height);  
	this.ctx.stroke();  
	this.ctx.closePath(); 

  }

}
export { TianXinCross }