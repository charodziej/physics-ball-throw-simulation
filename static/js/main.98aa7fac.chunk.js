(this["webpackJsonpphysics-ball-throw-simulation"]=this["webpackJsonpphysics-ball-throw-simulation"]||[]).push([[0],{62:function(e,t,a){e.exports=a(72)},67:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(9),l=a.n(i),r=(a(67),a(13)),o=a(15),c=a(12),h=a(16),m=a(17),u=a(18),p=a(54),g=a(4),v=a(115),d=a(112),y=a(113),b=a(114),f=a(38),x=a(39),w=a(121),E=a(105),O=a(116),j=a(120),k=a(73),C=a(53),M=a.n(C),I=a(52),P=a.n(I),S=a(56),F=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{style:{position:"absolute",left:0,top:0,zIndex:1,transformOrigin:"2px 0px",transform:"translate(".concat(this.props.x-2,"px, ").concat(this.props.y,"px) rotate(").concat(-this.props.angle-Math.PI/2,"rad)")}},s.a.createElement("div",{style:{height:this.props.value,width:4,backgroundColor:this.props.color}}),s.a.createElement("div",{style:{position:"relative",height:0,width:0,left:-8,borderLeft:"10px solid transparent",borderRight:"10px solid transparent",borderTop:"20px solid ".concat(this.props.color)}}))}}]),t}(s.a.PureComponent),T=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{style:{position:"absolute",left:-this.props.radius,top:-this.props.radius,zIndex:2,transform:"translate(".concat(this.props.x,"px, ").concat(this.props.y,"px)")}},s.a.createElement("div",{style:{borderRadius:"50%",width:2*this.props.radius,height:2*this.props.radius,backgroundColor:this.props.color}}))}}]),t}(s.a.PureComponent),H=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).updateCanvas=function(){a.canvas.current.width=a.state.canvasWidth;var e=a.canvas.current.getContext("2d"),t=a.props.theme.palette.primary.main,n=parseInt(t.slice(1,3),16),s=parseInt(t.slice(3,5),16),i=parseInt(t.slice(5,7),16);if(a.scale()>20){var l;for(e.strokeStyle=a.props.theme.palette.lines,l=0;l<a.state.canvasHeight;l+=a.scale())e.moveTo(0,a.state.canvasHeight-l),e.lineTo(a.state.canvasWidth,a.state.canvasHeight-l),e.stroke();for(l=0;l<a.state.canvasWidth;l+=a.scale())e.moveTo(l,0),e.lineTo(l,a.state.canvasHeight),e.stroke()}var r=e.getImageData(0,0,a.state.canvasWidth,a.state.canvasHeight);a.props.results.locations.forEach((function(e){var t=Math.round(e.x*a.scale()),l=a.state.canvasHeight-Math.round(e.y*a.scale())-1;if(!(t<0||t>a.state.canvasWidth-1||l<0||l>a.state.canvasHeight-1)){var o=4*(t+l*a.state.canvasWidth);r.data[o+0]=n,r.data[o+1]=s,r.data[o+2]=i,r.data[o+3]=255}})),e.putImageData(r,0,0)},a.updateDimensions=function(){var e=a.canvas_container.current,t=e.getBoundingClientRect(),n=document.body.getBoundingClientRect();a.setState({canvasHeight:e.clientHeight-6,canvasWidth:e.clientWidth-6,canvasLeft:t.left-n.left,canvasTop:t.top-n.top})},a.scale=function(){return Math.min((a.state.canvasWidth-1)/a.props.reach,(a.state.canvasHeight-1)/a.props.maxHeight,300)},a.state={canvasHeight:100,canvasWidth:100,canvasTop:0,canvasLeft:0},a.canvas_container=s.a.createRef(),a.canvas=s.a.createRef(),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateDimensions)}},{key:"componentDidUpdate",value:function(e){this.props.time!==e.time&&this.props.time!==this.props.results.accelerations.length-1||this.updateCanvas()}},{key:"render",value:function(){var e=this.props.time,t=this.props.results.locations[e],a=this.props.results.velocities[e],n=this.props.results.accelerations[e],i={x:this.state.canvasLeft+Math.round(t.x*this.scale()),y:this.state.canvasTop+(this.state.canvasHeight-Math.round(t.y*this.scale())-1)},l={value:Math.hypot(a.x,a.y),angle:Math.atan2(a.y,a.x)},r={value:Math.hypot(n.x,n.y),angle:Math.atan2(n.y,n.x)},o=this.props.ballRadius,c=this.props.classes;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{style:{width:"100%",height:"100%"},ref:this.canvas_container},s.a.createElement("canvas",{style:{position:"absolute",zIndex:0},width:this.state.canvasWidth,height:this.state.canvasHeight,ref:this.canvas}),s.a.createElement(E.a,{className:c.container,elevation:5},[{variable:s.a.createElement(s.a.Fragment,null,"t"),unit:"ms",value:this.props.time*this.props.timeChange},{variable:s.a.createElement(s.a.Fragment,null,"h",s.a.createElement("sub",null,"max")),unit:"m",value:this.props.maxHeight},{variable:s.a.createElement(s.a.Fragment,null,"x",s.a.createElement("sub",null,"max")),unit:"m",value:this.props.reach},{variable:s.a.createElement(s.a.Fragment,null,"x",s.a.createElement("sub",null,"t")),unit:"m",value:t.x},{variable:s.a.createElement(s.a.Fragment,null,"h",s.a.createElement("sub",null,"t")),unit:"m",value:t.y},{variable:s.a.createElement(s.a.Fragment,null,"|v\u20d7",s.a.createElement("sub",null,"t"),"|"),unit:"m/s",value:l.value},{variable:s.a.createElement(s.a.Fragment,null,"\u03b1",s.a.createElement("sub",null,"v")),unit:s.a.createElement(s.a.Fragment,null,"\xb0"),value:180*l.angle/Math.PI},{variable:s.a.createElement(s.a.Fragment,null,"v",s.a.createElement("sub",null,"x")),unit:"m/s",value:a.x},{variable:s.a.createElement(s.a.Fragment,null,"v",s.a.createElement("sub",null,"y")),unit:"m/s",value:a.y},{variable:s.a.createElement(s.a.Fragment,null,"|a\u20d7",s.a.createElement("sub",null,"t"),"|"),unit:"m/s^2",value:r.value},{variable:s.a.createElement(s.a.Fragment,null,"\u03b1",s.a.createElement("sub",null,"a")),unit:s.a.createElement(s.a.Fragment,null,"\xb0"),value:180*r.angle/Math.PI},{variable:s.a.createElement(s.a.Fragment,null,"a",s.a.createElement("sub",null,"x")),unit:"m/s^2",value:n.x},{variable:s.a.createElement(s.a.Fragment,null,"a",s.a.createElement("sub",null,"y")),unit:"m/s^2",value:n.y}].map((function(e,t){return s.a.createElement(S.a,{key:t},e.variable," = ",e.value.toFixed(2)," ",e.unit)})))),this.props.showVelocity?s.a.createElement(F,{x:i.x,y:i.y,value:l.value*this.scale()/10,angle:l.angle,color:this.props.theme.palette.showVelocity}):null,this.props.showAcceleration?s.a.createElement(F,{x:i.x,y:i.y,value:r.value*this.scale()/10,angle:r.angle,color:this.props.theme.palette.showAcceleration}):null,this.props.showBall?s.a.createElement(T,{x:i.x,y:i.y,radius:o*this.scale()/100,color:this.props.theme.palette.showBall}):null)}}]),t}(s.a.PureComponent),D=Object(g.a)((function(e){return{container:{padding:e.spacing(2),margin:e.spacing(0),float:"right",display:"inline-block",flexShrink:1,position:"relative",zIndex:10}}}),{withTheme:1})(H),A=a(111),W=a(117),B=a(109),z=a(110),L=a(119),R=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=180*this.props.start.angle/Math.PI,a=this.props.start.angle/Math.PI;return s.a.createElement(s.a.Fragment,null,[{label:"Przyspieszenie grawitacyjne",name:"gravity",unit:"m/s^2"},{label:"G\u0119sto\u015b\u0107 powietrza",name:"airDensity",unit:"kg/m^3"},{label:"Wsp\xf3\u0142czynnik oporu",name:"dragCoefficient",unit:""},{label:"Promie\u0144 pi\u0142ki",name:"ballRadius",unit:"cm"},{label:"Masa pi\u0142ki",name:"ballMass",unit:"kg"}].map((function(t){return s.a.createElement(W.a,{label:t.label,key:t.name,type:"number",margin:"normal",name:t.name,value:e.props.constants[t.name],onChange:e.props.changeConstant,InputProps:{endAdornment:s.a.createElement(B.a,{position:"end"},t.unit)},inputProps:{step:.1}})})),[{label:"Wysoko\u015b\u0107",name:"height",value:this.props.start.height,precision:.1,unit:"m"},{label:"Pr\u0119dko\u015b\u0107 pocz\u0105tkowa",name:"velocity",value:this.props.start.velocity,precision:.1,unit:"m/s"},{label:"K\u0105t",name:"angle",value:a,precision:.01,unit:s.a.createElement(s.a.Fragment,null,"\u03c0")},{label:"K\u0105t",name:"angleDeg",value:t,precision:.1,unit:s.a.createElement(s.a.Fragment,null,"\xb0")}].map((function(t){return s.a.createElement(W.a,{label:t.label,key:t.name,type:"number",margin:"normal",name:t.name,value:t.value,onChange:e.props.changeStart,InputProps:{endAdornment:s.a.createElement(B.a,{position:"end"},t.unit)},inputProps:{step:t.precision}})})),[{label:"Liczba iteracji",name:"iterationLimit",unit:""},{label:"Czas 1 iteracji",name:"timeChange",unit:"ms"}].map((function(t){return s.a.createElement(W.a,{label:t.label,key:t.name,type:"number",margin:"normal",name:t.name,value:e.props[t.name],onChange:e.props.changeSetting,InputProps:{endAdornment:s.a.createElement(B.a,{position:"end"},t.unit)}})})),s.a.createElement("br",null),[{label:"Pr\u0119dko\u015b\u0107",name:"showVelocity"},{label:"Przyspieszenie",name:"showAcceleration"},{label:"Pi\u0142ka",name:"showBall"}].map((function(t){return s.a.createElement(z.a,{label:t.label,key:t.name,control:s.a.createElement(L.a,{color:"primary",name:t.name,checked:e.props[t.name],onChange:e.props.changeSetting,style:{color:e.props.theme.palette[t.name]}})})})),s.a.createElement(z.a,{control:s.a.createElement(A.a,{checked:"dark"===this.props.theme.palette.type,onChange:this.props.changeTheme,color:"primary"}),label:"Dark mode <3"}))}}]),t}(s.a.PureComponent),V=Object(g.a)((function(e){return{}}),{withTheme:1})(R);function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function _(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(Object(a),!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var G=Object(p.a)({palette:{type:"dark",primary:{main:d.a[400]},secondary:{main:d.a[400]},showAcceleration:y.a[400],showVelocity:b.a.A700,showBall:d.a.A700,lines:f.a[700]},contrastThreshold:3}),U=Object(p.a)({palette:{type:"light",primary:{main:x.a[600]},secondary:{main:d.a[500]},showAcceleration:y.a[400],showVelocity:b.a.A700,showBall:d.a.A700,lines:f.a[300]},contrastThreshold:3}),q=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).calculate=function(){var e=[],t=[],n=[],s=0,i=0,l=_({},a.state.constants,{gravity:parseFloat(a.state.constants.gravity)}),r=.5*l.dragCoefficient*l.airDensity*Math.pow(l.ballRadius/100,2)*Math.PI/l.ballMass,o=a.state.timeChange/1e3;if(e[0]={x:0,y:parseFloat(a.state.start.height)},t[0]={x:Math.cos(a.state.start.angle)*a.state.start.velocity,y:Math.sin(a.state.start.angle)*a.state.start.velocity},!(a.state.iterationLimit<2)){for(var c=0;c<a.state.iterationLimit&&(n[c]={x:-r*t[c].x*Math.sqrt(Math.pow(t[c].x,2)+Math.pow(t[c].y,2)),y:-(r*t[c].y*Math.sqrt(Math.pow(t[c].x,2)+Math.pow(t[c].y,2))+l.gravity)},t[c+1]={x:t[c].x+n[c].x*o,y:t[c].y+n[c].y*o},e[c+1]={x:e[c].x+t[c].x*o+n[c].x*Math.pow(o,2)*.5,y:e[c].y+t[c].y*o+n[c].y*Math.pow(o,2)*.5},!(e[c+1].y<0));c++)s=Math.max(s,e[c].x),i=Math.max(i,e[c].y);console.log(n),a.setState({results:{locations:e,velocities:t,accelerations:n},reach:s,maxHeight:i,time:Math.min(a.state.time,n.length-1),shouldCalculate:!1})}},a.changeConstant=function(e){a.animation(0),a.setState({constants:_({},a.state.constants,Object(r.a)({},e.target.name,e.target.value)),shouldCalculate:!0})},a.changeStart=function(e){a.animation(0);var t=_({},e);"angleDeg"===t.target.name?t=_({},e,{target:_({},e.target,{value:Math.PI*(parseFloat(t.target.value)/180%.5),name:"angle"})}):"angle"===t.target.name&&(t=_({},e,{target:_({},e.target,{value:Math.PI*(parseFloat(t.target.value)%.5),name:"angle"})})),a.setState({start:_({},a.state.start,Object(r.a)({},t.target.name,t.target.value)),shouldCalculate:!0})},a.changeSetting=function(e){var t;(a.animation(0),"timeChange"===e.target.name||"iterationLimit"===e.target.name)?a.setState((t={},Object(r.a)(t,e.target.name,e.target.value),Object(r.a)(t,"shouldCalculate",!0),t)):"showAcceleration"===e.target.name||"showVelocity"===e.target.name||"showBall"===e.target.name?a.setState(Object(r.a)({},e.target.name,e.target.checked)):a.setState(Object(r.a)({},e.target.name,e.target.value))},a.changeTime=function(e,t){a.setState({time:t})},a.changeTheme=function(){"dark"===a.state.theme.palette.type?a.setState({theme:U}):a.setState({theme:G})},a.animation=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;if(-1===e&&null!==a.state.animateInterval||0===e)clearInterval(a.state.animateInterval),a.setState({animateInterval:null});else{var t=setInterval((function(){return a.animationTick(Math.max(1,Math.round((a.state.results.accelerations.length-1)/300)))}),30);a.setState({animateInterval:t})}},a.animationTick=function(e){a.state.time+e>a.state.results.accelerations.length-1?(clearInterval(a.state.animateInterval),a.setState({time:0,animateInterval:null})):a.setState((function(t,a){return{time:t.time+e}}))},a.state={theme:G,results:{locations:[],velocities:[],accelerations:[]},start:{height:1,velocity:40,angle:Math.PI/4},constants:{gravity:9.81,airDensity:1.225,dragCoefficient:.5,ballRadius:30,ballMass:.5},maxHeight:0,reach:0,iterationLimit:1e4,timeChange:1,time:0,shouldCalculate:!0,showVelocity:!0,showAcceleration:!0,showBall:!0,animateInterval:null};for(var n=0;n<100;n++)a.state.results.locations.push({x:100,y:100+n});return a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.calculate()}},{key:"componentDidUpdate",value:function(){!0===this.state.shouldCalculate&&this.calculate()}},{key:"render",value:function(){var e=this,t=this.props.classes;return s.a.createElement(v.a,{theme:this.state.theme},s.a.createElement(w.a,null),s.a.createElement("div",{className:t.app},s.a.createElement(O.a,{container:!0,style:{flexGrow:1}},s.a.createElement(O.a,{item:!0,xs:9,className:t.paper_container},s.a.createElement(E.a,{className:t.container,style:{display:"flex"}},s.a.createElement(D,{results:this.state.results,time:this.state.time,timeChange:this.state.timeChange,reach:this.state.reach,maxHeight:this.state.maxHeight,ballRadius:this.state.constants.ballRadius,showAcceleration:this.state.showAcceleration,showVelocity:this.state.showVelocity,showBall:this.state.showBall}))),s.a.createElement(O.a,{item:!0,className:t.paper_container},s.a.createElement(E.a,{className:t.container,style:{padding:this.props.theme.spacing(1),paddingTop:this.props.theme.spacing(3),paddingBottom:this.props.theme.spacing(3)}},s.a.createElement(j.a,{orientation:"vertical",variant:"secondary",defaultValue:30,value:this.state.time,min:0,max:this.state.results.accelerations.length-1,onChange:this.changeTime,style:{height:"90%"}}),s.a.createElement(k.a,{color:"inherit","aria-label":"Menu",onClick:function(){return e.animation()},style:{display:"flex"}},this.state.animateInterval?s.a.createElement(P.a,null):s.a.createElement(M.a,null)))),s.a.createElement(O.a,{item:!0,xs:!0,className:t.paper_container},s.a.createElement(E.a,{className:t.container},s.a.createElement(V,{constants:this.state.constants,start:this.state.start,reach:this.state.reach,maxHeight:this.state.maxHeight,iterationLimit:this.state.iterationLimit,timeChange:this.state.timeChange,showVelocity:this.state.showVelocity,showAcceleration:this.state.showAcceleration,showBall:this.state.showBall,changeConstant:this.changeConstant,changeStart:this.changeStart,changeSetting:this.changeSetting,changeTheme:this.changeTheme}))))))}}]),t}(s.a.PureComponent),J=Object(g.a)((function(e){return{app:{height:"100%",width:"100%",position:"absolute",top:0,left:0,display:"flex",flexFlow:"column"},container:{padding:e.spacing(2),margin:e.spacing(2),flexGrow:1},paper_container:{display:"flex",flexFlow:"column"}}}),{withTheme:1})(q);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[62,1,2]]]);
//# sourceMappingURL=main.98aa7fac.chunk.js.map