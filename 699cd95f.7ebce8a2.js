(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{67:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(2),a=n(6),i=(n(0),n(87)),o={title:"createKeyedSignal()",sidebar_label:"createKeyedSignal()"},c={unversionedId:"api/utils/createKeyedSignal",id:"api/utils/createKeyedSignal",isDocsHomePage:!1,title:"createKeyedSignal()",description:"Creates a Signal grouped by a key. Essentially splits the producer and consumer",source:"@site/docs/api/utils/createKeyedSignal.md",slug:"/api/utils/createKeyedSignal",permalink:"/docs/api/utils/createKeyedSignal",editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/utils/createKeyedSignal.md",version:"current",sidebar_label:"createKeyedSignal()",sidebar:"someSidebar",previous:{title:"createSignal()",permalink:"/docs/api/utils/createSignal"},next:{title:"mergeWithKey(inputObject)",permalink:"/docs/api/utils/mergeWithKey"}},l=[{value:"See also",id:"see-also",children:[]}],p={rightToc:l};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Creates a Signal grouped by a key. Essentially splits the producer and consumer\nof a Subject for each key."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"export function createKeyedSignal<A extends unknown[], T>(\n  keySelector?: (signal: T) => K,\n  mapper?: (...args: A) => T,\n): [(key: K) => GroupedObservable<K, T>, (...args: A) => void]\n")),Object(i.b)("h4",{id:"arguments"},"Arguments"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"keySelector?"),": (Optional) A function that extracts the key from the emitted value.\nIf omitted, it will use the first argument as the key.")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("p",{parentName:"li"},Object(i.b)("inlineCode",{parentName:"p"},"mapper?"),": (Optional) A function for mapping the arguments of the emitter function into\nthe value of the Observable."),Object(i.b)("p",{parentName:"li"},"  Defaults to ",Object(i.b)("inlineCode",{parentName:"p"},"(v: Payload) => v")))),Object(i.b)("h4",{id:"returns"},"Returns"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"[1, 2]"),":"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"A function that returns the observable for a given key")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"The emitter function"))),Object(i.b)("h2",{id:"see-also"},"See also"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"createSignal"}),Object(i.b)("inlineCode",{parentName:"a"},"createSignal()")))))}u.isMDXComponent=!0},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),u=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=u(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=u(n),d=r,m=s["".concat(o,".").concat(d)]||s[d]||b[d]||i;return n?a.a.createElement(m,c(c({ref:t},p),{},{components:n})):a.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var p=2;p<i;p++)o[p]=n[p];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);