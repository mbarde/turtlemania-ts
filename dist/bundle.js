(()=>{"use strict";new(function(){function t(t,e){this.context=t,this.pos=e,this.size=50}return t.prototype.draw=function(){var t=this.context;t.lineCap="round",t.lineJoin="round",t.strokeStyle="black",t.lineWidth=1,t.beginPath(),t.arc(this.pos.x,this.pos.y,this.size,0,2*Math.PI),t.stroke()},t}())(document.getElementById("canvas").getContext("2d"),{x:50,y:50}).draw()})();