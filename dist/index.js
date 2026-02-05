var r0=Object.create;var{getPrototypeOf:e0,defineProperty:P0,getOwnPropertyNames:$1}=Object;var H1=Object.prototype.hasOwnProperty;var w1=(M,z,V)=>{V=M!=null?r0(e0(M)):{};let q=z||!M||!M.__esModule?P0(V,"default",{value:M,enumerable:!0}):V;for(let Q of $1(M))if(!H1.call(q,Q))P0(q,Q,{get:()=>M[Q],enumerable:!0});return q};var W1=(M,z)=>()=>(z||M((z={exports:{}}).exports,z),z.exports);var N0=W1((z0)=>{(function(M){function z($){if($!==null)return Object.prototype.toString.call($)==="[object Array]";else return!1}function V($){if($!==null)return Object.prototype.toString.call($)==="[object Object]";else return!1}function q($,H){if($===H)return!0;var w=Object.prototype.toString.call($);if(w!==Object.prototype.toString.call(H))return!1;if(z($)===!0){if($.length!==H.length)return!1;for(var W=0;W<$.length;W++)if(q($[W],H[W])===!1)return!1;return!0}if(V($)===!0){var C={};for(var Z in $)if(hasOwnProperty.call($,Z)){if(q($[Z],H[Z])===!1)return!1;C[Z]=!0}for(var J in H)if(hasOwnProperty.call(H,J)){if(C[J]!==!0)return!1}return!0}return!1}function Q($){if($===""||$===!1||$===null)return!0;else if(z($)&&$.length===0)return!0;else if(V($)){for(var H in $)if($.hasOwnProperty(H))return!1;return!0}else return!1}function p($){var H=Object.keys($),w=[];for(var W=0;W<H.length;W++)w.push($[H[W]]);return w}function s($,H){var w={};for(var W in $)w[W]=$[W];for(var C in H)w[C]=H[C];return w}var M0;if(typeof String.prototype.trimLeft==="function")M0=function($){return $.trimLeft()};else M0=function($){return $.match(/^\s*(.*)/)[1]};var x=0,k=1,F=2,U=3,n=4,L0=5,P=6,X0=7,m=8,N=9,j0={0:"number",1:"any",2:"string",3:"array",4:"object",5:"boolean",6:"expression",7:"null",8:"Array<number>",9:"Array<string>"},I0="EOF",o="UnquotedIdentifier",E="QuotedIdentifier",h="Rbracket",R="Rparen",b="Comma",Y="Colon",r="Rbrace",i="Number",L="Current",g="Expref",l="Pipe",J0="Or",S0="And",e="EQ",$0="GT",H0="LT",w0="GTE",W0="LTE",C0="NE",y="Flatten",c="Star",A="Filter",d="Dot",V0="Not",t="Lbrace",u="Lbracket",T="Lparen",q0="Literal",B0={".":d,"*":c,",":b,":":Y,"{":t,"}":r,"]":h,"(":T,")":R,"@":L},g0={"<":!0,">":!0,"=":!0,"!":!0},l0={" ":!0,"\t":!0,"\n":!0};function A0($){return $>="a"&&$<="z"||$>="A"&&$<="Z"||$==="_"}function p0($){return $>="0"&&$<="9"||$==="-"}function d0($){return $>="a"&&$<="z"||$>="A"&&$<="Z"||$>="0"&&$<="9"||$==="_"}function Q0(){}Q0.prototype={tokenize:function($){var H=[];this._current=0;var w,W,C;while(this._current<$.length)if(A0($[this._current]))w=this._current,W=this._consumeUnquotedIdentifier($),H.push({type:o,value:W,start:w});else if(B0[$[this._current]]!==void 0)H.push({type:B0[$[this._current]],value:$[this._current],start:this._current}),this._current++;else if(p0($[this._current]))C=this._consumeNumber($),H.push(C);else if($[this._current]==="[")C=this._consumeLBracket($),H.push(C);else if($[this._current]==='"')w=this._current,W=this._consumeQuotedIdentifier($),H.push({type:E,value:W,start:w});else if($[this._current]==="'")w=this._current,W=this._consumeRawStringLiteral($),H.push({type:q0,value:W,start:w});else if($[this._current]==="`"){w=this._current;var Z=this._consumeLiteral($);H.push({type:q0,value:Z,start:w})}else if(g0[$[this._current]]!==void 0)H.push(this._consumeOperator($));else if(l0[$[this._current]]!==void 0)this._current++;else if($[this._current]==="&")if(w=this._current,this._current++,$[this._current]==="&")this._current++,H.push({type:S0,value:"&&",start:w});else H.push({type:g,value:"&",start:w});else if($[this._current]==="|")if(w=this._current,this._current++,$[this._current]==="|")this._current++,H.push({type:J0,value:"||",start:w});else H.push({type:l,value:"|",start:w});else{var J=Error("Unknown character:"+$[this._current]);throw J.name="LexerError",J}return H},_consumeUnquotedIdentifier:function($){var H=this._current;this._current++;while(this._current<$.length&&d0($[this._current]))this._current++;return $.slice(H,this._current)},_consumeQuotedIdentifier:function($){var H=this._current;this._current++;var w=$.length;while($[this._current]!=='"'&&this._current<w){var W=this._current;if($[W]==="\\"&&($[W+1]==="\\"||$[W+1]==='"'))W+=2;else W++;this._current=W}return this._current++,JSON.parse($.slice(H,this._current))},_consumeRawStringLiteral:function($){var H=this._current;this._current++;var w=$.length;while($[this._current]!=="'"&&this._current<w){var W=this._current;if($[W]==="\\"&&($[W+1]==="\\"||$[W+1]==="'"))W+=2;else W++;this._current=W}this._current++;var C=$.slice(H+1,this._current-1);return C.replace("\\'","'")},_consumeNumber:function($){var H=this._current;this._current++;var w=$.length;while(p0($[this._current])&&this._current<w)this._current++;var W=parseInt($.slice(H,this._current));return{type:i,value:W,start:H}},_consumeLBracket:function($){var H=this._current;if(this._current++,$[this._current]==="?")return this._current++,{type:A,value:"[?",start:H};else if($[this._current]==="]")return this._current++,{type:y,value:"[]",start:H};else return{type:u,value:"[",start:H}},_consumeOperator:function($){var H=this._current,w=$[H];if(this._current++,w==="!")if($[this._current]==="=")return this._current++,{type:C0,value:"!=",start:H};else return{type:V0,value:"!",start:H};else if(w==="<")if($[this._current]==="=")return this._current++,{type:W0,value:"<=",start:H};else return{type:H0,value:"<",start:H};else if(w===">")if($[this._current]==="=")return this._current++,{type:w0,value:">=",start:H};else return{type:$0,value:">",start:H};else if(w==="="){if($[this._current]==="=")return this._current++,{type:e,value:"==",start:H}}},_consumeLiteral:function($){this._current++;var H=this._current,w=$.length,W;while($[this._current]!=="`"&&this._current<w){var C=this._current;if($[C]==="\\"&&($[C+1]==="\\"||$[C+1]==="`"))C+=2;else C++;this._current=C}var Z=M0($.slice(H,this._current));if(Z=Z.replace("\\`","`"),this._looksLikeJSON(Z))W=JSON.parse(Z);else W=JSON.parse('"'+Z+'"');return this._current++,W},_looksLikeJSON:function($){var H='[{"',w=["true","false","null"],W="-0123456789";if($==="")return!1;else if(H.indexOf($[0])>=0)return!0;else if(w.indexOf($)>=0)return!0;else if(W.indexOf($[0])>=0)try{return JSON.parse($),!0}catch(C){return!1}else return!1}};var I={};I[I0]=0,I[o]=0,I[E]=0,I[h]=0,I[R]=0,I[b]=0,I[r]=0,I[i]=0,I[L]=0,I[g]=0,I[l]=1,I[J0]=2,I[S0]=3,I[e]=5,I[$0]=5,I[H0]=5,I[w0]=5,I[W0]=5,I[C0]=5,I[y]=9,I[c]=20,I[A]=21,I[d]=40,I[V0]=45,I[t]=50,I[u]=55,I[T]=60;function D0(){}D0.prototype={parse:function($){this._loadTokens($),this.index=0;var H=this.expression(0);if(this._lookahead(0)!==I0){var w=this._lookaheadToken(0),W=Error("Unexpected token type: "+w.type+", value: "+w.value);throw W.name="ParserError",W}return H},_loadTokens:function($){var H=new Q0,w=H.tokenize($);w.push({type:I0,value:"",start:$.length}),this.tokens=w},expression:function($){var H=this._lookaheadToken(0);this._advance();var w=this.nud(H),W=this._lookahead(0);while($<I[W])this._advance(),w=this.led(W,w),W=this._lookahead(0);return w},_lookahead:function($){return this.tokens[this.index+$].type},_lookaheadToken:function($){return this.tokens[this.index+$]},_advance:function(){this.index++},nud:function($){var H,w,W;switch($.type){case q0:return{type:"Literal",value:$.value};case o:return{type:"Field",name:$.value};case E:var C={type:"Field",name:$.value};if(this._lookahead(0)===T)throw Error("Quoted identifier not allowed for function names.");return C;case V0:return w=this.expression(I.Not),{type:"NotExpression",children:[w]};case c:if(H={type:"Identity"},w=null,this._lookahead(0)===h)w={type:"Identity"};else w=this._parseProjectionRHS(I.Star);return{type:"ValueProjection",children:[H,w]};case A:return this.led($.type,{type:"Identity"});case t:return this._parseMultiselectHash();case y:return H={type:y,children:[{type:"Identity"}]},w=this._parseProjectionRHS(I.Flatten),{type:"Projection",children:[H,w]};case u:if(this._lookahead(0)===i||this._lookahead(0)===Y)return w=this._parseIndexExpression(),this._projectIfSlice({type:"Identity"},w);else if(this._lookahead(0)===c&&this._lookahead(1)===h)return this._advance(),this._advance(),w=this._parseProjectionRHS(I.Star),{type:"Projection",children:[{type:"Identity"},w]};return this._parseMultiselectList();case L:return{type:L};case g:return W=this.expression(I.Expref),{type:"ExpressionReference",children:[W]};case T:var Z=[];while(this._lookahead(0)!==R){if(this._lookahead(0)===L)W={type:L},this._advance();else W=this.expression(0);Z.push(W)}return this._match(R),Z[0];default:this._errorToken($)}},led:function($,H){var w;switch($){case d:var W=I.Dot;if(this._lookahead(0)!==c)return w=this._parseDotRHS(W),{type:"Subexpression",children:[H,w]};return this._advance(),w=this._parseProjectionRHS(W),{type:"ValueProjection",children:[H,w]};case l:return w=this.expression(I.Pipe),{type:l,children:[H,w]};case J0:return w=this.expression(I.Or),{type:"OrExpression",children:[H,w]};case S0:return w=this.expression(I.And),{type:"AndExpression",children:[H,w]};case T:var C=H.name,Z=[],J,S;while(this._lookahead(0)!==R){if(this._lookahead(0)===L)J={type:L},this._advance();else J=this.expression(0);if(this._lookahead(0)===b)this._match(b);Z.push(J)}return this._match(R),S={type:"Function",name:C,children:Z},S;case A:var G=this.expression(0);if(this._match(h),this._lookahead(0)===y)w={type:"Identity"};else w=this._parseProjectionRHS(I.Filter);return{type:"FilterProjection",children:[H,w,G]};case y:var j={type:y,children:[H]},D=this._parseProjectionRHS(I.Flatten);return{type:"Projection",children:[j,D]};case e:case C0:case $0:case w0:case H0:case W0:return this._parseComparator(H,$);case u:var X=this._lookaheadToken(0);if(X.type===i||X.type===Y)return w=this._parseIndexExpression(),this._projectIfSlice(H,w);return this._match(c),this._match(h),w=this._parseProjectionRHS(I.Star),{type:"Projection",children:[H,w]};default:this._errorToken(this._lookaheadToken(0))}},_match:function($){if(this._lookahead(0)===$)this._advance();else{var H=this._lookaheadToken(0),w=Error("Expected "+$+", got: "+H.type);throw w.name="ParserError",w}},_errorToken:function($){var H=Error("Invalid token ("+$.type+'): "'+$.value+'"');throw H.name="ParserError",H},_parseIndexExpression:function(){if(this._lookahead(0)===Y||this._lookahead(1)===Y)return this._parseSliceExpression();else{var $={type:"Index",value:this._lookaheadToken(0).value};return this._advance(),this._match(h),$}},_projectIfSlice:function($,H){var w={type:"IndexExpression",children:[$,H]};if(H.type==="Slice")return{type:"Projection",children:[w,this._parseProjectionRHS(I.Star)]};else return w},_parseSliceExpression:function(){var $=[null,null,null],H=0,w=this._lookahead(0);while(w!==h&&H<3){if(w===Y)H++,this._advance();else if(w===i)$[H]=this._lookaheadToken(0).value,this._advance();else{var W=this._lookahead(0),C=Error("Syntax error, unexpected token: "+W.value+"("+W.type+")");throw C.name="Parsererror",C}w=this._lookahead(0)}return this._match(h),{type:"Slice",children:$}},_parseComparator:function($,H){var w=this.expression(I[H]);return{type:"Comparator",name:H,children:[$,w]}},_parseDotRHS:function($){var H=this._lookahead(0),w=[o,E,c];if(w.indexOf(H)>=0)return this.expression($);else if(H===u)return this._match(u),this._parseMultiselectList();else if(H===t)return this._match(t),this._parseMultiselectHash()},_parseProjectionRHS:function($){var H;if(I[this._lookahead(0)]<10)H={type:"Identity"};else if(this._lookahead(0)===u)H=this.expression($);else if(this._lookahead(0)===A)H=this.expression($);else if(this._lookahead(0)===d)this._match(d),H=this._parseDotRHS($);else{var w=this._lookaheadToken(0),W=Error("Sytanx error, unexpected token: "+w.value+"("+w.type+")");throw W.name="ParserError",W}return H},_parseMultiselectList:function(){var $=[];while(this._lookahead(0)!==h){var H=this.expression(0);if($.push(H),this._lookahead(0)===b){if(this._match(b),this._lookahead(0)===h)throw Error("Unexpected token Rbracket")}}return this._match(h),{type:"MultiSelectList",children:$}},_parseMultiselectHash:function(){var $=[],H=[o,E],w,W,C,Z;for(;;){if(w=this._lookaheadToken(0),H.indexOf(w.type)<0)throw Error("Expecting an identifier token, got: "+w.type);if(W=w.value,this._advance(),this._match(Y),C=this.expression(0),Z={type:"KeyValuePair",name:W,value:C},$.push(Z),this._lookahead(0)===b)this._match(b);else if(this._lookahead(0)===r){this._match(r);break}}return{type:"MultiSelectHash",children:$}}};function b0($){this.runtime=$}b0.prototype={search:function($,H){return this.visit($,H)},visit:function($,H){var w,W,C,Z,J,S,G,j,D,X;switch($.type){case"Field":if(H!==null&&V(H))if(S=H[$.name],S===void 0)return null;else return S;return null;case"Subexpression":C=this.visit($.children[0],H);for(X=1;X<$.children.length;X++)if(C=this.visit($.children[1],C),C===null)return null;return C;case"IndexExpression":return G=this.visit($.children[0],H),j=this.visit($.children[1],G),j;case"Index":if(!z(H))return null;var B=$.value;if(B<0)B=H.length+B;if(C=H[B],C===void 0)C=null;return C;case"Slice":if(!z(H))return null;var s0=$.children.slice(0),F0=this.computeSliceParams(H.length,s0),k0=F0[0],m0=F0[1],G0=F0[2];if(C=[],G0>0)for(X=k0;X<m0;X+=G0)C.push(H[X]);else for(X=k0;X>m0;X+=G0)C.push(H[X]);return C;case"Projection":var f=this.visit($.children[0],H);if(!z(f))return null;D=[];for(X=0;X<f.length;X++)if(W=this.visit($.children[1],f[X]),W!==null)D.push(W);return D;case"ValueProjection":if(f=this.visit($.children[0],H),!V(f))return null;D=[];var Y0=p(f);for(X=0;X<Y0.length;X++)if(W=this.visit($.children[1],Y0[X]),W!==null)D.push(W);return D;case"FilterProjection":if(f=this.visit($.children[0],H),!z(f))return null;var U0=[],c0=[];for(X=0;X<f.length;X++)if(w=this.visit($.children[2],f[X]),!Q(w))U0.push(f[X]);for(var x0=0;x0<U0.length;x0++)if(W=this.visit($.children[1],U0[x0]),W!==null)c0.push(W);return c0;case"Comparator":switch(Z=this.visit($.children[0],H),J=this.visit($.children[1],H),$.name){case e:C=q(Z,J);break;case C0:C=!q(Z,J);break;case $0:C=Z>J;break;case w0:C=Z>=J;break;case H0:C=Z<J;break;case W0:C=Z<=J;break;default:throw Error("Unknown comparator: "+$.name)}return C;case y:var h0=this.visit($.children[0],H);if(!z(h0))return null;var Z0=[];for(X=0;X<h0.length;X++)if(W=h0[X],z(W))Z0.push.apply(Z0,W);else Z0.push(W);return Z0;case"Identity":return H;case"MultiSelectList":if(H===null)return null;D=[];for(X=0;X<$.children.length;X++)D.push(this.visit($.children[X],H));return D;case"MultiSelectHash":if(H===null)return null;D={};var f0;for(X=0;X<$.children.length;X++)f0=$.children[X],D[f0.name]=this.visit(f0.value,H);return D;case"OrExpression":if(w=this.visit($.children[0],H),Q(w))w=this.visit($.children[1],H);return w;case"AndExpression":if(Z=this.visit($.children[0],H),Q(Z)===!0)return Z;return this.visit($.children[1],H);case"NotExpression":return Z=this.visit($.children[0],H),Q(Z);case"Literal":return $.value;case l:return G=this.visit($.children[0],H),this.visit($.children[1],G);case L:return H;case"Function":var u0=[];for(X=0;X<$.children.length;X++)u0.push(this.visit($.children[X],H));return this.runtime.callFunction($.name,u0);case"ExpressionReference":var n0=$.children[0];return n0.jmespathType=g,n0;default:throw Error("Unknown node type: "+$.type)}},computeSliceParams:function($,H){var w=H[0],W=H[1],C=H[2],Z=[null,null,null];if(C===null)C=1;else if(C===0){var J=Error("Invalid slice, step cannot be 0");throw J.name="RuntimeError",J}var S=C<0?!0:!1;if(w===null)w=S?$-1:0;else w=this.capSliceRange($,w,C);if(W===null)W=S?-1:$;else W=this.capSliceRange($,W,C);return Z[0]=w,Z[1]=W,Z[2]=C,Z},capSliceRange:function($,H,w){if(H<0){if(H+=$,H<0)H=w<0?-1:0}else if(H>=$)H=w<0?$-1:$;return H}};function y0($){this._interpreter=$,this.functionTable={abs:{_func:this._functionAbs,_signature:[{types:[x]}]},avg:{_func:this._functionAvg,_signature:[{types:[m]}]},ceil:{_func:this._functionCeil,_signature:[{types:[x]}]},contains:{_func:this._functionContains,_signature:[{types:[F,U]},{types:[k]}]},ends_with:{_func:this._functionEndsWith,_signature:[{types:[F]},{types:[F]}]},floor:{_func:this._functionFloor,_signature:[{types:[x]}]},length:{_func:this._functionLength,_signature:[{types:[F,U,n]}]},map:{_func:this._functionMap,_signature:[{types:[P]},{types:[U]}]},max:{_func:this._functionMax,_signature:[{types:[m,N]}]},merge:{_func:this._functionMerge,_signature:[{types:[n],variadic:!0}]},max_by:{_func:this._functionMaxBy,_signature:[{types:[U]},{types:[P]}]},sum:{_func:this._functionSum,_signature:[{types:[m]}]},starts_with:{_func:this._functionStartsWith,_signature:[{types:[F]},{types:[F]}]},min:{_func:this._functionMin,_signature:[{types:[m,N]}]},min_by:{_func:this._functionMinBy,_signature:[{types:[U]},{types:[P]}]},type:{_func:this._functionType,_signature:[{types:[k]}]},keys:{_func:this._functionKeys,_signature:[{types:[n]}]},values:{_func:this._functionValues,_signature:[{types:[n]}]},sort:{_func:this._functionSort,_signature:[{types:[N,m]}]},sort_by:{_func:this._functionSortBy,_signature:[{types:[U]},{types:[P]}]},join:{_func:this._functionJoin,_signature:[{types:[F]},{types:[N]}]},reverse:{_func:this._functionReverse,_signature:[{types:[F,U]}]},to_array:{_func:this._functionToArray,_signature:[{types:[k]}]},to_string:{_func:this._functionToString,_signature:[{types:[k]}]},to_number:{_func:this._functionToNumber,_signature:[{types:[k]}]},not_null:{_func:this._functionNotNull,_signature:[{types:[k],variadic:!0}]}}}y0.prototype={callFunction:function($,H){var w=this.functionTable[$];if(w===void 0)throw Error("Unknown function: "+$+"()");return this._validateArgs($,H,w._signature),w._func.call(this,H)},_validateArgs:function($,H,w){var W;if(w[w.length-1].variadic){if(H.length<w.length)throw W=w.length===1?" argument":" arguments",Error("ArgumentError: "+$+"() takes at least"+w.length+W+" but received "+H.length)}else if(H.length!==w.length)throw W=w.length===1?" argument":" arguments",Error("ArgumentError: "+$+"() takes "+w.length+W+" but received "+H.length);var C,Z,J;for(var S=0;S<w.length;S++){J=!1,C=w[S].types,Z=this._getTypeName(H[S]);for(var G=0;G<C.length;G++)if(this._typeMatches(Z,C[G],H[S])){J=!0;break}if(!J){var j=C.map(function(D){return j0[D]}).join(",");throw Error("TypeError: "+$+"() expected argument "+(S+1)+" to be type "+j+" but received type "+j0[Z]+" instead.")}}},_typeMatches:function($,H,w){if(H===k)return!0;if(H===N||H===m||H===U){if(H===U)return $===U;else if($===U){var W;if(H===m)W=x;else if(H===N)W=F;for(var C=0;C<w.length;C++)if(!this._typeMatches(this._getTypeName(w[C]),W,w[C]))return!1;return!0}}else return $===H},_getTypeName:function($){switch(Object.prototype.toString.call($)){case"[object String]":return F;case"[object Number]":return x;case"[object Array]":return U;case"[object Boolean]":return L0;case"[object Null]":return X0;case"[object Object]":if($.jmespathType===g)return P;else return n}},_functionStartsWith:function($){return $[0].lastIndexOf($[1])===0},_functionEndsWith:function($){var H=$[0],w=$[1];return H.indexOf(w,H.length-w.length)!==-1},_functionReverse:function($){var H=this._getTypeName($[0]);if(H===F){var w=$[0],W="";for(var C=w.length-1;C>=0;C--)W+=w[C];return W}else{var Z=$[0].slice(0);return Z.reverse(),Z}},_functionAbs:function($){return Math.abs($[0])},_functionCeil:function($){return Math.ceil($[0])},_functionAvg:function($){var H=0,w=$[0];for(var W=0;W<w.length;W++)H+=w[W];return H/w.length},_functionContains:function($){return $[0].indexOf($[1])>=0},_functionFloor:function($){return Math.floor($[0])},_functionLength:function($){if(!V($[0]))return $[0].length;else return Object.keys($[0]).length},_functionMap:function($){var H=[],w=this._interpreter,W=$[0],C=$[1];for(var Z=0;Z<C.length;Z++)H.push(w.visit(W,C[Z]));return H},_functionMerge:function($){var H={};for(var w=0;w<$.length;w++){var W=$[w];for(var C in W)H[C]=W[C]}return H},_functionMax:function($){if($[0].length>0){var H=this._getTypeName($[0][0]);if(H===x)return Math.max.apply(Math,$[0]);else{var w=$[0],W=w[0];for(var C=1;C<w.length;C++)if(W.localeCompare(w[C])<0)W=w[C];return W}}else return null},_functionMin:function($){if($[0].length>0){var H=this._getTypeName($[0][0]);if(H===x)return Math.min.apply(Math,$[0]);else{var w=$[0],W=w[0];for(var C=1;C<w.length;C++)if(w[C].localeCompare(W)<0)W=w[C];return W}}else return null},_functionSum:function($){var H=0,w=$[0];for(var W=0;W<w.length;W++)H+=w[W];return H},_functionType:function($){switch(this._getTypeName($[0])){case x:return"number";case F:return"string";case U:return"array";case n:return"object";case L0:return"boolean";case P:return"expref";case X0:return"null"}},_functionKeys:function($){return Object.keys($[0])},_functionValues:function($){var H=$[0],w=Object.keys(H),W=[];for(var C=0;C<w.length;C++)W.push(H[w[C]]);return W},_functionJoin:function($){var H=$[0],w=$[1];return w.join(H)},_functionToArray:function($){if(this._getTypeName($[0])===U)return $[0];else return[$[0]]},_functionToString:function($){if(this._getTypeName($[0])===F)return $[0];else return JSON.stringify($[0])},_functionToNumber:function($){var H=this._getTypeName($[0]),w;if(H===x)return $[0];else if(H===F){if(w=+$[0],!isNaN(w))return w}return null},_functionNotNull:function($){for(var H=0;H<$.length;H++)if(this._getTypeName($[H])!==X0)return $[H];return null},_functionSort:function($){var H=$[0].slice(0);return H.sort(),H},_functionSortBy:function($){var H=$[0].slice(0);if(H.length===0)return H;var w=this._interpreter,W=$[1],C=this._getTypeName(w.visit(W,H[0]));if([x,F].indexOf(C)<0)throw Error("TypeError");var Z=this,J=[];for(var S=0;S<H.length;S++)J.push([S,H[S]]);J.sort(function(j,D){var X=w.visit(W,j[1]),B=w.visit(W,D[1]);if(Z._getTypeName(X)!==C)throw Error("TypeError: expected "+C+", received "+Z._getTypeName(X));else if(Z._getTypeName(B)!==C)throw Error("TypeError: expected "+C+", received "+Z._getTypeName(B));if(X>B)return 1;else if(X<B)return-1;else return j[0]-D[0]});for(var G=0;G<J.length;G++)H[G]=J[G][1];return H},_functionMaxBy:function($){var H=$[1],w=$[0],W=this.createKeyFunction(H,[x,F]),C=-1/0,Z,J;for(var S=0;S<w.length;S++)if(J=W(w[S]),J>C)C=J,Z=w[S];return Z},_functionMinBy:function($){var H=$[1],w=$[0],W=this.createKeyFunction(H,[x,F]),C=1/0,Z,J;for(var S=0;S<w.length;S++)if(J=W(w[S]),J<C)C=J,Z=w[S];return Z},createKeyFunction:function($,H){var w=this,W=this._interpreter,C=function(Z){var J=W.visit($,Z);if(H.indexOf(w._getTypeName(J))<0){var S="TypeError: expected one of "+H+", received "+w._getTypeName(J);throw Error(S)}return J};return C}};function t0($){var H=new D0,w=H.parse($);return w}function T0($){var H=new Q0;return H.tokenize($)}function a0($,H){var w=new D0,W=new y0,C=new b0(W);W._interpreter=C;var Z=w.parse(H);return C.search(Z,$)}M.tokenize=T0,M.compile=t0,M.search=a0,M.strictDeepEqual=q})(typeof z0>"u"?z0.jmespath={}:z0)});var _=w1(N0(),1);function v(M,z){return{context:{client:{hl:"en",gl:"ID",remoteHost:"%s",rolloutToken:"%s",deviceMake:"",deviceModel:"",visitorData:M.visitorData,userAgent:"Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0,gzip(gfe)",clientName:"WEB_REMIX",clientVersion:M.clientVersion,osName:"X11",osVersion:"",originalUrl:"https://music.youtube.com/",platform:"DESKTOP",clientFormFactor:"UNKNOWN_FORM_FACTOR",configInfo:{appInstallData:M.appInstallData,coldConfigData:null,coldHashData:null,hotHashData:null},browserName:"Firefox",browserVersion:"115.0",acceptHeader:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",deviceExperimentId:M.deviceExperimentId,screenWidthPoints:1920,screenHeightPoints:1080,screenPixelDensity:1,screenDensityFloat:1,utcOffsetMinutes:420,userInterfaceTheme:"USER_INTERFACE_THEME_LIGHT",timeZone:"Asia/Jakarta",musicAppInfo:{pwaInstallabilityStatus:"PWA_INSTALLABILITY_STATUS_UNKNOWN",webDisplayMode:"WEB_DISPLAY_MODE_BROWSER",storeDigitalGoodsApiSupportStatus:{playStoreDigitalGoodsApiSupportStatus:"DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED"}}},user:{lockedSafetyMode:!1},request:{useSsl:!0,internalExperimentFlags:[],consistencyTokenJars:[]},clickTracking:{clickTrackingParams:M.clickTrackingParams}},...z}}async function a(){let M=await fetch("https://music.youtube.com/",{headers:{accept:"text/html","user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"}});if(!M.ok)throw Error(M.status>0?`Failed when get status data: ${M.statusText}`:"Couldn't resolve music.youtube.com");let z=await M.text();return{remoteHost:z.match(/"remoteHost":"([^"]+)"/)[1]||"",visitorData:z.match(/"visitorData":"([^"]+)"/)[1]||"",clientVersion:z.match(/"clientVersion":"([^"]+)"/)[1]||"",appInstallData:z.match(/"appInstallData":"([^"]+)"/)[1]||"",deviceExperimentId:z.match(/"deviceExperimentId":"([^"]+)"/)[1]||"",rolloutToken:z.match(/"rolloutToken":"([^"]+)"/)[1]||"",clickTrackingParams:z.match(/"clickTrackingParams":"([^"]+)"/)[1]||""}}var C1={Accept:"*/*",Connection:"keep-alive","User-Agent":"Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0,gzip(gfe)"};function R0(M){return new Promise((z)=>setTimeout(z,M))}function K(M,z){return fetch(M,{method:z.method||"GET",mode:"cors",referrer:z.from,headers:{...C1,Origin:z.from,...z.headers},body:z.body})}async function v0(M){try{return(await K(M,{from:M,method:"HEAD"})).url}catch(z){return console.error(`Failed resolve redirect for ${M}: ${z}`),null}}function O(M,z,V){return K(`https://music.youtube.com/youtubei/v1/${M}?prettyPrint=false`,{from:"https://music.youtube.com/",method:"POST",headers:{"Content-Type":"application/json","X-Goog-Visitor-Id":z.visitorData,"X-Youtube-Bootstrap-Logged-In":"false","X-Youtube-Client-Name":"67","X-Youtube-Client-Version":z.clientVersion},body:JSON.stringify(V)})}var K0=`
contents.singleColumnBrowseResultsRenderer.tabs[].tabRenderer
.content.sectionListRenderer.contents[].musicCarouselShelfRenderer.contents[]
.musicResponsiveListItemRenderer.{
  thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
  musicId: join(
    '',
    flexColumns[]
    .musicResponsiveListItemFlexColumnRenderer.text.runs[?
    (
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
    ].navigationEndpoint.watchEndpoint.videoId | []
  ),
  title: join(
    '',
    flexColumns[]
    .musicResponsiveListItemFlexColumnRenderer.text.runs[?
    (
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
     ].text | []
  ),
  subtitle: join(
    '',
    flexColumns[]
    .musicResponsiveListItemFlexColumnRenderer.text.runs[?
    !(
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
     &&
     !(
        navigationEndpoint.browseEndpoint
        .browseEndpointContextSupportedConfigs
        .browseEndpointContextMusicConfig.pageType
        == 'MUSIC_PAGE_TYPE_ALBUM'
      )
     ].text | []
  )
}|[?videoId!='']`,O0=`
contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[][
musicCardShelfRenderer && [
  {
    thumbnail: musicCardShelfRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
    musicId: join('', musicCardShelfRenderer.title.runs[].navigationEndpoint.watchEndpoint.videoId),
    title: join('', musicCardShelfRenderer.title.runs[].text),
    subtitle: join('', musicCardShelfRenderer.subtitle.runs[].text)
  },
  musicCardShelfRenderer.contents[].musicResponsiveListItemRenderer.{
    thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
    musicId: join(
      '',
      flexColumns[]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[?
      (
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
      ].navigationEndpoint.watchEndpoint.videoId | []
    ),
    title: join(
      '',
      flexColumns[]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[?
      (
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
       ].text | []
    ),
    subtitle: join(
      ' ',
      flexColumns[]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[?
      !(
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
       &&
       !(
          navigationEndpoint.browseEndpoint
          .browseEndpointContextSupportedConfigs
          .browseEndpointContextMusicConfig.pageType
          == 'MUSIC_PAGE_TYPE_ALBUM'
        )
       ].text | []
    )
  }
][]

musicShelfRenderer.contents[].musicResponsiveListItemRenderer.{
  thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
  musicId: join(
    '',
    flexColumns[]
    .musicResponsiveListItemFlexColumnRenderer.text.runs[?
    (
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
    ].navigationEndpoint.watchEndpoint.videoId | []
  ),
  title: join(
    '',
    flexColumns[]
    .musicResponsiveListItemFlexColumnRenderer.text.runs[?
    (
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
     ].text | []
  ),
  subtitle: join(
    ' ',
    flexColumns[]
    .musicResponsiveListItemFlexColumnRenderer.text.runs[?
    !(
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)
     &&
     !(
        navigationEndpoint.browseEndpoint
        .browseEndpointContextSupportedConfigs
        .browseEndpointContextMusicConfig.pageType
        == 'MUSIC_PAGE_TYPE_ALBUM'
      )
     ].text | []
  )
}
][][]|[?videoId!='']`,_0=`
(contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
.watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer
.content.playlistPanelRenderer.contents[].automixPreviewVideoRenderer.content
.automixPlaylistVideoRenderer.navigationEndpoint.watchPlaylistEndpoint)[0]
`,o0=`
  (contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
  .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer
  .content.playlistPanelRenderer.contents[].playlistPanelVideoRenderer|[?videoId!=''])[].{
    thumbnail: thumbnail.thumbnails[0].url,
    musicId: videoId,
    title: title.runs[0].text,
    subtitle: shortBylineText.runs[0].text
  }
`,E0=`
  videoDetails.{
    musicId: videoId,
    title: title,
    thumbnail: thumbnail.thumbnails[0].url,
    author: author,
    duration: lengthSeconds.to_number(@),
    playCount: viewCount.to_number(@)
  }
`;async function Z1(M){let z=await K("https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_="+Math.random(),{from:"https://id.ytmp3.mobi"});if(!z.ok)throw Error(z.status>0?`Failed when get ytmp3 init for "${M}": ${z.statusText}`:"Couldn't resolve d.ymcdn.org");return(await z.json()).convertURL}async function i0(M){let z=await Z1(M)+`&v=${M}&f=mp3&_=${Math.random()}`,V=await K(z,{from:"https://id.ytmp3.mobi"});if(!V.ok)throw Error(V.status>0?`Failed when convert with ytmp3 for "${M}": ${V.statusText}`:"Couldn't resolve d.ymcdn.org");let q=await V.json();while(!0){let{progress:Q}=await(await K(q.progressURL,{from:"https://id.ytmp3.mobi"})).json();if(Q===3)return await v0(q.downloadURL)??q.downloadURL;await R0(250)}}async function z1(){let M=await a(),z=v(M,{browseId:"FEmusic_home"}),V=await O("browse",M,z);if(!V.ok)throw Error(V.status>0?`Failed when get featured page: ${V.statusText}`:"Couldn't resolve music.youtube.com");let q=await V.json();return _.search(q,K0)}async function M1(M){let z=await a(),V=v(z,{query:M}),q=await O("search",z,V);if(!q.ok)throw Error(q.status>0?`Failed when get search result for "${M}": ${q.statusText}`:"Couldn't resolve music.youtube.com");let Q=await q.json();return _.search(Q,O0)}async function X1(M,z){let V={videoId:z,isAudioOnly:!0,tunerSettingValue:"AUTOMIX_SETTING_NORMAL"},q=v(M,V),Q=await O("next",M,q);if(!Q.ok)throw Error(Q.status>0?`Failed when get automix playlist endpoint for "${z}": ${Q.statusText}`:"Couldn't resolve music.youtube.com");let p=await Q.json(),s=_.search(p,_0);if(!s)throw Error("Invalid musicId or music not found");return{...V,...s,queueContextParams:p.queueContextParams}}async function I1(M){let z=await a(),V=await X1(z,M),q=v(z,V),Q=await O("next",z,q);if(!Q.ok)throw Error(Q.status>0?`Failed when get automix for "${M}": ${Q.statusText}`:"Couldn't resolve music.youtube.com");let p=await Q.json();return _.search(p,o0)}async function J1(M){let z=await a(),V=v(z,{videoId:M,playbackContext:{contentPlaybackContext:{html5Preference:"HTML5_PREF_WANTS",lactMilliseconds:"1113",referer:"https://music.youtube.com/",signatureTimestamp:20486,autoCaptionsDefaultOn:!1,mdxContext:{},vis:10},devicePlaybackCapabilities:{supportsVp9Encoding:!0,supportXhr:!0}},captionParams:{}}),q=await O("player",z,V);if(!q.ok)throw Error(q.status>0?`Failed when get info for "${M}": ${q.statusText}`:"Couldn't resolve music.youtube.com");let Q=await q.json();return _.search(Q,E0)}function S1(M){return i0(M)}export{M1 as getSearchResult,J1 as getInfo,z1 as getFeatured,I1 as getAutomixQueue,S1 as getAudioFile};
