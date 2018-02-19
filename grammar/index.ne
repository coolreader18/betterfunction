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
	var generated = []
%}
@builtin "string.ne"
@include "commands.ne"
block[INNER] -> "{" nl (_ $INNER nl {% data => data[1] %}):* _ "}" between {% data => data[2] %}
statement[POSSIBILITIES] -> $POSSIBILITIES between {% data => data[0][0] %}
full -> statementCrfn:* {% id %}

statementCrfn -> statement[(nspStatement | includeStatement)] {% id %}   # Base level statement

includeStatement -> "include" __ string {% data => ({type: "include", include: data[2]}) %}
nspStatement -> "namespace" __ variableName _ block[statementFolderornsp] {%
	data => {
		var ret = {type: "namespace", name: data[2], data: data[4].map(cur=>cur[0][0]).concat([{type: "folder", name: "crfngen", data: generated}])};
		generated = [];
		return ret;
	}
%}

statementFolderornsp -> statement[(functionStatement | folderStatement)] {% id %}
folderStatement -> "folder" __ variableName _ block[statementFolderornsp] {% data => ({type: "folder", name: data[2], data: data[4][0].map(cur=>cur[0])}) %}
functionStatement ->  "tick ":? "function" __ variableName _ functionBlock {%
	data => ({type: "function", name: data[3], commands: data[5], tick: !!data[0]})
%}
variableName -> [\w]:+ {% concatid %}
functionBlock -> block[command] {% data => data[0].map(cur=>cur[0]) %}
between -> (_ nl):* {% nuller %}
string -> dqstring {% id %} | sqstring {% id %}
nl -> "\r":? "\n" # new line
nnl -> [^\r\n] # not new line
nnl+ -> nnl:+ {% concatid %} # not new line, once or more
_ -> [\t ]:* {% id %}
__ -> [\t ]:+ {% id %}
w+ -> [\w]:+ {% concatid %}
d+ -> [\d]:+ {% concatid %}
