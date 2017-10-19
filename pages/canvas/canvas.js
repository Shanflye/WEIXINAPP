// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   ctx:{},
   clickX :[],
   clickY : [],
   clickDrag:[],
   paint:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  wx.setNavigationBarTitle({
    title: '我的画板',
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     this.ctx=wx.createCanvasContext("cvs");
  },
  onclick:function(e){
  },
  onmousedown: function (e) {
    this.paint = true;
    this.addClick(e.touches[0].x - e.target.offsetLeft, e.touches[0].y - e.target.offsetTop);
  this.redraw();
    },
  onmousemove:function(e){
    if (this.paint) {//是不是按下了鼠标
      this.addClick(e.touches[0].x - e.target.offsetLeft, e.touches[0].y -      e.target.offsetTop, true);
       this.redraw();
    }
    
  },
  onmouseup:function(){
    this.paint = false;
  },
  redraw: function () {
    var context=this.ctx;
    var clickX = this.data.clickX;
    var clickY = this.data.clickY;
    var clickDrag = this.data.clickDrag;
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 1;

    for (var i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {//当是拖动而且i!=0时，从上一个点开始画线。
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.stroke();
      
    }
    context.draw();
  },
  addClick: function(x, y, dragging) {
    this.data.clickX.push(x);
    this.data.clickY.push(y);
    this.data.clickDrag.push(dragging);
  },
  //长按清除
  clear:function(){
    this.data.clickX=[];
    this.data.clickY = [];
    this.data.clickDrag=[];
    this.data.paint=false;
    this.ctx.clearRect(0,0,320,500);
    this.ctx.draw();
  }
})