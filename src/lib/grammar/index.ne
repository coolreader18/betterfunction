@{%
  function concat(data) {
    return data.join("")
  }
  function concatid(data) {
    return concat(id(data))
  }
  function nuller() {
    return null;
  }
%}
@builtin "string.ne"
@include "commands.ne"
block[INNER] -> "{" between (_ $INNER between {% data => data[1] %}):* _ "}" {% data => data[2] %}
statement[POSSIBILITIES] -> $POSSIBILITIES between {% data => data[0][0] %}
betterfunction -> between statementBtfn:* {% d => d[1] %}

statementBtfn-> statement[(nspStatement | includeStatement)] {% id %}   # Base level statement

includeStatement -> "include" __ string {%
	data => ({
		type: "include",
		include: data[2]
	})
%}
nspStatement -> "namespace" __ word _ block[statementFolderornsp] {%
	data => ({
      type: "namespace",
      name: data[2],
      data: data[4].map(cur => cur[0][0])
  })
%}

statementFolderornsp -> statement[(functionStatement | folderStatement)] {% id %}
folderStatement -> "folder" __ word _ block[statementFolderornsp] {%
	data => ({
		type: "folder",
		name: data[2],
		data: data[4][0].map(id)
	})
%}
functionStatement ->  (("tick" | "load") __):? "function" __ word _ functionBlock {%
	data => ({
    type: "function",
    name: data[3],
    commands: data[5],
    mctag: data[0] && data[0][0]
  })
%}
functionBlock -> block[command] {% data => data[0].map(id) %}
between -> (_ comment:? nl):* {% nuller %}
comment -> ("#" | "//") nnlp
string -> dqstring {% id %} | sqstring {% id %}
word -> [\w-_+\.]:+
_ -> [\t ]:*
__ -> [\t ]:+
nl -> "\r":? "\n"
dp -> [\d]:+
nnl -> [^\r\n] # not new line
nnlp -> nnl:+ # not new line, once or more
