!function(){var e={79:function(e){function t(){this.id=0}t.prototype.process=function(e){e.target.id=e.target.id||"slapform-"+this.id++;var t=Manager.dom(),r={},a="#"+e.target.id,s=e.target.dataset.slapType||"form",i=e.target.getAttribute("action");u(!0);var o;t.select(a+" input, "+a+" select, "+a+" textarea").each((function(e,s){var i=t.select(e),n=i.getAttribute("type"),l=i.getAttribute("name"),u=i.getAttribute("required");u=!(null==u),r[l]="checkbox"==n||"radio"==n?t.select(a+" *[name='"+l+"']").getValue():i.getValue();var d="checkbox"==n?(r[l]||[])[0]:r[l];if(o=!u||u&&!!d,console.log(l,r[l],"required = "+u,"pass = "+o),!o)return c(new Error("Please fill out all of the required fields.")),!1})),r._source="ultimate-jekyll",r._version="",r._referrer=window.location.href;try{var n=firebase.auth().currentUser;r.uid=n.uid,r.email||r.slap_replyto||(r.slap_replyto=n.email)}catch(e){}if(Manager.log(r),o)if("form"===s){var l=new URL(i);Object.keys(r).forEach(((e,t)=>{l.searchParams.set(e,r[e])})),window.location.href=l.toString()}else fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((function(e){c("success")})).catch((function(e){c(e),u(!1)}));else u(!1);function c(r,a){var s=t.select(e.target.getElementsByClassName("slapform-error")[0]),i=t.select(e.target.getElementsByClassName("slapform-success")[0]);s.setAttribute("hidden",!0),i.setAttribute("hidden",!0),r instanceof Error?s.removeAttribute("hidden").setInnerHTML(r):"success"===r&&i.removeAttribute("hidden").setInnerHTML(a||"Success! Please allow a few business days for our team to get back to you.")}function u(e){Manager.log("setting disalbed = ",e);var r=t.select(a+" button[type='submit']");e?r.setAttribute("disabled",e):r.removeAttribute("disabled")}},e.exports=t}},t={};(function r(a){var s=t[a];if(void 0!==s)return s.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,r),i.exports})(79)}();