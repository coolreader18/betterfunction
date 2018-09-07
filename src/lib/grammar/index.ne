@{%
  const concat = data => data.join("");

  const concatid = data => concat(id(data));

  const nuller = () => null;

  const nth = i => data => data[i];
  const id2 = data => data[0][0];

  import lexer from "./lexer";
%}
@preprocessor typescript
@lexer lexer

innerBlock[INNER] -> _ ( $INNER _ {% data => data[0][0] %} ):* {% nth(1) %}
block[INNER] -> %lb innerBlock[$INNER {% id %}] %rb {% data => data[1] %}
delim[el, del] -> ( $el ( _ $del _ $el {% nth(3) %} ):* ):? {%
  data => data[0] ? [data[0][0], ...data[0][1]] : []
%}



betterfunction -> innerBlock[statementBtfn {% id %}] {%
  data => ({
    type: "file",
    statements: data[0]
  })
%}

statementBtfn -> nspStatement | includeStatement # Base level statement
includeStatement -> %kw_include __ string term {%
	data => ({
		type: "includeStatement",
		path: data[2].content
	})
%}
nspStatement -> %kw_namespace __ ident _ block[statementFolderOrNsp {% id %}] {%
	data => ({
    type: "namespaceStatement",
    name: data[2],
    statements: data[4]
  })
%}

statementFolderOrNsp -> functionStatement | folderStatement
folderStatement -> %kw_folder __ ident _ block[statementFolderOrNsp {% id %}] {%
	data => ({
		type: "folderStatement",
		name: data[2],
		statements: data[4]
	})
%}
functionBlock -> block[statementFunction {% id %}] {% id %}
functionStatement ->  ( ( %kw_tick | %kw_load ) __ ):? %kw_func __ ident _ functionBlock {%
	data => ({
    type: "functionStatement",
    name: data[3],
    statements: data[5],
    mctag: data[0] && data[0][0].value
  })
%}

statementFunction -> callStatement

callMac[params] -> funcIdent _ $params {%
  data => ({
    type: "callStatement",
    func: data[0],
    params: data[2][0],
    parens: data[2][1]
  })
%}
callStatement -> call term {% id %}
call -> ( callParens | callNoParens ) {% id2 %}
callParens -> callMac[paramsParens {% id %}] {% id %}
paramsParens -> %lp callParams %rp {% data => [data[1], true] %}
callNoParens -> callMac[paramsNoParens {% id %}] {% id %}
paramsNoParens -> callParams {% data => [data[0], false] %}
 
namedParam -> ident _ %colon _ expr {% data => [data[0], data[4]] %}
callParams -> _ (
  delim[expr {% id %}, %comma] ( _ %comma _ delim[namedParam {% id %}, %comma] {% nth(3) %} ):? {%
    data => ({ posits: data[0], named: data[1] }) 
  %} |
  delim[namedParam {% id %}, %comma]:? {% data => ({ named: data[0] }) %}
)  _ {%
  data => ({
    type: "callParams",
    posits: data[1].posits || [],
    named: (data[1].named || []).reduce((o,[k,v])=>(o[k]=v,o), {})
  })
%}
funcIdent -> ident ( _ %childOp _ ident {% data => data[3] %} ):* {%
  data => ({
    type: "funcIdent",
    path: [data[0], ...data[1]]
  })
%}

string -> %string {%
  data => ({
    type: "string",
    content: JSON.parse(data[0].value)
  })
%}
_ -> %__:? {% nuller %} | _ cmt _
__ -> %__ {% nuller %} | __ cmt _
cmt -> %cmt {%
  data => {
    const match = /^\/\/(.*)$/.exec(data[0].value);
    return {
      type: "comment",
      content: match![2]
    };
  }
%}
ident -> %ident {% data => data[0].value %}
# statement terminator
term -> _ %semi

@include "./expressions.ne"