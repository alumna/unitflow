class e{constructor(e={}){this.unit={},this.flow={},this.state=e}async run(...e){const t=[],n=this.prepare(e);n.flows.reverse();for(let e=n.flows.length-1;e>=0;e--){const s=new Promise((t=>this.link_and_start(n.flows[e],n,t)));t.push(s)}return Promise.all(t)}prepare(e){let t=e.pop();const n={};return"string"==typeof t?(e.push(t),t={}):this.dependents(t,n),{flows:e,dependencies:t,dependents:n,execution:{}}}dependents(e,t){for(let[n,s]of Object.entries(e))for(let e=s.length-1;e>=0;e--)t[s[e]]||(t[s[e]]=[]),t[s[e]].push(n)}link_and_start(e,t,n){const s=this.flow[e],i=s.length,o={},r=this.state;for(let c=i-1;c>=0;c--){const d=this.unit[s[c]].bind(this),p=c==i-1?n:o[c+1],h=e+":"+s[c],l=async()=>d(r,p,n);o[c]=()=>this.wait_or_run(h,l,t)}o[0]()}wait_or_run(e,t,n,s=!1){if(!s&&!this.dependencies_completed(e,n))return n.execution[e]=()=>this.wait_or_run(e,t,n,!0);n.execution[e]=!0,t(),this.check_dependents(e,n)}dependencies_completed(e,t){const n=t.dependencies[e];return!n||n.every((e=>!0===t.execution[e]))}check_dependents(e,t){const n=t.dependents[e];if(n)for(let e=n.length-1;e>=0;e--){const s=n[e];"function"==typeof t.execution[s]&&(this.dependencies_completed(s,t)&&t.execution[s]())}}}export{e as Unitflow};
