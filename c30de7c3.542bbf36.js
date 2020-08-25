(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{158:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var a=n(2),s=n(9),o=(n(0),n(171)),r={id:"coreConcepts",title:"Core Concepts",sidebar_label:"Core Concepts"},i={id:"coreConcepts",isDocsHomePage:!1,title:"Core Concepts",description:"Push vs Pull",source:"@site/docs/coreConcepts.md",permalink:"/react-rxjs.org/docs/coreConcepts",editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/coreConcepts.md",sidebar_label:"Core Concepts",sidebar:"someSidebar",previous:{title:"Motivation",permalink:"/react-rxjs.org/docs/motivation"},next:{title:"Getting Started",permalink:"/react-rxjs.org/docs/"}},l=[{value:"Push vs Pull",id:"push-vs-pull",children:[]},{value:"Streams as state",id:"streams-as-state",children:[]},{value:"Composing streams",id:"composing-streams",children:[]},{value:"Entry points",id:"entry-points",children:[]},{value:"Suspense",id:"suspense",children:[]}],c={rightToc:l};function p(e){var t=e.components,n=Object(s.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"push-vs-pull"},"Push vs Pull"),Object(o.b)("p",null,"Historically, React uses a ",Object(o.b)("strong",{parentName:"p"},"pull"),"-based architecture. This means that when react needs to re-render, it will call the render function of every affected component, which will access the state at that moment and return a new representation of the UI, which React will reconcile with the previous one to propagate the changes to the DOM."),Object(o.b)("p",null,"This kind of behavior is called ",Object(o.b)("em",{parentName:"p"},"pull")," because the consumer of the state (in this case, React), is the one that ",Object(o.b)("em",{parentName:"p"},"requests")," the new value."),Object(o.b)("p",null,"On the other hand, RxJS uses a ",Object(o.b)("strong",{parentName:"p"},"push"),"-based approach, where you declaratively define streams and their relationships, and RxJS will propagate every change from one stream to the next one."),Object(o.b)("p",null,"This is called ",Object(o.b)("em",{parentName:"p"},"push")," because now the producer of the state is the responsible of ",Object(o.b)("em",{parentName:"p"},"handing")," the new value over to those that depend on it. This has a positive effect: only those entities that depend on a value that has changed will update, without needing to make comparisons with the previous value to catch what parts have changed."),Object(o.b)("p",null,"This in turn not only improves performance, but also makes the state management more declarative, and in a way that can be read top-to-bottom."),Object(o.b)("p",null,"React-RxJS bridges the gap between these two behaviors, making it possible to declare a ",Object(o.b)("em",{parentName:"p"},"push")," based global state that works flawlessly with React."),Object(o.b)("h2",{id:"streams-as-state"},"Streams as state"),Object(o.b)("p",null,"RxJS streams are used to represent events or changing values over time. They have an important property: Because of their declarative nature, they don't execute the effect until someone subscribes to it."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { Observable } from "rxjs";\n\nconst first5Numbers = new Observable((obs) => {\n  console.log("hello!");\n  for (let i = 0; i < 5; i++) obs.next(i);\n  obs.complete();\n});\n// Logs nothing\n\nfirst5Numbers.subscribe((n) => {\n  console.log(n);\n});\n// Logs "hello!" followed by 0 1 2 3 4\n')),Object(o.b)("p",null,"Not only that, but even if the observable doesn't complete, for every new subscription it will run the side effect again."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs";\nimport { take } from "rxjs/operators";\n\nconst first5SpacedNumbers = interval(1000).pipe(take(5));\n\nfirst5SpacedNumbers.subscribe((v) => console.log("A", v));\n// Will start logging A1... A2...\n\nsetTimeout(() => {\n  first5SpacedNumbers.subscribe((v) => console.log("B", v));\n}, 2000);\n// Will continue with B1... A3... B2... A4\n')),Object(o.b)("p",null,"This in a way makes might make sense because you might want to have a different state for each subscription, however, this doesn't play nicely with React. You might have different components, and they all need to receive the same value. Moreover, if that value dispatches a call to a service, you'd only want to make one single call to be shared among all of the components."),Object(o.b)("p",null,"RxJS has an operator that helps with this, ",Object(o.b)("inlineCode",{parentName:"p"},"share"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs";\nimport { take, share } from "rxjs/operators";\n\nconst first5SpacedNumbers = interval(1000).pipe(take(5), share());\n\nfirst5SpacedNumbers.subscribe((v) => console.log("A", v));\n// Will start logging A1... A2...\n\nsetTimeout(() => {\n  first5SpacedNumbers.subscribe((v) => console.log("B", v));\n}, 2000);\n// Will continue with A3 B3... A4 B4...\n')),Object(o.b)("p",null,"The technical term for this is that ",Object(o.b)("inlineCode",{parentName:"p"},"share")," ",Object(o.b)("em",{parentName:"p"},"multicasts")," the stream, so that it only makes one subscription to the source, and will propagate every change to all the subscriptions of the shared stream."),Object(o.b)("p",null,"However, this now has a different issue for React's use case: You might have noticed in the last snippet that even though ",Object(o.b)("inlineCode",{parentName:"p"},'"B"')," subscribed when the last value of the stream was ",Object(o.b)("inlineCode",{parentName:"p"},"2"),", it didn't receive that value. And it makes sense because as the change was emitted in the past, it subscribed late and it won't receive it straight away."),Object(o.b)("p",null,"React needs access to the latest value emitted from the stream. It can't wait until the state changes, and here's when React-RxJS comes into play."),Object(o.b)("p",null,"RxJS has another operator ",Object(o.b)("inlineCode",{parentName:"p"},"shareReplay")," which would cover this issue. However, it doesn't play nicely with the way that React works, because when the source completes it will keep the last values in memory indefinitely, and replay them back when a new subscriber comes without re-subscribing to the source. This not only exposes a possible memory leak, but also makes it impossible to replay e.g. a fetch call once it has already resolved."),Object(o.b)("p",null,"So that's why React-RxJS exports ",Object(o.b)("inlineCode",{parentName:"p"},"shareLatest"),". In essence, it addresses the issue of sharing the state between many components and keeping always the latest value, but without the additional issues that ",Object(o.b)("inlineCode",{parentName:"p"},"shareReplay")," exposes for this particular use case. So now our example would become:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs";\nimport { take } from "rxjs/operators";\nimport { shareLatest } from "@react-rxjs/core";\n\nconst first5SpacedNumbers = interval(1000).pipe(take(5), shareLatest());\n\nfirst5SpacedNumbers.subscribe((v) => console.log("A", v));\n// Will start logging A1... A2...\n\nsetTimeout(() => {\n  first5SpacedNumbers.subscribe((v) => console.log("B", v));\n}, 2000);\n// Will continue with B2... A3 B3... A4 B4...\n')),Object(o.b)("p",null,"Now this stream would be ready to be consumed by React. ",Object(o.b)("inlineCode",{parentName:"p"},"shareLatest")," in a way turns a stream into a state entity. Something that owns a current value, while allowing others to subscribe for future changes."),Object(o.b)("p",null,"The main function of React-RxJS, ",Object(o.b)("inlineCode",{parentName:"p"},"bind"),", uses this operator on every stream, so in general, you shouldn't need to use ",Object(o.b)("inlineCode",{parentName:"p"},"shareLatest")," directly. At the same time, ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," does more to fully integrate RxJS with react (such as leveraging suspense, and a few performance optimizations), so it's the function that you'd call to get a hook that will receive that value."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs";\nimport { take } from "rxjs/operators";\nimport { bind } from "@react-rxjs/core";\n\nconst [useFirst5SpacedNumbers] = bind(interval(1000).pipe(take(5)));\n')),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"useFirst5SpacedNumbers")," is a hook that will return just a number (ready to be used in a component), which is shared for all components."),Object(o.b)("p",null,"Something important to note, though, is that the subscription will happen as soon as there's a subscriber (duh) and it will be alive until there are no more subscribers. This means that if all of the components that subscribe to this stream unmount for a while, the latest value will be forgotten, and it will restart the stream when there's a new subscription."),Object(o.b)("p",null,"If you want to persist that value make sure to keep a subscription alive in the relevant bit of your component tree with ",Object(o.b)("inlineCode",{parentName:"p"},"<Subscribe source$={stream} />")," or ",Object(o.b)("inlineCode",{parentName:"p"},"useSubscribe(stream)")," from ",Object(o.b)("inlineCode",{parentName:"p"},"@react-rxjs/utils")),Object(o.b)("h2",{id:"composing-streams"},"Composing streams"),Object(o.b)("p",null,"You might have noticed that ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," returns the hook inside a tuple. This is because ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," also exposes the stream with ",Object(o.b)("inlineCode",{parentName:"p"},"shareLatest")," applied so it can be easily composed."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs";\nimport { take } from "rxjs/operators";\nimport { bind } from "@react-rxjs/core";\n\nconst [useSeconds, second$] = bind(interval(1000));\n\nconst [useLatestNSeconds, latestNSeconds$] = bind((n: number) =>\n  second$.pipe(take(n))\n);\n')),Object(o.b)("p",null,"Composition is an important factor in RxJS streams. It's often recommended to break down streams into smaller chunks, that you can later compose into more complex interactions."),Object(o.b)("p",null,"Note that you might not need to use ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," on every observable. ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," only makes sense when you want to represent a value which you'd like to share with other streams, and if you need to access that stream from React. Think of ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," as a way of turning a stream into a state."),Object(o.b)("h2",{id:"entry-points"},"Entry points"),Object(o.b)("p",null,"Now, where does data for the state come from? Probably the first example that we might think in RxJS is something that fetches some data:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { ajax } from "rxjs/ajax";\nimport { bind } from "@react-rxjs/core";\n\nconst [usePost, post$] = bind((id: string) => ajax.getJSON("/posts/" + id));\n')),Object(o.b)("p",null,"And of course, this will work: Any component can use ",Object(o.b)("inlineCode",{parentName:"p"},"usePost")," to fetch the post of a specific id."),Object(o.b)("p",null,"However, there are some times where we need to use data coming directly from the user. This is where RxJS ",Object(o.b)("inlineCode",{parentName:"p"},"Subject"),"s come into play."),Object(o.b)("p",null,"With a ",Object(o.b)("inlineCode",{parentName:"p"},"Subject")," you can create an entry point for your streams. For example, in a local todos app, you can define your state as:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { Subject } from "rxjs";\nimport { scan, startWith } from "rxjs/operators";\nimport { bind } from "@react-rxjs/core";\n\nconst newTodos = new Subject();\nconst postNewTodo = (todo) => newTodos.next(todo);\nconst [useTodoList, todoList$] = bind(\n  newTodos.pipe(\n    scan((acc, todo) => [...acc, todo], []),\n    startWith([])\n  )\n);\n')),Object(o.b)("p",null,'And now the "TodoForm" component can directly call ',Object(o.b)("inlineCode",{parentName:"p"},"postNewTodo")," whenever the user creates a todo, and the change will be propagated down to the list."),Object(o.b)("p",null,"Keep in mind that ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," doesn't do magic. If no one is subscribed to ",Object(o.b)("inlineCode",{parentName:"p"},"todoList$")," (not even from the hook) then that stream won't be listening for changes on ",Object(o.b)("inlineCode",{parentName:"p"},"newTodos")," subject, and if a subscription happens late, the subject won't replay the todos created so they would get lost."),Object(o.b)("p",null,"Remember, if you have a case like this (where you are pushing a Subject but no one is subscribed to those changes), make sure you have an active subscription to the stream by using ",Object(o.b)("inlineCode",{parentName:"p"},"<Subscribe source$={stream} />")," or ",Object(o.b)("inlineCode",{parentName:"p"},"useSubscribe(stream)")," from ",Object(o.b)("inlineCode",{parentName:"p"},"@react-rxjs/utils"),". This way, ",Object(o.b)("inlineCode",{parentName:"p"},"todoList$")," will update when a new value is pushed to the subject, and the result will be replayed for every new subscriber that comes later on."),Object(o.b)("h2",{id:"suspense"},"Suspense"),Object(o.b)("p",null,"In an earlier example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { ajax } from "rxjs/ajax";\nimport { bind } from "@react-rxjs/core";\n\nconst [usePost, post$] = bind((id: string) => ajax.getJSON("/posts/" + id));\n')),Object(o.b)("p",null,"You might be wondering - how does this ",Object(o.b)("em",{parentName:"p"},"exactly")," work with React? If React is pull-based and it ",Object(o.b)("em",{parentName:"p"},"needs")," a value at the time it's re-rendering, this stream won't have a value until the ajax call is resolved."),Object(o.b)("p",null,"Well, React added a feature that makes it a bit less pull-based: Suspense. With Suspense, we can represent values that are not yet ready, and we can notify React when those values have been loaded."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"react-rxjs")," comes with full support with Suspense, and it treats it as a first-class citizen. This means that by default, using a hook from a stream that hasn't emitted any value will result in that hook suspending the Component."),Object(o.b)("p",null,"Note that for this to work properly, you need to have proper Suspense boundaries throughout your component tree. If you don't want to use Suspense just yet the solution is simple: Make sure that the stream always has a value. In our example, if we want to describe that the post is missing with a ",Object(o.b)("inlineCode",{parentName:"p"},"null"),", it's as simple as:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { ajax } from "rxjs/ajax";\nimport { startWith } from "rxjs/operators";\nimport { bind } from "@react-rxjs/core";\n\nconst [usePost, post$] = bind((id: string) =>\n  ajax.getJSON("/posts/" + id).pipe(startWith(null))\n);\n')),Object(o.b)("p",null,"Now ",Object(o.b)("inlineCode",{parentName:"p"},"usePost")," will return ",Object(o.b)("inlineCode",{parentName:"p"},"null")," while it's fetching data (so that we can manually handle that) instead of suspending the component, and when the ajax call is resolved it will return the result of that call."),Object(o.b)("p",null,"Back to using React's Suspense, there are more ways to suspend a component with ",Object(o.b)("inlineCode",{parentName:"p"},"react-rxjs")," than in the initial call."),Object(o.b)("p",null,"You can suspend any component that depends on a stream by emitting ",Object(o.b)("inlineCode",{parentName:"p"},"SUSPENSE")," from ",Object(o.b)("inlineCode",{parentName:"p"},"@rxjs/core"),". For instance, that can come in handy to suspend a component that has already fetched some data from a service, but that we will start refreshing because it's stale."),Object(o.b)("p",null,"There's something to keep in mind though: React Suspense works in series within a Component. Imagine this example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),"const UserProfile = () => {\n  const details = useUserDetails();\n  const posts = useUserPosts();\n\n  return (\n    <div>\n      <UserDetails details={details} />\n      <UserPosts posts={posts} />\n    </div>\n  );\n};\n")),Object(o.b)("p",null,"In this case, because of the way that Suspense works, these fetches will happen in sequential order. This means that initially ",Object(o.b)("inlineCode",{parentName:"p"},"useUserDetails")," will subscribe to ",Object(o.b)("inlineCode",{parentName:"p"},"userDetails$"),", which will start fetching data and suspend the component. When the fetch call resolves, ",Object(o.b)("inlineCode",{parentName:"p"},"useUserDetails"),' will "resume" the component, and ',Object(o.b)("inlineCode",{parentName:"p"},"useUserPosts")," will run, subscribing and fetching the data, and suspending the component yet again."),Object(o.b)("p",null,"There are two solutions to this. One is to build a stream that merges both sub-streams:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"const [useUserDetailsAndPosts] = bind(combineLatest(userDetail$, userPosts$));\n")),Object(o.b)("p",null,"Now ",Object(o.b)("inlineCode",{parentName:"p"},"useUserDetailsAndPosts")," will start fetching both resources and suspend the component just once for both of them."),Object(o.b)("p",null,"But in this particular example, it would make more sense a different solution: We can move the usage of those two hooks down into ",Object(o.b)("inlineCode",{parentName:"p"},"<UserDetails />")," and ",Object(o.b)("inlineCode",{parentName:"p"},"<UserPosts />"),". This way, react will render both components, and both of them will suspend at the same time, while also subscribing to both streams simultaneously."))}p.isMDXComponent=!0},171:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var a=n(0),s=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var c=s.a.createContext({}),p=function(e){var t=s.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},b=function(e){var t=p(e.components);return s.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return s.a.createElement(s.a.Fragment,{},t)}},h=s.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,r=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),b=p(n),h=a,m=b["".concat(r,".").concat(h)]||b[h]||u[h]||o;return n?s.a.createElement(m,i(i({ref:t},c),{},{components:n})):s.a.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=h;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,r[1]=i;for(var c=2;c<o;c++)r[c]=n[c];return s.a.createElement.apply(null,r)}return s.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);