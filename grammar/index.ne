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
creeperfunction -> statementCrfn:* {% id %}

statementCrfn -> statement[(nspStatement | includeStatement)] {% id %}   # Base level statement

includeStatement -> "include" __ string {%
	data => ({
		type: "include",
		include: data[2]
	})
%}
nspStatement -> "namespace" __ w+ _ block[statementFolderornsp] {%
	data => ({
      type: "namespace",
      name: data[2],
      data: data[4].map(cur => cur[0][0])
  })
%}

statementFolderornsp -> statement[(functionStatement | folderStatement)] {% id %}
folderStatement -> "folder" __ w+ _ block[statementFolderornsp] {%
	data => ({
		type: "folder",
		name: data[2],
		data: data[4][0].map(id)
	})
%}
functionStatement ->  ("tick" __):? "function" __ w+ _ functionBlock {%
	data => ({type: "function", name: data[3], commands: data[5], tick: !!data[0]})
%}
functionBlock -> block[command] {% data => data[0].map(id) %}
between -> (_ comment:? nl):* {% nuller %}
comment -> ("#" | "//") nnl+
string -> dqstring {% id %} | sqstring {% id %}
nl -> "\r":? "\n" # new line
nnl -> [^\r\n] # not new line
nnl+ -> nnl:+ {% concatid %} # not new line, once or more
_ -> [\t ]:* {% id %}
__ -> [\t ]:+ {% id %}
w+ -> [\w]:+ {% concatid %}
d+ -> [\d]:+ {% concatid %}
