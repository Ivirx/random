(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}})();const l=document.querySelector("#number"),d=document.querySelector("#start"),m=document.querySelector("#end"),g=document.querySelector("#inputs"),S=document.querySelector("#submit"),b=document.querySelector("#all-random");let a=0;const u=(n,o)=>{const t=Math.floor(Math.random()*(o-n+1))+n;let r=Math.abs(Math.floor((t-Number(l.innerText))/30));r<4&&t-Number(l.innerText)<60&&(r=2),clearInterval(a);let e;a=setInterval(()=>{if(e=Number(l.innerText),e<t){if(e+r>t){l.innerText=String(t);return}l.innerText=String(e+r)}if(e>t){if(e-r<t){l.innerText=String(t);return}l.innerText=String(e-r)}e===t&&clearInterval(a)},25)},p=(n,o)=>{localStorage.setItem("startingValue",n.toString()),localStorage.setItem("endingValue",o.toString())},s=(n,o)=>{let t=n,r=o;if(t>r){let e=t;t=r,r=e}return d.value=t.toString(),m.value=r.toString(),[t,r]},f=()=>{const[n,o]=s(Number(d.value),Number(m.value));p(n,o),u(n,o)};g.onsubmit=n=>{n.preventDefault(),f()};S.onclick=f;b.onclick=()=>{const[n,o]=s(Math.floor(Math.random()*100),Math.floor(Math.random()*100));setTimeout(()=>u(n,o),150)};window.onload=()=>{let n=localStorage.getItem("startingValue")||"0",o=localStorage.getItem("endingValue")||"99";l.innerText="0";const[t,r]=s(Number(n),Number(o));setTimeout(()=>u(t,r),550)};
