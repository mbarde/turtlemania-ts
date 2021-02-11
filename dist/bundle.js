(()=>{"use strict";var t=function(){function t(t,i,e){this.max=i,this.min=t,this.delta=e,this.value=Math.floor((this.max-this.min)/2)+this.min,this.oscillation=!0}return t.prototype.update=function(){this.value+=this.delta,!0===this.oscillation&&(this.value<=this.min&&this.delta<0||this.value>=this.max&&this.delta>0)&&(this.delta=-this.delta),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max)},t.prototype.setToMax=function(){this.value=this.max},t.prototype.setToMin=function(){this.value=this.min},t.prototype.getValue=function(){return this.value},t.prototype.setDelta=function(t){this.delta=t},t.prototype.setMax=function(t){this.max=t},t.prototype.setMin=function(t){this.min=t},t.prototype.setValue=function(t){this.value=t},t.prototype.setOscillation=function(t){this.oscillation=t},t}(),i=function(){function t(t,i){this.x=t,this.y=i}return t.prototype.rotate=function(t){var i,e,s,n,o;o=-t*(Math.PI/180),s=Math.cos(o),n=Math.sin(o),i=this.x,e=this.y,this.x=i*s-e*n,this.y=i*n+e*s},t.prototype.add=function(t){this.x+=t.x,this.y+=t.y},t.prototype.sub=function(t){this.x-=t.x,this.y-=t.y},t.prototype.scale=function(t){this.x*=t,this.y*=t},t.prototype.normalize=function(){var t;0!==(t=this.magnitude())&&(this.x=this.x/t,this.y=this.y/t)},t.prototype.magnitude=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},t.prototype.distanceTo=function(t){var i=this.clone();return i.sub(t),i.magnitude()},t.prototype.clone=function(){return new t(this.x,this.y)},t}(),e=function(){function e(e,s){this.alive=!0,this.context=e,this.lineWidth=new t(1,3,.01),this.radius=new t(4,6,.02),this.pos=new i(Math.floor(Math.random()*(s.x-60))+30,Math.floor(Math.random()*(s.y-60))+30)}return e.prototype.update=function(){this.lineWidth.update(),this.radius.update()},e.prototype.draw=function(){var t;(t=this.context).lineCap="round",t.lineJoin="round",t.strokeStyle="white",t.lineWidth=this.lineWidth.getValue(),t.beginPath(),t.arc(this.pos.x,this.pos.y,this.radius.getValue(),0,2*Math.PI),t.stroke()},e.prototype.explode=function(){this.alive=!1,this.lineWidth.setOscillation(!1),this.lineWidth.setMin(1e-4),this.lineWidth.setDelta(-.02),this.radius.setMax(99999),this.radius.setDelta(1)},e.prototype.touchedByTurtle=function(t){return!1!==this.alive&&this.pos.distanceTo(t.getPos())<=Math.floor(this.radius.getValue()/2)+Math.floor(t.getWidth())&&(this.explode(),!0)},e}(),s=function(){function e(e,s){this.angle=45,this.baseDirection=new i(0,1),this.context=e,this.length=new t(16,999,0),this.length.setOscillation(!1),this.length.setValue(16),this.pos=s,this.speed=new t(1.2,2,0),this.speed.setOscillation(!1),this.speed.setValue(1.2),this.steerSpeed=9,this.width=new t(1e-4,10,0),this.width.setOscillation(!1),this.width.setValue(10)}return e.prototype.update=function(t){var i;(i=this.baseDirection.clone()).rotate(this.angle),i.normalize(),i.scale(this.speed.getValue()*t*.1),this.pos.add(i),this.length.update(),this.speed.update(),this.width.update()},e.prototype.draw=function(){var t,i,e,s;(t=this.context).lineCap="round",t.lineJoin="round",t.strokeStyle="white",t.lineWidth=this.width.getValue(),(i=this.baseDirection.clone()).rotate(this.angle),i.normalize(),i.scale(this.length.getValue()/2),(e=this.pos.clone()).sub(i),(s=this.pos.clone()).add(i),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(s.x,s.y),t.stroke()},e.prototype.boost=function(){this.width.setValue(5),this.width.setDelta(.1),this.speed.setToMax(),this.speed.setDelta(-.002)},e.prototype.explode=function(){this.length.setMax(999),this.length.setDelta(.5),this.width.setDelta(-.1)},e.prototype.turnLeft=function(){this.angle+=this.steerSpeed,this.angle>360&&(this.angle-=360)},e.prototype.turnRight=function(){this.angle-=this.steerSpeed,this.angle<0&&(this.angle=360+this.angle)},e.prototype.getPos=function(){return this.pos},e.prototype.getWidth=function(){return this.width.getValue()},e}(),n=new(function(){function t(t){this.canvas=t,this.context=t.getContext("2d"),this.started=!1,this.lastTick=Date.now(),this.finalTime="";var e=Math.floor(this.canvas.width/2),s=Math.floor(this.canvas.height/2);this.posTextCenter=new i(e,s),this.posTextTimer=new i(this.canvas.width-30,this.canvas.height-30),this.initEnitities(),this.clearCanvas(),this.drawText()}return t.prototype.initEnitities=function(){this.turtle=new s(this.context,this.posTextCenter.clone());var t=new i(this.canvas.width,this.canvas.height);this.coins=[new e(this.context,t),new e(this.context,t),new e(this.context,t)]},t.prototype.tick=function(){var t,i;i=(t=Date.now())-this.lastTick,this.update(i),this.draw(),this.fps=1e3/i,this.lastTick=t},t.prototype.update=function(t){var i=this;this.turtle.update(t);for(var e=function(t){s.coins[t].update(),s.coins[t].draw(),!0===s.coins[t].touchedByTurtle(s.turtle)&&(setTimeout((function(){i.removeCoin(i.coins[t])}),1e3),s.turtle.boost(),s.coins.length<=1&&(s.finalTime=s.getPlayTime(),s.turtle.explode()))},s=this,n=0;n<this.coins.length;n++)e(n)},t.prototype.draw=function(){this.clearCanvas(),this.turtle.draw(),this.coins.forEach((function(t){t.draw()})),this.drawText()},t.prototype.drawText=function(){var t;t=this.context,!1===this.started?(t.lineWidth=3,t.lineCap="round",t.lineJoin="round",t.strokeStyle="white",t.font="30px white Arial",t.textAlign="center",t.strokeText("Press [SPACE]",this.posTextCenter.x,this.posTextCenter.y)):(t.lineWidth=1,t.lineCap="round",t.lineJoin="round",t.strokeStyle="white",t.font="15px white Arial",t.textAlign="center",t.strokeText(this.getPlayTime(),this.posTextTimer.x,this.posTextTimer.y)),this.finalTime.length>0&&(t.lineWidth=3,t.lineCap="round",t.lineJoin="round",t.strokeStyle="white",t.font="30px white Arial",t.textAlign="center",t.strokeText("Time: "+this.finalTime,this.posTextCenter.x,this.posTextCenter.y-60))},t.prototype.removeCoin=function(t){var i;for(i=0;this.coins[i]!=t;)i+=1;i<this.coins.length&&this.coins.splice(i,1),0===this.coins.length&&this.stop()},t.prototype.clearCanvas=function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.getPlayTime=function(){return this.finalTime.length>0?this.finalTime:((Date.now()-this.startTime)/1e3).toFixed(2)},t.prototype.stop=function(){this.started=!1,clearInterval(this.interval),this.initEnitities(),this.clearCanvas(),this.drawText()},t.prototype.start=function(){var t=this;this.started=!0,this.lastTick=Date.now(),this.startTime=this.lastTick,this.finalTime="",this.interval=setInterval((function(){return t.tick()}),1)},t.prototype.keyDown=function(t){"ArrowLeft"===t&&this.turtle.turnLeft(),"ArrowRight"===t&&this.turtle.turnRight(),"KeyR"===t&&this.stop()},t.prototype.keyUp=function(t){"Space"===t&&!1===this.started&&this.start()},t.prototype.getFPS=function(){return this.fps},t}())(document.getElementById("canvas"));window.addEventListener("keydown",(function(t){n.keyDown(t.code)}),!1),window.addEventListener("keyup",(function(t){n.keyUp(t.code)}),!1)})();