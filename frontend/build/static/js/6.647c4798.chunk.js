(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[6],{157:function(e,a,t){"use strict";var r=t(0),n=t.n(r);a.a=function(){return n.a.createElement("div",null,"Consent verecek hoca ar\u0131yorum...")}},220:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),l=t(8),i=t(2),u=t.n(i),c=t(3),m=t(175),o=t(173),s=t(170),d=t(40),b=t(34),p=t(53),E=t(217),f=t(219),v=function(){var e=Object(b.b)(),a=Object(r.useState)(""),t=Object(m.a)(a,2),l=t[0],i=t[1],o=Object(r.useState)(""),s=Object(m.a)(o,2),v=s[0],h=s[1],w=function(){var a=Object(c.a)(u.a.mark((function a(t,r){return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e(Object(d.b)(t));case 1:case"end":return a.stop()}}),a)})));return function(e,t){return a.apply(this,arguments)}}();return n.a.createElement("div",null,n.a.createElement("form",{onSubmit:function(e){e.preventDefault(),w({email:l,password:v})}},n.a.createElement(E.a,{error:!1,required:!0,size:"small",id:"outlined-required",label:"Email",variant:"outlined",value:l,placeholder:"onur.temiz@boun.edu.tr",onChange:function(e){return i(e.target.value)}}),n.a.createElement(E.a,{error:!0,size:"small",value:v,id:"outlined-password-input",label:"Password",type:"password",autoComplete:"current-password",variant:"outlined",onChange:function(e){return h(e.target.value)}}),n.a.createElement(f.a,{type:"submit",variant:"contained",color:"primary"},"Submit")),n.a.createElement(p.b,{to:"/signup"},"Kayit icin tiklayin."))},h=(t(14),t(216)),w=function(){var e=Object(b.b)(),a=function(){var a=Object(c.a)(u.a.mark((function a(t,r){return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e(Object(d.e)(t)),r(!1);case 2:case"end":return a.stop()}}),a)})));return function(e,t){return a.apply(this,arguments)}}(),t=s.a({firstName:s.b().max(15,"Must be 15 characters or less").required("Required"),lastName:s.b().required("Required").max(15,"Must be 15 characters or less"),email:s.b().required("Required").matches(/^[A-Z0-9._%+-]+@boun\.edu\.tr$/i,"Only boun"),password:s.b().required("Required").min(8,"Must be 8 characters or more")});return n.a.createElement(h.a,{maxWidth:"sm",fixed:!0},n.a.createElement(o.d,{initialValues:{firstName:"",lastName:"",email:"",password:""},validationSchema:t,onSubmit:function(e,t){var r=t.setSubmitting;a(e,r)}},n.a.createElement(o.c,null,n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"firstName"},"First Name: "),n.a.createElement(o.b,{name:"firstName",type:"text",placeholder:"Onur"})),n.a.createElement("div",null,n.a.createElement(o.a,{name:"firstName"})),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"lastName"},"Last Name: "),n.a.createElement(o.b,{name:"lastName",type:"text",placeholder:"Temiz"})),n.a.createElement("div",null,n.a.createElement(o.a,{name:"lastName"})),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"email"},"Email: "),n.a.createElement(o.b,{name:"email",type:"text",placeholder:"onur.temiz@boun.edu.tr"})),n.a.createElement("div",null,n.a.createElement(o.a,{name:"email"})),n.a.createElement("div",null,n.a.createElement("label",{htmlFor:"password"},"Password: "),n.a.createElement(o.b,{name:"password",type:"password"})),n.a.createElement("div",null,n.a.createElement(o.a,{name:"password"})),n.a.createElement(f.a,{type:"submit",variant:"outlined",color:"primary",size:"large"},"Submit"))),n.a.createElement(p.b,{to:"/login"},"Uyeyseniz tiklayin."))},y=t(157);a.default=function(){return n.a.createElement("div",null,n.a.createElement(l.a,{to:"/login"}),n.a.createElement(l.d,null,n.a.createElement(l.b,{path:"/login"},n.a.createElement(v,null)),n.a.createElement(l.b,{path:"/signup"},n.a.createElement(w,null))),n.a.createElement(y.a,null))}}}]);
//# sourceMappingURL=6.647c4798.chunk.js.map