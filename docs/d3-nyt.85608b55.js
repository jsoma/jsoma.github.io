parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hU46":[function(require,module,exports) {
!function(){var t=40,e=30,n=20,r=200,a=700-r-e,c=1500-t-n,o=d3.select("#chart").append("svg").attr("width",a+r+e).attr("height",c+t+n).append("g").attr("transform","translate("+r+","+t+")"),i=d3.scaleLinear().domain([0,.6]).range([0,a]).clamp(!0),l=d3.scaleThreshold().domain([.1,.2,.3,.4,.5]).range(["#b35806","#f1a340","#fee0b6","#d8daeb","#998ec3","#542788"].reverse()),s=["Utilities","Information technology","Industrials","Telecom","Health care","Pharma","Consumer products","Materials","Financials","Retailers","Energy","Insurance"],f=d3.scalePoint().domain(s).range([0,c]),u=d3.scaleSqrt().domain([0,1e5]).range([0,10]),d=d3.forceX(function(t){return i(t.taxes/t.earnings)}).strength(2),g=d3.forceY(function(t){return f(t.sector)}),h=d3.forceY(c/2),p=d3.forceCollide(function(t){return u(t.capitalization)+1}),x=d3.forceSimulation().force("overlap",p).force("y",g).force("x",d);d3.tsv("companies.tsv").then(function(t){console.log("I'm here!!!!"),t.forEach(function(t){t.x=i(t.taxes/t.earnings),t.y=c/2}),o.selectAll("text").data(s).join("text").attr("text-anchor","end").attr("y",function(t){return f(t)}).attr("dx",-10).text(function(t){return t}),o.selectAll("circle").data(t).join("circle").attr("r",function(t){return u(t.capitalization)}).attr("cx",function(t){return i(t.taxes/t.earnings)}).attr("fill",function(t){return l(t.taxes/t.earnings)}).attr("cy",function(t){return f(t.sector)}).attr("stroke","#333333"),d3.select("#combined").on("click",function(){x.force("y",h),x.alpha(.1).alphaTarget(.1).restart(),o.selectAll("text").transition().style("opacity",0)}),d3.select("#sectors").on("click",function(){x.force("y",g),x.alpha(.1).alphaTarget(.1).restart(),o.selectAll("text").transition().style("opacity",1)}),x.nodes(t).on("tick",function(){console.log("tick tick tick"),o.selectAll("circle").attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y})})})}();
},{}]},{},["hU46"], null)
//# sourceMappingURL=/d3-nyt.85608b55.js.map