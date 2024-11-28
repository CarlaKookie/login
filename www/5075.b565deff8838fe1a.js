"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5075],{5075:(_,g,a)=>{a.r(g),a.d(g,{HomePageModule:()=>M});var d=a(177),t=a(791),i=a(4341),m=a(8986),f=a(467),e=a(3953),p=a(671),P=a(369);function v(n,c){if(1&n){const s=e.RV6();e.j41(0,"ion-icon",19),e.bIt("click",function(){e.eBV(s);const r=e.XpG();return e.Njj(r.changeStatus(!1))}),e.k0s()}}function C(n,c){if(1&n){const s=e.RV6();e.j41(0,"ion-icon",20),e.bIt("click",function(){e.eBV(s);const r=e.XpG();return e.Njj(r.changeStatus(!0))}),e.k0s()}}const k=[{path:"",component:(()=>{var n;class c{constructor(o,r,u,l,h){this.router=o,this.alertController=r,this.authService=u,this.storage=l,this.fb=h,this.recuerdame=!0,this.initStorage(),this.loginForm=this.fb.group({nombreUsuario:["",i.k0.required],contrasena:["",i.k0.required]})}changeStatus(o){this.recuerdame=o}initStorage(){var o=this;return(0,f.A)(function*(){yield o.storage.create()})()}ionViewWillEnter(){this.loginForm.reset(),this.authService.isLoggedIn()||(this.storage.remove("nombre"),this.storage.remove("correo"))}navigateToInicio(){var o=this;return(0,f.A)(function*(){if(o.loginForm.invalid)yield(yield o.alertController.create({header:"Error",message:"Por favor, ingrese su nombre de usuario y/o contrase\xf1a.",buttons:["OK"]})).present();else{const{nombreUsuario:r,contrasena:u}=o.loginForm.value,l=o.authService.login(r,u);l?(yield o.storage.set("nombre",l.nombre),yield o.storage.set("correo",l.correo),console.log("Nombre guardado:",l.nombre),o.router.navigate("profesor"===l.tipo?["/profesor"]:["/inicio"])):yield(yield o.alertController.create({header:"Error",message:"Nombre de usuario o contrase\xf1a incorrectos",buttons:["OK"]})).present()}})()}navigateToRestauracion(){this.router.navigate(["/restauracion"])}}return(n=c).\u0275fac=function(o){return new(o||n)(e.rXU(m.Ix),e.rXU(t.hG),e.rXU(p.u),e.rXU(P.w),e.rXU(i.ok))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-home"]],decls:29,vars:4,consts:[["color","fulldark",3,"fullscreen"],[1,"top-section"],[1,"logo-container"],["src","assets/Images/logo.png","alt","Logo"],[3,"ngSubmit","formGroup"],["lines","none",1,"ion-margin"],["color","white",1,"ion-margin-vertical"],["name","person-outline","slot","start","color","fulldark"],["formControlName","nombreUsuario","placeholder","Usuario","type","text","required",""],["name","lock-closed-outline","slot","start","color","fulldark"],["formControlName","contrasena","placeholder","Contrase\xf1a","type","password","required",""],[1,"ion-margin-bottom"],["size","6",1,"alignItems"],["name","checkmark-circle-outline","color","success",3,"click",4,"ngIf"],["name","close-circle-outline","color","danger",3,"click",4,"ngIf"],["color","success","expand","block","size","large","type","submit",1,"custom-button"],[1,"ion-text-center"],["color","success",3,"click"],["color","fulldark",1,"ion-text-center"],["name","checkmark-circle-outline","color","success",3,"click"],["name","close-circle-outline","color","danger",3,"click"]],template:function(o,r){1&o&&(e.j41(0,"ion-content",0)(1,"div",1)(2,"div",2),e.nrm(3,"ion-img",3),e.k0s()(),e.j41(4,"form",4),e.bIt("ngSubmit",function(){return r.navigateToInicio()}),e.j41(5,"ion-list",5)(6,"ion-item",6),e.nrm(7,"ion-icon",7)(8,"ion-input",8),e.k0s(),e.j41(9,"ion-item",6),e.nrm(10,"ion-icon",9)(11,"ion-input",10),e.k0s(),e.j41(12,"ion-row",11)(13,"ion-col",12),e.DNE(14,v,1,0,"ion-icon",13)(15,C,1,0,"ion-icon",14),e.j41(16,"ion-note"),e.EFF(17,"Recu\xe9rdame"),e.k0s()()(),e.j41(18,"ion-button",15),e.EFF(19,"Ingresar"),e.k0s(),e.j41(20,"ion-text",16)(21,"p")(22,"ion-note"),e.EFF(23,"\xbfOlvidaste tu contrase\xf1a? "),e.k0s(),e.j41(24,"ion-text",17),e.bIt("click",function(){return r.navigateToRestauracion()}),e.EFF(25,"Recup\xe9rala aqu\xed"),e.k0s()()()()()(),e.j41(26,"ion-footer"),e.nrm(27,"ion-toolbar",18)(28,"ion-note"),e.k0s()),2&o&&(e.Y8G("fullscreen",!0),e.R7$(4),e.Y8G("formGroup",r.loginForm),e.R7$(10),e.Y8G("ngIf",r.recuerdame),e.R7$(),e.Y8G("ngIf",!r.recuerdame))},dependencies:[d.bT,i.qT,i.BC,i.cb,i.YS,i.j4,i.JD,t.Jm,t.hU,t.W9,t.M0,t.iq,t.KW,t.$w,t.uz,t.nf,t.JI,t.ln,t.IO,t.ai,t.Gw],styles:["ion-content[_ngcontent-%COMP%]{--background: transparent}.top-section[_ngcontent-%COMP%]{height:33vh;background-color:#01109c;display:flex;justify-content:center;align-items:center}.logo-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;width:100%}.logo[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_bounce 2s infinite}@keyframes _ngcontent-%COMP%_bounce{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}ion-list[_ngcontent-%COMP%]{background:transparent;transform:translateY(10vh)}ion-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]{margin-bottom:5vh;letter-spacing:3px}ion-list[_ngcontent-%COMP%]   ion-list-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-weight:700;font-size:3rem;font-family:Cambria,Cochin,Georgia,Times,Times New Roman,serif}ion-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.8rem;padding-top:1hv}.alignItems[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .alignItems[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%]{display:inline-block;vertical-align:middle}.alignItems[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin-right:1vw;font-size:1.1rem}ion-img[_ngcontent-%COMP%]{max-width:100%;height:auto}"]}),c})()}];let b=(()=>{var n;class c{}return(n=c).\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[m.iI.forChild(k),m.iI]}),c})(),M=(()=>{var n;class c{}return(n=c).\u0275fac=function(o){return new(o||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[d.MD,i.YN,i.X1,t.bv,b]}),c})()}}]);