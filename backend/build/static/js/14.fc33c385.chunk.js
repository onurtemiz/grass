(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[14],{398:function(e,t,n){"use strict";var a=n(218),r=n.n(a),c=n(147),l=n.n(c),i=n(133),o=n.n(i),s=n(134),u=n.n(s),m=n(137),d=n.n(m),p=n(136),h=n.n(p),f=n(135),b=n.n(f),v=n(138),g=n.n(v),E=n(132),y=n.n(E),O=n(142),j=n.n(O),k=n(159),w=n.n(k),P=n(139),I=n.n(P),z=(n(12),n(2)),N=n.n(z),x=n(315),C=n(316),A=n(352),T=n(299),K=n(252),G=n(297),S=n(128),q=n.n(S),Y=n(25),L=n.n(Y),W=n(171),D=n(127),F=n(342),H=n(298);function M(e){var t=e.active,n=e.children,a=e.className,r=e.content,c=e.loading,l=L()(Object(W.a)(t,"active"),Object(W.a)(c,"loading"),"tab",a),i=Object(x.a)(M,e),o=Object(C.a)(M,e),s={};return o===H.a&&(s.attached="bottom"),N.a.createElement(o,q()({},s,i,{className:l}),D.a.isNil(n)?r:n)}M.handledProps=["active","as","children","className","content","loading"],M.defaultProps={as:H.a,active:!0},M.propTypes={},M.create=Object(F.f)(M,(function(e){return{content:e}}));var V=M,B=function(e){function t(){var e,n;o()(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return n=d()(this,(e=h()(t)).call.apply(e,[this].concat(r))),y()(b()(n),"handleItemClick",(function(e,t){var a=t.index;I()(n.props,"onTabChange",e,l()({},n.props,{activeIndex:a})),n.trySetState({activeIndex:a})})),n}return g()(t,e),u()(t,[{key:"getInitialAutoControlledState",value:function(){return{activeIndex:0}}},{key:"renderItems",value:function(){var e=this.props,t=e.panes,n=e.renderActiveOnly,a=this.state.activeIndex;return n?I()(w()(t,"[".concat(a,"]")),"render",this.props):j()(t,(function(e,t){var n=e.pane;return V.create(n,{overrideProps:{active:t===a}})}))}},{key:"renderMenu",value:function(){var e=this.props,t=e.menu,n=e.panes,a=e.menuPosition,r=this.state.activeIndex;return!0===t.tabular&&"right"===a&&(t.tabular="right"),G.a.create(t,{autoGenerateKey:!1,overrideProps:{items:j()(n,"menuItem"),onItemClick:this.handleItemClick,activeIndex:r}})}},{key:"renderVertical",value:function(e){var t=this.props,n=t.grid,a=t.menuPosition,c=n.paneWidth,l=n.tabWidth,i=r()(n,["paneWidth","tabWidth"]),o=a||"right"===e.props.tabular&&"right"||"left";return N.a.createElement(T.a,i,"left"===o&&K.a.create({width:l,children:e},{autoGenerateKey:!1}),K.a.create({width:c,children:this.renderItems(),stretched:!0},{autoGenerateKey:!1}),"right"===o&&K.a.create({width:l,children:e},{autoGenerateKey:!1}))}},{key:"render",value:function(){var e=this.renderMenu(),n=Object(x.a)(t,this.props),a=Object(C.a)(t,this.props);return e.props.vertical?N.a.createElement(a,n,this.renderVertical(e)):N.a.createElement(a,n,"bottom"!==e.props.attached&&e,this.renderItems(),"bottom"===e.props.attached&&e)}}]),t}(A.a);y()(B,"autoControlledProps",["activeIndex"]),y()(B,"defaultProps",{grid:{paneWidth:12,tabWidth:4},menu:{attached:!0,tabular:!0},renderActiveOnly:!0}),y()(B,"Pane",V),y()(B,"handledProps",["activeIndex","as","defaultActiveIndex","grid","menu","menuPosition","onTabChange","panes","renderActiveOnly"]),B.propTypes={};t.a=B},615:function(e,t,n){"use strict";n.d(t,"a",(function(){return F}));var a=n(128),r=n.n(a),c=n(133),l=n.n(c),i=n(134),o=n.n(i),s=n(137),u=n.n(s),m=n(136),d=n.n(m),p=n(135),h=n.n(p),f=n(138),b=n.n(f),v=n(132),g=n.n(v),E=n(144),y=n.n(E),O=(n(141),n(25)),j=n.n(O),k=(n(12),n(2)),w=n.n(k),P=n(171),I=n(315),z=n(316),N=n(127),x=n(342),C=n(397);function A(e){var t=e.children,n=e.className,a=e.content,c=j()("content",n),l=Object(I.a)(A,e),i=Object(z.a)(A,e);return w.a.createElement(i,r()({},l,{className:c}),N.a.isNil(t)?a:t)}A.handledProps=["as","children","className","content"],A.propTypes={};var T=A;function K(e){var t=e.children,n=e.className,a=e.content,c=j()("header",n),l=Object(I.a)(K,e),i=Object(z.a)(K,e);return w.a.createElement(i,r()({},l,{className:c}),N.a.isNil(t)?a:t)}K.handledProps=["as","children","className","content"],K.propTypes={},K.create=Object(x.f)(K,(function(e){return{content:e}}));var G=K,S=n(142),q=n.n(S);function Y(e){var t=e.children,n=e.className,a=e.content,c=j()("content",n),l=Object(I.a)(Y,e),i=Object(z.a)(Y,e);return w.a.createElement(i,r()({},l,{className:c}),N.a.isNil(t)?a:t)}Y.handledProps=["as","children","className","content"],Y.propTypes={},Y.defaultProps={as:"li"},Y.create=Object(x.f)(Y,(function(e){return{content:e}}));var L=Y;function W(e){var t=e.children,n=e.className,a=e.items,c=j()("list",n),l=Object(I.a)(W,e),i=Object(z.a)(W,e);return w.a.createElement(i,r()({},l,{className:c}),N.a.isNil(t)?q()(a,L.create):t)}W.handledProps=["as","children","className","items"],W.propTypes={},W.defaultProps={as:"ul"},W.create=Object(x.f)(W,(function(e){return{items:e}}));var D=W,F=function(e){function t(){var e,n;l()(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return n=u()(this,(e=d()(t)).call.apply(e,[this].concat(r))),g()(h()(n),"handleDismiss",(function(e){var t=n.props.onDismiss;t&&t(e,n.props)})),n}return b()(t,e),o()(t,[{key:"render",value:function(){var e=this.props,n=e.attached,a=e.children,c=e.className,l=e.color,i=e.compact,o=e.content,s=e.error,u=e.floating,m=e.header,d=e.hidden,p=e.icon,h=e.info,f=e.list,b=e.negative,v=e.onDismiss,g=e.positive,E=e.size,O=e.success,k=e.visible,A=e.warning,K=j()("ui",l,E,Object(P.a)(i,"compact"),Object(P.a)(s,"error"),Object(P.a)(u,"floating"),Object(P.a)(d,"hidden"),Object(P.a)(p,"icon"),Object(P.a)(h,"info"),Object(P.a)(b,"negative"),Object(P.a)(g,"positive"),Object(P.a)(O,"success"),Object(P.a)(k,"visible"),Object(P.a)(A,"warning"),Object(P.b)(n,"attached"),"message",c),S=v&&w.a.createElement(C.a,{name:"close",onClick:this.handleDismiss}),q=Object(I.a)(t,this.props),Y=Object(z.a)(t,this.props);return N.a.isNil(a)?w.a.createElement(Y,r()({},q,{className:K}),S,C.a.create(p,{autoGenerateKey:!1}),(!y()(m)||!y()(o)||!y()(f))&&w.a.createElement(T,null,G.create(m,{autoGenerateKey:!1}),D.create(f,{autoGenerateKey:!1}),Object(x.d)(o,{autoGenerateKey:!1}))):w.a.createElement(Y,r()({},q,{className:K}),S,a)}}]),t}(k.Component);g()(F,"Content",T),g()(F,"Header",G),g()(F,"List",D),g()(F,"Item",L),g()(F,"handledProps",["as","attached","children","className","color","compact","content","error","floating","header","hidden","icon","info","list","negative","onDismiss","positive","size","success","visible","warning"]),F.propTypes={}},646:function(e,t,n){"use strict";n.r(t);var a=n(130),r=n(2),c=n.n(r),l=n(26),i=n(34),o=n(398),s=n(10),u=n(0),m=n.n(u),d=n(3),p=n(126),h=n(299),f=n(656),b=n(615),v=n(395),g=n(637),E=n(298),y=n(397),O=n(631),j=n(652),k=n(155),w=function(e){var t=e.setActiveIndex,n=Object(k.a)(),o=n.register,s=n.handleSubmit,u=n.errors,w=n.setValue,P=n.watch,I=Object(l.b)(),z=Object(l.c)((function(e){return e.user})),N=Object(r.useState)(null),x=Object(a.a)(N,2),C=x[0],A=x[1];Object(r.useEffect)((function(){o({name:"currentPassword"},{required:"L\xfctfen \u015fu anki \u015fifrenizi girin.",minLength:{value:8,message:"\u015eu anki \u015fifreniz en az 8 karakterden olu\u015fmal\u0131."}}),o({name:"password"},{minLength:{value:8,message:"Yeni \u015fifreniz en az 8 karakterden olu\u015fmal\u0131."},validate:function(e){return!e||(e&&0!==e.trim().length||"Yeni \u015fifreniz sadece bo\u015fluklardan olu\u015famaz.")}}),o({name:"samePassword"},{validate:function(e){return e===P("password")||"\u015eifreleriniz uyu\u015fmuyor."}}),o({name:"username"},{maxLength:{value:15,message:"Yeni kullan\u0131c\u0131 ad\u0131n\u0131z 15 veya daha az harften olu\u015fmal\u0131."},minLength:{value:1,message:"yeni kullan\u0131c\u0131 ad\u0131n\u0131z en az 1 harften olu\u015fmal\u0131"},validate:function(e){return!e||(0!==e.trim().length||"Yeni kullan\u0131c\u0131 ad\u0131n\u0131z sadece bo\u015fluklardan olu\u015famaz.")}})}),[]);var T=function(){var e=Object(d.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:A("started"),I(Object(i.q)(t,A));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return"started"===C?c.a.createElement(p.a,null):("finished"===C&&t(0),c.a.createElement(h.a,{textAlign:"center",style:{height:"90vh"},verticalAlign:"middle",columns:"equal"},c.a.createElement(h.a.Column,{style:{maxWidth:450}},c.a.createElement(f.a,{as:"h1",color:"green",textAlign:"center"},"\xc7im Hesab\u0131n\u0131z\u0131 G\xfcncelleyin."),c.a.createElement(b.a,{color:"green"},"Kullan\u0131c\u0131 ad\u0131n\u0131z\u0131 ya da/veya \u015fifrenizi g\xfcncelleyin.",c.a.createElement("br",null),c.a.createElement(v.a,{color:"blue",style:{padding:"5px"}},"@boun.edu.tr")," ","E posta adresinizi de\u011fi\u015ftirme \u015fans\u0131n\u0131z yoktur."),c.a.createElement(g.a,{size:"large"},c.a.createElement(E.a,null,c.a.createElement(g.a.Input,{style:{opacity:"1"},fluid:!0,icon:c.a.createElement(y.a,{color:"green",name:"mail"}),iconPosition:"left",value:z.email,disabled:!0}),c.a.createElement(g.a.Field,{inline:!0},c.a.createElement(g.a.Input,{fluid:!0,icon:c.a.createElement(y.a,{color:"red",name:"key"}),iconPosition:"left",placeholder:"\u015eu anki \u015fifrenizi girin",type:"password",onChange:function(e,t){var n=t.name,a=t.value;return w(n,a)},name:"currentPassword"}),u.currentPassword&&c.a.createElement(v.a,{basic:!0,color:"red",pointing:"above"},u.currentPassword.message)),c.a.createElement(O.a,null),c.a.createElement(g.a.Input,{fluid:!0,icon:c.a.createElement(y.a,{name:"user",color:"green"}),iconPosition:"left",type:"text",placeholder:"Yeni kullan\u0131c\u0131 ad\u0131 (".concat(z.username,")"),onChange:function(e,t){var n=t.name,a=t.value;return w(n,a)},name:"username"}),u.username&&c.a.createElement(v.a,{basic:!0,color:"red",pointing:"above"},u.username.message),c.a.createElement(g.a.Field,{inline:!0},c.a.createElement(g.a.Input,{autoComplete:"new-password",fluid:!0,icon:c.a.createElement(y.a,{color:"green",name:"key"}),iconPosition:"left",placeholder:"Yeni \u015fifre",type:"password",onChange:function(e,t){var n=t.name,a=t.value;return w(n,a)},name:"password"}),u.password&&c.a.createElement(v.a,{basic:!0,color:"red",pointing:"above"},u.password.message)),c.a.createElement(g.a.Field,{inline:!0},c.a.createElement(g.a.Input,{fluid:!0,icon:c.a.createElement(y.a,{color:"green",name:"key"}),iconPosition:"left",placeholder:"Yeni \u015fifrenizi tekrar girin",type:"password",onChange:function(e,t){var n=t.name,a=t.value;return w(n,a)},name:"samePassword"}),u.samePassword&&c.a.createElement(v.a,{basic:!0,color:"red",pointing:"above"},u.samePassword.message)),c.a.createElement(O.a,null),c.a.createElement(j.a,{fluid:!0,size:"large",primary:!0,onClick:s(T)},"G\xfcncelle"))))))},P=n(1),I=n(49),z=n(175),N=n(145),x=n(131),C=n(17),A=n(633),T=function(){return c.a.createElement(A.a,{fluid:!0},c.a.createElement(h.a,{verticalAlign:"middle",centered:!0,columns:1,stretched:!0,style:{height:"60vh"}},c.a.createElement(h.a.Row,{centered:!0,stretched:!0},c.a.createElement(h.a.Column,{textAlign:"center"},c.a.createElement(f.a,{as:"h1",color:"green"},c.a.createElement(y.a,{name:"hockey puck",size:"massive"}),"Hen\xfcz hi\xe7 kimseyi takip etmiyorsunuz.")))))},K=n(150),G=function(e){var t=e.title,n=e.arr,a=e.path;return c.a.createElement(c.a.Fragment,null,c.a.createElement(x.d,{color:"green",bold:!0},t),c.a.createElement("ul",{style:{listStyle:"none"}},n.map((function(e){return c.a.createElement("li",{style:Object(P.a)({marginTop:"0.5em"},x.a),key:e.id},c.a.createElement(x.d,{color:"blue",bold:!0},c.a.createElement(I.b,{to:a(e)},e.name?e.name.toUpperCase():e.question?e.question:e.username?e.username:e.fullName.toUpperCase())," ","\xb7"," "),c.a.createElement(z.a,{idToFollow:e.id}))}))),c.a.createElement(O.a,null))},S=function(){var e=Object(l.c)((function(e){return e.user})),t=Object(r.useState)(),n=Object(a.a)(t,2),i=n[0],o=n[1];Object(r.useEffect)((function(){C.a.getFollowing(o)}),[e]);return 0===e.following.length||i&&0===function(e){if(void 0!=e){var t=0;return t+=e.clubs.length,t+=e.lessons.length,t+=e.questions.length,t+=e.campuses.length,t+=e.dorms.length,t+=e.users.length}return 0}(i)?c.a.createElement(T,null):null==i?c.a.createElement(K.a,null):c.a.createElement("div",null,c.a.createElement(f.a,{color:"green",as:"h1"},"Takip Ettiklerin"),c.a.createElement(O.a,null),0!==i.lessons.length&&c.a.createElement(G,{title:"Dersler",arr:i.lessons,path:N.d}),0!==i.users.length&&c.a.createElement(G,{title:"Kullan\u0131c\u0131lar",arr:i.users,path:N.g}),0!==i.clubs.length&&c.a.createElement(G,{title:"Kul\xfcpler",arr:i.clubs,path:N.b}),0!==i.questions.length&&c.a.createElement(G,{title:"Sorular",arr:i.questions,path:N.e}),0!==i.campuses.length&&c.a.createElement(G,{title:"Kamp\xfcsler",arr:i.campuses,path:N.a}),0!==i.dorms.length&&c.a.createElement(G,{title:"Yurtlar",arr:i.dorms,path:N.c}))},q=n(396),Y=n(641),L=function(e){var t=e.user,n=Object(r.useState)([]),o=Object(a.a)(n,2),s=o[0],u=o[1];Object(r.useEffect)((function(){f(Object(i.b)())}),[s]),Object(r.useEffect)((function(){(function(){var e=Object(d.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.a.getAchievement();case 2:t=e.sent,u(t.icons);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var f=Object(l.b)();return!t.achievements||!s.length>0?c.a.createElement(p.a,null):c.a.createElement(h.a,{columns:"6"},c.a.createElement(h.a.Row,null,s.map((function(e){return c.a.createElement(h.a.Column,{key:e.name,verticalAlign:"middle",style:{marginLeft:"0.5em",marginTop:"1em"}},c.a.createElement(Y.a,{content:e.description,position:"bottom center",trigger:c.a.createElement(y.a,{onClick:function(){return t=e.name,n=e.achievement,void f(Object(i.a)(t,n));var t,n},name:e.name,color:t.iconName===e.name?"green":"blue",size:"big",bordered:!0,disabled:!t.achievements["".concat(e.achievement)],style:{boxShadow:"0em 0em 0em 0.1em ".concat(t.iconName===e.name?"#21BA45":"#2185d1"," inset")}})}))}))))},W=n(143);t.default=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.user})),n=Object(r.useState)(),u=Object(a.a)(n,2),m=u[0],d=u[1],p=Object(s.g)(),h=Object(s.h)();if(Object(r.useEffect)((function(){e(Object(i.g)(t))}),[h]),Object(r.useEffect)((function(){h.pathname.includes("follows")?d(1):h.pathname.includes("icons")?d(2):h.pathname.includes("edit")?d(3):d(0)}),[h]),Object(r.useEffect)((function(){1===m?p.push("/user/follows"):0===m?p.push("/user"):2===m?p.push("/user/icons"):3===m&&p.push("/user/edit")}),[m]),"undefined"==typeof t.comments)return null;var f=function(e){return m===e?"green":"blue"},b=[{menuItem:{content:c.a.createElement(x.d,{bold:!0,pointer:!0,color:f(0)},"Hesab\u0131m"),color:"green",key:0},render:function(){return c.a.createElement(q.a,{u:t})}},{menuItem:{content:c.a.createElement(x.d,{bold:!0,pointer:!0,color:f(1)},"Takip"),color:"green",key:1},render:function(){return c.a.createElement(o.a.Pane,null,c.a.createElement(S,null))}},{menuItem:{content:c.a.createElement(x.d,{bold:!0,pointer:!0,color:f(2)},"\u0130konlar\u0131m"),color:"green",key:2},render:function(){return c.a.createElement(o.a.Pane,null,c.a.createElement("div",{style:{marginBottom:"1em"}},c.a.createElement(L,{user:t})))}},{menuItem:{content:c.a.createElement(x.d,{bold:!0,pointer:!0,color:f(3)},"G\xfcncelle"),color:"green",key:3},render:function(){return c.a.createElement(o.a.Pane,null,c.a.createElement(w,{setActiveIndex:d}))}}];return c.a.createElement("div",{style:{height:"90vh"}},c.a.createElement(o.a,{menu:W.isMobile?{fluid:!0,vertical:!1,tabular:!0,pointing:!0}:{fluid:!0,vertical:!0,tabular:!0,pointing:!0},panes:b,onTabChange:function(e,t){return d(t.activeIndex)},activeIndex:m,style:{marginTop:"1em"}}))}}}]);
//# sourceMappingURL=14.fc33c385.chunk.js.map