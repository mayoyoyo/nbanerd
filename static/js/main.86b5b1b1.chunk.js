(this.webpackJsonpnbastats=this.webpackJsonpnbastats||[]).push([[0],{25:function(t,e,a){},45:function(t,e,a){},46:function(t,e,a){"use strict";a.r(e);var n=a(0),c=a(3),s=a.n(c),i=a(15),r=a.n(i),o=(a(25),a(2)),l=a.n(o),d=a(4),h=a(16),b=a(17),u=a(19),f=a(18),j=a(5),p=a.n(j),m=(a(44),a.p+"static/media/bg.ef4f2d82.png"),g=(a(45),function(t){Object(u.a)(a,t);var e=Object(f.a)(a);function a(t){var n;return Object(h.a)(this,a),(n=e.call(this,t)).handleSubmit=function(t){t.preventDefault(),n.getPlayerId()},n.handleChange=function(t){var e=t.target.value.split(" ").join("_");e.length>0&&n.setState({name:e})},n.getPlayerId=function(){p.a.get("https://www.balldontlie.io/api/v1/players?search=".concat(n.state.name)).then(function(){var t=Object(d.a)(l.a.mark((function t(e){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!==e.data.data.length){t.next=3;break}return t.next=3,n.getInfo(e.data.data[0].id);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log(t)}))},n.getInfo=function(t){p.a.get("https://www.balldontlie.io/api/v1/players/".concat(t)).then(function(){var t=Object(d.a)(l.a.mark((function t(e){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.setState({completed:!0}),n.setState({info:e.data}),n.setState({teaminfo:e.data.team});case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log(t)}))},n.getStats=function(t){p.a.get("https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=".concat(t)).then(function(){var t=Object(d.a)(l.a.mark((function t(e){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.setState({stats:e.data.data[0]});case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log(t)}))},n.state={completed:!1,name:null,info:{},teaminfo:{},stats:{}},n.TYPE_COLORS={GSW:"#a8a878",LAL:"#c03028",flying:"#a890f0",poison:"#a040a0",ground:"#e0c069",rock:"#b8a039",bug:"#a8b920",ghost:"#705899",steel:"#b8b8d0",fire:"#f08031",water:"#6890f0",grass:"#78c850",electric:"#f8d030",psychic:"#f95888",ice:"#98d8d8",dragon:"#7138f8",dark:"#715849",fairy:"#ee99ad"},n}return Object(b.a)(a,[{key:"render",value:function(){var t=Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:"card",children:Object(n.jsxs)("div",{className:"name",style:{borderColor:"".concat(this.TYPE_COLORS[this.state.teaminfo.abbreviation])},children:[this.state.info.first_name," ",this.state.info.last_name]})}),Object(n.jsx)("br",{}),"Position: ",this.state.info.position,Object(n.jsx)("br",{}),"Team: ",this.state.teaminfo.full_name]});return Object(n.jsxs)("div",{className:"App",style:{background:"url(".concat(m,")")},children:[Object(n.jsxs)("div",{className:"header",children:[Object(n.jsx)("img",{className:"logo",src:"https://i.ibb.co/Vq98tN8/logo.png"}),Object(n.jsx)("form",{className:"searchbar",onSubmit:this.handleSubmit,children:Object(n.jsx)("label",{children:Object(n.jsx)("input",{className:"form-control",type:"text",onChange:this.handleChange,placeholder:"Search Player"})})})]}),this.state.completed?t:null,Object(n.jsxs)("div",{className:"card",children:[" ",Object(n.jsxs)("div",{className:"credits",children:[Object(n.jsx)("div",{className:"col-sm",children:"Developed by Hanson Kang "}),Object(n.jsxs)("div",{className:"col-sm",children:["Powered by"," ",Object(n.jsx)("a",{href:"https://reactjs.org/",target:"_blank",children:"React"})," ","and"," ",Object(n.jsx)("a",{href:"https://www.balldontlie.io/",target:"_blank",children:"balldontlie API"})]}),Object(n.jsx)("div",{className:"col-sm",children:Object(n.jsx)("a",{href:"https://github.com/mayoyoyo/nbastats",target:"_blank",children:"Source code"})})]})]})]})}}]),a}(c.Component)),O=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,47)).then((function(e){var a=e.getCLS,n=e.getFID,c=e.getFCP,s=e.getLCP,i=e.getTTFB;a(t),n(t),c(t),s(t),i(t)}))};r.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(g,{})}),document.getElementById("root")),O()}},[[46,1,2]]]);
//# sourceMappingURL=main.86b5b1b1.chunk.js.map