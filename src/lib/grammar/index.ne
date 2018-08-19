@{%
  const concat = data => data.join("")

  const concatid = data => concat(id(data))

  const nuller = () => null;

  const nth = i => data => data[i]

  const { mainLexer } = require("./lexer");
%}
@lexer mainLexer

innerBlock[INNER] -> _ ( $INNER _ {% data => data[0][0] %} ):* {% nth(1) %}
block[INNER] -> %lb innerBlock[$INNER] %rb {% nth(1) %}

betterfunction -> innerBlock[statementBtfn] {%
  data => ({
    type: "file",
    statements: data[0]
  })
%}

statementBtfn -> nspStatement | includeStatement # Base level statement
includeStatement -> %kw_include __ string %semi {%
	data => ({
		type: "includeStatement",
		include: data[2]
	})
%}
nspStatement -> %kw_namespace __ ident _ block[statementFolderOrNsp] {%
	data => ({
    type: "namespaceStatement",
    name: data[2],
    statements: data[4]
  })
%}

statementFolderOrNsp -> functionStatement | folderStatement
folderStatement -> %kw_folder __ ident _ block[statementFolderOrNsp] {%
	data => ({
		type: "folderStatement",
		name: data[2],
		statements: data[4]
	})
%}
functionStatement ->  ( ( %kw_tick | %kw_load ) __ ):? %kw_function __ ident _ block[statementFunction] {%
	data => ({
    type: "functionStatement",
    name: data[3],
    statements: data[5],
    mctag: data[0] && data[0][0].value
  })
%}

statementFunction -> callStatement
callStatement -> funcIdent ( 
  %lp callParams %rp {% data => [data[1], true] %} | callParams {% data => [data[0], false] %} 
) %semi {%
  data => ({
    type: "callStatemet",
    func: data[0],
    params: data[1][0],
    parens: data[1][1]
  })
%}
callParams -> _ ( 
  ( expr _ %comma _  {% nth(0) %} ):*
  expr 
  ( _ %comma _ ident _ %colon _ expr {% data => [data[3], data[7]] %} ):*
  _
):? {%
  data => {
    const node = {
      type: "callParams",
      posits: [],
      named: {}
    };

    top: {
      if (!data[1]) break top;
      if (data[1][0]) node.posits.splice(-1, 0, ...data[1][0]);
      node.posits.push(data[1][1]);
      if (!data[1][2]) break top;
      data[1][2].forEach(([key, val]) => node.named[key] = val);
    }

    return node;
  }
%}
funcIdent -> ident ( _ %childOp _ ident ):* {%
  data => ({
    type: "funcIdent",
    path: [data[0], ...data[1].map(cur => cur[3])]
  })
%}

expr -> ident {% id %}

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
    const match = /^(#|\/\/)(.*)$/.exec(data[0].value);
    return {
      type: "comment",
      cmtToken: match[1],
      content: match[2]
    };
  }
%}
ident -> %ident {%
  data => data[0].value
%}