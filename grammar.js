// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

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


  function mid(num) {
    return data => eval(`data${"[0]".repeat(num)}`);
  }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "command$subexpression$1", "symbols": ["advancement"]},
    {"name": "command$subexpression$1", "symbols": ["bossbar"]},
    {"name": "command$subexpression$1", "symbols": ["clear"]},
    {"name": "command$subexpression$1", "symbols": ["clone"]},
    {"name": "command$subexpression$1", "symbols": ["data"]},
    {"name": "command$subexpression$1", "symbols": ["defaultgamemode"]},
    {"name": "command$subexpression$1", "symbols": ["difficulty"]},
    {"name": "command$subexpression$1", "symbols": ["effect"]},
    {"name": "command$subexpression$1", "symbols": ["execute"]},
    {"name": "command$subexpression$1", "symbols": ["experience"]},
    {"name": "command$subexpression$1", "symbols": ["fill"]},
    {"name": "command$subexpression$1", "symbols": ["function"]},
    {"name": "command$subexpression$1", "symbols": ["gamemode"]},
    {"name": "command$subexpression$1", "symbols": ["gamerule"]},
    {"name": "command$subexpression$1", "symbols": ["give"]},
    {"name": "command$subexpression$1", "symbols": ["kill"]},
    {"name": "command$subexpression$1", "symbols": ["locate"]},
    {"name": "command$subexpression$1", "symbols": ["msg"]},
    {"name": "command$subexpression$1", "symbols": ["particle"]},
    {"name": "command$subexpression$1", "symbols": ["playsound"]},
    {"name": "command$subexpression$1", "symbols": ["recipe"]},
    {"name": "command$subexpression$1", "symbols": ["reload"]},
    {"name": "command$subexpression$1", "symbols": ["replaceitem"]},
    {"name": "command$subexpression$1", "symbols": ["say"]},
    {"name": "command$subexpression$1", "symbols": ["scoreboard"]},
    {"name": "command$subexpression$1", "symbols": ["tag"]},
    {"name": "command$subexpression$1", "symbols": ["team"]},
    {"name": "command$subexpression$1", "symbols": ["seed"]},
    {"name": "command$subexpression$1", "symbols": ["setblock"]},
    {"name": "command$subexpression$1", "symbols": ["setworldspawn"]},
    {"name": "command$subexpression$1", "symbols": ["spreadplayers"]},
    {"name": "command$subexpression$1", "symbols": ["stopsound"]},
    {"name": "command$subexpression$1", "symbols": ["summon"]},
    {"name": "command$subexpression$1", "symbols": ["teleport"]},
    {"name": "command$subexpression$1", "symbols": ["tellraw"]},
    {"name": "command$subexpression$1", "symbols": ["tell"]},
    {"name": "command$subexpression$1", "symbols": ["time"]},
    {"name": "command$subexpression$1", "symbols": ["title"]},
    {"name": "command$subexpression$1", "symbols": ["tp"]},
    {"name": "command$subexpression$1", "symbols": ["trigger"]},
    {"name": "command$subexpression$1", "symbols": ["w"]},
    {"name": "command$subexpression$1", "symbols": ["weather"]},
    {"name": "command$subexpression$1", "symbols": ["worldborder"]},
    {"name": "command$subexpression$1", "symbols": ["xp"]},
    {"name": "command", "symbols": ["command$subexpression$1"], "postprocess": data => data[0][0].join("")},
    {"name": "selector$ebnf$1$subexpression$1$ebnf$1", "symbols": ["selectorSpec"]},
    {"name": "selector$ebnf$1$subexpression$1$ebnf$1", "symbols": ["selector$ebnf$1$subexpression$1$ebnf$1", "selectorSpec"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selector$ebnf$1$subexpression$1", "symbols": [{"literal":"["}, "selector$ebnf$1$subexpression$1$ebnf$1", {"literal":"]"}], "postprocess": concat},
    {"name": "selector$ebnf$1", "symbols": ["selector$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "selector$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector", "symbols": [{"literal":"@"}, "selectorBases", "selector$ebnf$1"], "postprocess": concat},
    {"name": "selector", "symbols": [/[\w]/]},
    {"name": "selectorSpec$ebnf$1", "symbols": [/[\w]/]},
    {"name": "selectorSpec$ebnf$1", "symbols": ["selectorSpec$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectorSpec$ebnf$2", "symbols": [/[^\]]/]},
    {"name": "selectorSpec$ebnf$2", "symbols": ["selectorSpec$ebnf$2", /[^\]]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectorSpec$ebnf$3$subexpression$1$ebnf$1", "symbols": []},
    {"name": "selectorSpec$ebnf$3$subexpression$1$ebnf$1", "symbols": ["selectorSpec$ebnf$3$subexpression$1$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectorSpec$ebnf$3$subexpression$1", "symbols": [{"literal":","}, "selectorSpec$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "selectorSpec$ebnf$3", "symbols": ["selectorSpec$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "selectorSpec$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectorSpec", "symbols": ["selectorSpec$ebnf$1", {"literal":"="}, "selectorSpec$ebnf$2", "selectorSpec$ebnf$3"], "postprocess": data => concat(data[0]) + data[1] + concat(data[2])},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"a"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"e"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"p"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"r"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"s"}]},
    {"name": "selectorBases", "symbols": ["selectorBases$subexpression$1"], "postprocess": id},
    {"name": "dataid$subexpression$1$ebnf$1", "symbols": [/[\w]/]},
    {"name": "dataid$subexpression$1$ebnf$1", "symbols": ["dataid$subexpression$1$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dataid$subexpression$1", "symbols": ["dataid$subexpression$1$ebnf$1", {"literal":":"}]},
    {"name": "dataid$subexpression$1", "symbols": []},
    {"name": "dataid", "symbols": ["dataid$subexpression$1", /[\w]/]},
    {"name": "tag", "symbols": [{"literal":"#"}, "dataid"]},
    {"name": "tagorid$subexpression$1", "symbols": ["tag"]},
    {"name": "tagorid$subexpression$1", "symbols": ["dataid"]},
    {"name": "tagorid", "symbols": ["tagorid$subexpression$1"], "postprocess": mid(2)},
    {"name": "advancement$string$1", "symbols": [{"literal":"a"}, {"literal":"d"}, {"literal":"v"}, {"literal":"a"}, {"literal":"n"}, {"literal":"c"}, {"literal":"e"}, {"literal":"m"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$1$subexpression$1$string$1", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$1$subexpression$1", "symbols": ["advancement$subexpression$1$subexpression$1$string$1"]},
    {"name": "advancement$subexpression$1$subexpression$1$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"v"}, {"literal":"o"}, {"literal":"k"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$1$subexpression$1", "symbols": ["advancement$subexpression$1$subexpression$1$string$2"]},
    {"name": "advancement$subexpression$1", "symbols": ["advancement$subexpression$1$subexpression$1"], "postprocess": mid(2)},
    {"name": "advancement$subexpression$2$string$1", "symbols": [{"literal":"e"}, {"literal":"v"}, {"literal":"e"}, {"literal":"r"}, {"literal":"y"}, {"literal":"t"}, {"literal":"h"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$2", "symbols": ["advancement$subexpression$2$string$1"]},
    {"name": "advancement$subexpression$2$subexpression$1$string$1", "symbols": [{"literal":"f"}, {"literal":"r"}, {"literal":"o"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$2$subexpression$1", "symbols": ["advancement$subexpression$2$subexpression$1$string$1"]},
    {"name": "advancement$subexpression$2$subexpression$1$string$2", "symbols": [{"literal":"o"}, {"literal":"n"}, {"literal":"l"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$2$subexpression$1", "symbols": ["advancement$subexpression$2$subexpression$1$string$2"]},
    {"name": "advancement$subexpression$2$subexpression$1$string$3", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"r"}, {"literal":"o"}, {"literal":"u"}, {"literal":"g"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$2$subexpression$1", "symbols": ["advancement$subexpression$2$subexpression$1$string$3"]},
    {"name": "advancement$subexpression$2$subexpression$1$string$4", "symbols": [{"literal":"u"}, {"literal":"n"}, {"literal":"t"}, {"literal":"i"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "advancement$subexpression$2$subexpression$1", "symbols": ["advancement$subexpression$2$subexpression$1$string$4"]},
    {"name": "advancement$subexpression$2", "symbols": ["advancement$subexpression$2$subexpression$1", {"literal":" "}, "dataid"]},
    {"name": "advancement", "symbols": ["advancement$string$1", "advancement$subexpression$1", {"literal":" "}, "selector", {"literal":" "}, "advancement$subexpression$2"]},
    {"name": "clear$string$1", "symbols": [{"literal":"c"}, {"literal":"l"}, {"literal":"e"}, {"literal":"a"}, {"literal":"r"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "clear$ebnf$1$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "clear$ebnf$1$subexpression$1$ebnf$1", "symbols": ["clear$ebnf$1$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "clear$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "clear$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "clear$ebnf$1", "symbols": ["clear$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "clear$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "clear", "symbols": ["clear$string$1", "selector", {"literal":" "}, "tagorid", "clear$ebnf$1"]},
    {"name": "function$string$1", "symbols": [{"literal":"f"}, {"literal":"u"}, {"literal":"n"}, {"literal":"c"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "function$subexpression$1", "symbols": ["functionBlock"], "postprocess": 
        function (data) {
          var duplicate, name;
          generated.forEach(cur => {
            if (cur.type == "function" && cur.commands.join("\n") == data[0].join("\n")) {
              duplicate = `%${/func(\d+)/.exec(cur.name)[0]}%`;
            }
          })
          if (!duplicate) {
            var num = generated.length
            name = `%crfngen${num}%`;
            generated.push({type:"function", name: `func${num}`, commands: data[0]})
          } else {
            name = duplicate;
          }
          return name;
        }
        },
    {"name": "function$subexpression$1", "symbols": ["tagorid"]},
    {"name": "function", "symbols": ["function$string$1", "function$subexpression$1"]},
    {"name": "say$string$1", "symbols": [{"literal":"s"}, {"literal":"a"}, {"literal":"y"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "say$subexpression$1$ebnf$1", "symbols": ["nnl"]},
    {"name": "say$subexpression$1$ebnf$1", "symbols": ["say$subexpression$1$ebnf$1", "nnl"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "say$subexpression$1", "symbols": ["say$subexpression$1$ebnf$1"], "postprocess": concatid},
    {"name": "say", "symbols": ["say$string$1", "say$subexpression$1"]},
    {"name": "full$ebnf$1", "symbols": []},
    {"name": "full$ebnf$1", "symbols": ["full$ebnf$1", "statementCrfn"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "full", "symbols": ["full$ebnf$1"], "postprocess": id},
    {"name": "statementCrfn$macrocall$2$subexpression$1", "symbols": ["nspStatement"]},
    {"name": "statementCrfn$macrocall$2$subexpression$1", "symbols": ["includeStatement"]},
    {"name": "statementCrfn$macrocall$2", "symbols": ["statementCrfn$macrocall$2$subexpression$1"]},
    {"name": "statementCrfn$macrocall$1", "symbols": ["statementCrfn$macrocall$2", "between"], "postprocess": data => data[0][0]},
    {"name": "statementCrfn", "symbols": ["statementCrfn$macrocall$1"], "postprocess": id},
    {"name": "includeStatement$string$1", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"c"}, {"literal":"l"}, {"literal":"u"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "includeStatement", "symbols": ["includeStatement$string$1", "__", "string"], "postprocess": data => ({type: "include", include: data[2]})},
    {"name": "nspStatement$string$1", "symbols": [{"literal":"n"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"s"}, {"literal":"p"}, {"literal":"a"}, {"literal":"c"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "nspStatement$macrocall$2", "symbols": ["statementFolderornsp"]},
    {"name": "nspStatement$macrocall$1$ebnf$1", "symbols": []},
    {"name": "nspStatement$macrocall$1$ebnf$1$subexpression$1", "symbols": ["_", "nspStatement$macrocall$2", "nl"], "postprocess": data => data[1]},
    {"name": "nspStatement$macrocall$1$ebnf$1", "symbols": ["nspStatement$macrocall$1$ebnf$1", "nspStatement$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "nspStatement$macrocall$1", "symbols": [{"literal":"{"}, "nl", "nspStatement$macrocall$1$ebnf$1", "_", {"literal":"}"}, "between"], "postprocess": data => data[2]},
    {"name": "nspStatement", "symbols": ["nspStatement$string$1", "__", "variableName", "_", "nspStatement$macrocall$1"], "postprocess": 
        data => {
        	var ret = {type: "namespace", name: data[2], data: data[4].map(cur=>cur[0][0]).concat([{type: "folder", name: "crfngen", data: generated}])};
        	generated = [];
        	return ret;
        }
        },
    {"name": "statementFolderornsp$macrocall$2$subexpression$1", "symbols": ["functionStatement"]},
    {"name": "statementFolderornsp$macrocall$2$subexpression$1", "symbols": ["folderStatement"]},
    {"name": "statementFolderornsp$macrocall$2", "symbols": ["statementFolderornsp$macrocall$2$subexpression$1"]},
    {"name": "statementFolderornsp$macrocall$1", "symbols": ["statementFolderornsp$macrocall$2", "between"], "postprocess": data => data[0][0]},
    {"name": "statementFolderornsp", "symbols": ["statementFolderornsp$macrocall$1"], "postprocess": id},
    {"name": "folderStatement$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"l"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "folderStatement$macrocall$2", "symbols": ["statementFolderornsp"]},
    {"name": "folderStatement$macrocall$1$ebnf$1", "symbols": []},
    {"name": "folderStatement$macrocall$1$ebnf$1$subexpression$1", "symbols": ["_", "folderStatement$macrocall$2", "nl"], "postprocess": data => data[1]},
    {"name": "folderStatement$macrocall$1$ebnf$1", "symbols": ["folderStatement$macrocall$1$ebnf$1", "folderStatement$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "folderStatement$macrocall$1", "symbols": [{"literal":"{"}, "nl", "folderStatement$macrocall$1$ebnf$1", "_", {"literal":"}"}, "between"], "postprocess": data => data[2]},
    {"name": "folderStatement", "symbols": ["folderStatement$string$1", "__", "variableName", "_", "folderStatement$macrocall$1"], "postprocess": data => ({type: "folder", name: data[2], data: data[4][0].map(cur=>cur[0])})},
    {"name": "functionStatement$ebnf$1$string$1", "symbols": [{"literal":"t"}, {"literal":"i"}, {"literal":"c"}, {"literal":"k"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "functionStatement$ebnf$1", "symbols": ["functionStatement$ebnf$1$string$1"], "postprocess": id},
    {"name": "functionStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "functionStatement$string$1", "symbols": [{"literal":"f"}, {"literal":"u"}, {"literal":"n"}, {"literal":"c"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "functionStatement", "symbols": ["functionStatement$ebnf$1", "functionStatement$string$1", "__", "variableName", "_", "functionBlock"], "postprocess": 
        data => ({type: "function", name: data[3], commands: data[5], tick: !!data[0]})
        },
    {"name": "variableName$ebnf$1", "symbols": [/[\w]/]},
    {"name": "variableName$ebnf$1", "symbols": ["variableName$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variableName", "symbols": ["variableName$ebnf$1"], "postprocess": concatid},
    {"name": "functionBlock$macrocall$2", "symbols": ["command"]},
    {"name": "functionBlock$macrocall$1$ebnf$1", "symbols": []},
    {"name": "functionBlock$macrocall$1$ebnf$1$subexpression$1", "symbols": ["_", "functionBlock$macrocall$2", "nl"], "postprocess": data => data[1]},
    {"name": "functionBlock$macrocall$1$ebnf$1", "symbols": ["functionBlock$macrocall$1$ebnf$1", "functionBlock$macrocall$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "functionBlock$macrocall$1", "symbols": [{"literal":"{"}, "nl", "functionBlock$macrocall$1$ebnf$1", "_", {"literal":"}"}, "between"], "postprocess": data => data[2]},
    {"name": "functionBlock", "symbols": ["functionBlock$macrocall$1"], "postprocess": data => data[0].map(cur=>cur[0])},
    {"name": "between$ebnf$1", "symbols": []},
    {"name": "between$ebnf$1$subexpression$1", "symbols": ["_", "nl"]},
    {"name": "between$ebnf$1", "symbols": ["between$ebnf$1", "between$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "between", "symbols": ["between$ebnf$1"], "postprocess": nuller},
    {"name": "string", "symbols": ["dqstring"], "postprocess": id},
    {"name": "string", "symbols": ["sqstring"], "postprocess": id},
    {"name": "nl$ebnf$1", "symbols": [{"literal":"\r"}], "postprocess": id},
    {"name": "nl$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "nl", "symbols": ["nl$ebnf$1", {"literal":"\n"}]},
    {"name": "nnl", "symbols": [/[^\r\n]/]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\t ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": id},
    {"name": "__$ebnf$1", "symbols": [/[\t ]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\t ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": id}
]
  , ParserStart: "full"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
