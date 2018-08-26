@lexer lexer

innerBlock[INNER] -> _ ( $INNER _ {% data => data[0][0][0] %} ):* {% nth(1) %}
block[INNER] -> %lb innerBlock[$INNER] %rb {% data => data[1].map(cur => cur[0]) %}
delim[el, del] -> ( $el ( _ $del _ $el {% nth(3) %} ):* ):? {%
  data => data[0] ? [data[0][0], ...data[0][1]].map(cur=>cur[0]) : []
%}
optional[el] -> %not:? _ $el {%
  data => ({
    type: "optional",
    not: !!data[0],
    value: data[2]
  })
%}

functionExpr -> %kw_func _ functionBlock {%
  data => ({
    type: "function",
    statements: data[2]
  })
%}

selec[ld, rd] -> $ld _ delim[singleSelector, %comma] _ $rd {%
  data => data[2].reduce((obj,[key,val])=>(obj[key]=val,obj),{})
%}
selector -> %sel selec[%ls, %rs]:? {%
  data => ({
    type: "selector",
    target: data[0].value.match(/@(.)/)[1],
    args: data[1] || {}
  })
%}
singleSelectorOptional -> (
    ident {% data => ({ type: "string", content: data[0] }) %}
  | string
  | null {% () => ({ type: "string", content: "" }) %}
  | idOrTag
) {% id2 %}
singleSelector -> ident _ %eq _ (
    nbtVal {% id %}
  | optional[singleSelectorOptional]
  | %not _ idOrTag
  | selec[%rb, %lb] {%
    data => ({
      type: "map",
      data: data[0]
    })
  %}
  | ( num %range num? | %range num ) {%
    data => {
      const node = { type: "first", start: null, end: null };
      if (data[0][0].type === "num") {
        node.start = data[0][0];
        node.end = data[0][2];
      } else {
        node.end = data[0][1];
      }
      return node;
    }
  %}
) {% 
  data => [data[0], data[4]]
%}

nbtVal -> ( num | obj | string | list | bool ) {% id2 %}
objField -> ( ident | string ) _ %colon _ nbtVal {% data => [data[0][0], data[4]] %}
obj -> %lb delim[objField, %comma] %rb {%
  data => ({
    type: "obj",
    data: data[1].reduce((obj,[key,val])=>(obj[key]=val,obj),{})
  })
%}
num -> %num {% 
  data => ({
    type: "num",
    content: JSON.parse(data[0])
  })
%}
bool -> ( %kw_true | %kw_false ) {%
  data => ({
    type: "bool",
    content: JSON.parse(data[0][0])
  })
%}
list -> %ls _ delim[nbtVal, %comma] _ %rs {%
  data => ({
    type: "list",
    data: data[2]
  })
%}

cond -> %cond _ ( "entity" __ selector ) {%
  data => ({
    type: "cond",
    case: data[2][0].value,
    args: data[2].slice(1).filter(a => a)
  })
%}

pos -> coord __ coord __ coord {%
  data => ({
    type: "pos",
    rays: false,
    coords: [data[0], data[2], data[4]]
  })
%} | raycoord __ raycoord __ raycoord {%
  data => ({
    type: "pos",
    rays: true,
    coords: [data[0], data[2], data[4]]
  })
%}
coord -> ( %rel:? num | %rel ) {%
  data => ({ type: "coord", relative: !!data[0], ray: false, coord: data[1] ? data[1].content : 0 })
%}
raycoord -> %ray num {% data => ({ type: "coord", relative: false, ray: true, coord: data[1].content }) %}

expr -> ( functionExpr | string | selector | nbtVal | cond | pos ) {% id2 %}