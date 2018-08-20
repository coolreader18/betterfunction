@lexer lexer

innerBlock[INNER] -> _ ( $INNER _ {% data => data[0][0][0] %} ):* {% nth(1) %}
block[INNER] -> %lb innerBlock[$INNER] %rb {% data => data[1].map(cur => cur[0]) %}
delim[el, del] -> ( $el ( _ $del _ $el {% nth(3) %} ):* ):? {%
  data => data[0] ? [data[0][0][0], ...data[0][1].map(cur=>cur[0])] : []
%}

functionExpr -> %kw_function _ functionBlock {%
  data => ({
    type: "function",
    statements: data[2]
  })
%}

selec[ld, rd] -> $ld _ delim[singleSelector, %comma] _ $rd {% nth(2) %}
selector -> %sel selec[%ls, %rs]:? {%
  data => ({
    type: "selector",
    target: data[0].value.match(/@(.)/)[1],
    args: (data[1] || []).reduce((obj,[key,val])=>(obj[key]=val,obj),{})
  })
%}
singleSelector -> ident _ %eq _ (
  nbtVal {% id %} |
  ( %not _ ident:? ):? |
  %not _ idOrTag |
  selec[%rb, %lb] |
  ( num %range num? | %range num ) {%
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

nbtVal -> (num | obj | string | list) {% id2 %}
objField -> ( ident | string ) _ %colon _ nbtVal {% data => [data[0][0], data[4]] %}
obj -> %lb delim[objField, %comma] %rb {%
  data => ({
    type: "obj",
    fields: data[1].reduce((obj,[key,val])=>(obj[key]=val,obj),{})
  })
%}
num -> %num {% 
  data => ({
    type: "num",
    content: JSON.parse(data[0])
  })
%}

expr -> (functionExpr | string | selector | nbtVal) {% id2 %}