"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8512],{8512:(P,g,a)=>{a.r(g),a.d(g,{RestauracionPageModule:()=>h});var m=a(177),c=a(4341),t=a(791),u=a(8986),f=a(467),n=a(3953);const p=[{path:"",component:(()=>{var o;class i{constructor(e,r){this.router=e,this.alertController=r,this.nombreUsuario=""}ngOnInit(){}ionViewWillEnter(){this.nombreUsuario=""}onSubmit(){var e=this;return(0,f.A)(function*(){e.nombreUsuario?(yield(yield e.alertController.create({header:"\xc9xito",message:`Se ha enviado un enlace para recuperar la contrase\xf1a a la direcci\xf3n asociada con el usuario ${e.nombreUsuario}.`,buttons:["OK"]})).present(),e.router.navigate(["/home"])):yield(yield e.alertController.create({header:"Error",message:"Por favor, introduce un nombre de usuario.",buttons:["OK"]})).present()})()}cancelar(){this.router.navigate(["/home"])}}return(o=i).\u0275fac=function(e){return new(e||o)(n.rXU(u.Ix),n.rXU(t.hG))},o.\u0275cmp=n.VBU({type:o,selectors:[["app-restauracion"]],decls:21,vars:2,consts:[[3,"fullscreen"],[1,"top-section"],["src","assets/Images/logo.png","alt","Logo",1,"logo"],[3,"ngSubmit"],["position","floating"],["type","text","name","nombreUsuario","required","",3,"ngModelChange","ngModel"],["expand","full","type","submit"],["color","danger","expand","block",1,"custom-button",3,"click"],["color","fulldark",1,"ion-text-center"]],template:function(e,r){1&e&&(n.j41(0,"ion-content",0)(1,"div",1),n.nrm(2,"img",2),n.j41(3,"h1"),n.EFF(4,"Recupera tu contrase\xf1a"),n.k0s()(),n.j41(5,"ion-card")(6,"ion-card-header")(7,"ion-card-title"),n.EFF(8,"Ingresa tu Nombre de Usuario"),n.k0s()(),n.j41(9,"ion-card-content")(10,"form",3),n.bIt("ngSubmit",function(){return r.onSubmit()}),n.j41(11,"ion-item")(12,"ion-label",4),n.EFF(13,"Nombre de Usuario"),n.k0s(),n.j41(14,"ion-input",5),n.mxI("ngModelChange",function(l){return n.DH7(r.nombreUsuario,l)||(r.nombreUsuario=l),l}),n.k0s()(),n.j41(15,"ion-button",6),n.EFF(16,"Enviar"),n.k0s()()()(),n.j41(17,"ion-button",7),n.bIt("click",function(){return r.cancelar()}),n.EFF(18,"Cancelar"),n.k0s()(),n.j41(19,"ion-footer"),n.nrm(20,"ion-toolbar",8),n.k0s()),2&e&&(n.Y8G("fullscreen",!0),n.R7$(14),n.R50("ngModel",r.nombreUsuario))},dependencies:[c.qT,c.BC,c.cb,c.YS,c.vS,c.cV,t.Jm,t.b_,t.I9,t.ME,t.tN,t.W9,t.M0,t.$w,t.uz,t.he,t.ai,t.Gw],styles:["ion-content[_ngcontent-%COMP%]{--background: linear-gradient(to bottom, #01109c, #4b6cb7);--color-primary: #ff4f5e}.top-section[_ngcontent-%COMP%]{height:33vh;background-color:#01109c;display:flex;justify-content:center;align-items:center;flex-direction:column;color:#fff;font-size:2.5rem}.logo[_ngcontent-%COMP%]{width:150px;height:auto;margin-bottom:20px;animation:_ngcontent-%COMP%_bounce 2s infinite}@keyframes _ngcontent-%COMP%_bounce{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}ion-card[_ngcontent-%COMP%]{border-radius:10px;margin-top:-20vh;padding:2rem}ion-card-header[_ngcontent-%COMP%]{background-color:#4b6cb7;color:#fff;font-size:1.5rem;text-align:center;padding:1rem;border-radius:10px 10px 0 0}ion-card-title[_ngcontent-%COMP%]{font-weight:700}ion-item[_ngcontent-%COMP%]{margin-bottom:1rem}ion-label[_ngcontent-%COMP%]{color:#01109c;font-weight:700}ion-input[_ngcontent-%COMP%]{background-color:#fff;border-radius:5px;color:#000}ion-button[_ngcontent-%COMP%]{color:#fff;border-radius:5px;font-size:1rem;padding:.8rem;margin-top:1rem}ion-button.custom-button[_ngcontent-%COMP%]{position:absolute;bottom:50px;left:50%;transform:translate(-50%)}footer[_ngcontent-%COMP%]{margin-top:2rem}ion-footer[_ngcontent-%COMP%]{background-color:#01109c;padding:10px;color:#fff}"]}),i})()}];let b=(()=>{var o;class i{}return(o=i).\u0275fac=function(e){return new(e||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[u.iI.forChild(p),u.iI]}),i})(),h=(()=>{var o;class i{}return(o=i).\u0275fac=function(e){return new(e||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[m.MD,c.YN,t.bv,b]}),i})()}}]);