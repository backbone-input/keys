!function(e,t,n,i){var s=n.View.prototype.delegateEvents,o=n.View.prototype.undelegateEvents,r="undefined"!=typeof i&&"undefined"!=typeof i.View,d=r?i.View:n.View,h={backspace:8,tab:9,enter:13,space:32,shift:16,ctrl:17,alt:18,meta:91,caps_lock:20,esc:27,num_lock:144,page_up:33,page_down:34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,"delete":46,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123};t.each({options:"alt","return":"enter"},function(e,t){h[t]=h[e]});var u=d.prototype.params||new n.Model;u.set({keys:{}});var a=d.extend({params:u,bindKeysOn:"keydown",bindKeysScoped:!1,bindTo:null,_keyEventBindings:null,delegateEvents:function(){return s.apply(this,Array.prototype.slice.apply(arguments)),this.delegateKeys(),this},undelegateEvents:function(){return this.undelegateKeys(),o.apply(this,arguments),this},delegateKeys:function(e){return this.undelegateKeys(),this.bindTo||(this.bindTo=this.bindKeysScoped||"undefined"==typeof $?this.$el:$(document)),this.bindTo.on(this.bindKeysOn+".delegateKeys"+this.cid,t.bind(this.triggerKey,this)),e=e||this.keys,e&&t.each(e,function(e,t){this.keyOn(t,e)},this),this},undelegateKeys:function(){return this._keyEventBindings={},this.bindTo&&this.bindTo.off(this.bindKeysOn+".delegateKeys"+this.cid),this},keyName:function(e){var t;for(t in h)if(h[t]===e)return t;return String.fromCharCode(e)},triggerKey:function(e){var n;return t.isObject(e)?n=e.which:t.isString(e)?n=f(e):t.isNumber(e)&&(n=e),t(this._keyEventBindings[n]).each(function(n){var i=!0;n.modifiers&&(i=t(n.modifiers).all(function(t){return e[t+"Key"]===!0})),i&&n.method(e,n.key)}),this},keyOn:function(e,n){e=e.split(" ");{if(!(e.length>1)){e=e.pop().toLowerCase();var i=e.split("+");e=i.shift();var s=this.params.get("keys");s[e]=!0,this.params.set({keys:s});var o=f(e);return this._keyEventBindings.hasOwnProperty(o)||(this._keyEventBindings[o]=[]),t.isFunction(n)||(n=this[n]),this._keyEventBindings[o].push({key:e,modifiers:i||!1,method:t.bind(n,this)}),this}for(var r=e.length;r--;)this.keyOn(e[r],n)}},keyOff:function(e,n){if(n=n||!1,null===e)return this._keyEventBindings={},this;var i=this.params.get("keys");delete i[e],this.params.set({keys:i});var s=f(e);return t.isFunction(n)||(n=this[n]),n?(this._keyEventBindings[s]=t.filter(this._keyEventBindings[s],function(e){return e.method===n}),this):(this._keyEventBindings[s]=[],this)}}),f=function(e){return 1===e.length?e.toUpperCase().charCodeAt(0):h[e]};t.isUndefined(n.Input)&&(n.Input={}),n.Input.Keys=a,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=a:"function"==typeof define&&define.amd&&define([],function(){return a}),"object"==typeof window&&"object"==typeof window.document&&(r?(i.View=a,i.Input=i.Input||{},i.Input.Keys=n.Input.Keys,window.APP=i):n.View=a,window.Backbone=n)}(this.window,this._,this.Backbone,this.APP);