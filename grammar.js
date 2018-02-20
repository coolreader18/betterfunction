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
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
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
    {"name": "selector$ebnf$1$subexpression$1$ebnf$1", "symbols": ["selectorSpec"]},
    {"name": "selector$ebnf$1$subexpression$1$ebnf$1", "symbols": ["selector$ebnf$1$subexpression$1$ebnf$1", "selectorSpec"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selector$ebnf$1$subexpression$1", "symbols": [{"literal":"["}, "selector$ebnf$1$subexpression$1$ebnf$1", {"literal":"]"}], "postprocess": concat},
    {"name": "selector$ebnf$1", "symbols": ["selector$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "selector$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selector", "symbols": [{"literal":"@"}, "selectorBases", "selector$ebnf$1"], "postprocess": concat},
    {"name": "selector", "symbols": [/[\w]/]},
    {"name": "selectorSpec$ebnf$1", "symbols": [/[^\]]/]},
    {"name": "selectorSpec$ebnf$1", "symbols": ["selectorSpec$ebnf$1", /[^\]]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectorSpec$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "selectorSpec$ebnf$2$subexpression$1$ebnf$1", "symbols": ["selectorSpec$ebnf$2$subexpression$1$ebnf$1", {"literal":" "}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "selectorSpec$ebnf$2$subexpression$1", "symbols": [{"literal":","}, "selectorSpec$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "selectorSpec$ebnf$2", "symbols": ["selectorSpec$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "selectorSpec$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "selectorSpec", "symbols": ["w+", {"literal":"="}, "selectorSpec$ebnf$1", "selectorSpec$ebnf$2"], "postprocess": data => concat(data[0]) + data[1] + concat(data[2])},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"a"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"e"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"p"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"r"}]},
    {"name": "selectorBases$subexpression$1", "symbols": [{"literal":"s"}]},
    {"name": "selectorBases", "symbols": ["selectorBases$subexpression$1"], "postprocess": id},
    {"name": "dataid$subexpression$1", "symbols": ["w+", {"literal":":"}]},
    {"name": "dataid$subexpression$1", "symbols": []},
    {"name": "dataid", "symbols": ["dataid$subexpression$1", "w+"]},
    {"name": "tag", "symbols": [{"literal":"#"}, "dataid"]},
    {"name": "tagorid$subexpression$1", "symbols": ["tag"]},
    {"name": "tagorid$subexpression$1", "symbols": ["dataid"]},
    {"name": "tagorid", "symbols": ["tagorid$subexpression$1"], "postprocess": mid(2)},
    {"name": "pos", "symbols": ["1pos", {"literal":" "}, "1pos", {"literal":" "}, "1pos"]},
    {"name": "1pos$subexpression$1", "symbols": [{"literal":"^"}]},
    {"name": "1pos$subexpression$1", "symbols": [{"literal":"~"}]},
    {"name": "1pos$subexpression$1", "symbols": []},
    {"name": "1pos$subexpression$2", "symbols": ["d+"]},
    {"name": "1pos$subexpression$2", "symbols": []},
    {"name": "1pos", "symbols": ["1pos$subexpression$1", "1pos$subexpression$2"]},
    {"name": "path$ebnf$1", "symbols": []},
    {"name": "path$ebnf$1", "symbols": ["path$ebnf$1", /[\w"'\.[\]]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "path", "symbols": ["path$ebnf$1"]},
    {"name": "gmode$subexpression$1$string$1", "symbols": [{"literal":"s"}, {"literal":"u"}, {"literal":"r"}, {"literal":"v"}, {"literal":"i"}, {"literal":"v"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "gmode$subexpression$1", "symbols": ["gmode$subexpression$1$string$1"]},
    {"name": "gmode$subexpression$1$string$2", "symbols": [{"literal":"c"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"i"}, {"literal":"v"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "gmode$subexpression$1", "symbols": ["gmode$subexpression$1$string$2"]},
    {"name": "gmode$subexpression$1$string$3", "symbols": [{"literal":"a"}, {"literal":"d"}, {"literal":"v"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "gmode$subexpression$1", "symbols": ["gmode$subexpression$1$string$3"]},
    {"name": "gmode$subexpression$1$string$4", "symbols": [{"literal":"s"}, {"literal":"p"}, {"literal":"e"}, {"literal":"c"}, {"literal":"t"}, {"literal":"a"}, {"literal":"t"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "gmode$subexpression$1", "symbols": ["gmode$subexpression$1$string$4"]},
    {"name": "gmode", "symbols": ["gmode$subexpression$1"]},
    {"name": "difclty$subexpression$1$string$1", "symbols": [{"literal":"e"}, {"literal":"a"}, {"literal":"s"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "difclty$subexpression$1", "symbols": ["difclty$subexpression$1$string$1"]},
    {"name": "difclty$subexpression$1$string$2", "symbols": [{"literal":"n"}, {"literal":"o"}, {"literal":"r"}, {"literal":"m"}, {"literal":"a"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "difclty$subexpression$1", "symbols": ["difclty$subexpression$1$string$2"]},
    {"name": "difclty$subexpression$1$string$3", "symbols": [{"literal":"h"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "difclty$subexpression$1", "symbols": ["difclty$subexpression$1$string$3"]},
    {"name": "difclty$subexpression$1$string$4", "symbols": [{"literal":"p"}, {"literal":"e"}, {"literal":"a"}, {"literal":"c"}, {"literal":"e"}, {"literal":"f"}, {"literal":"u"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "difclty$subexpression$1", "symbols": ["difclty$subexpression$1$string$4"]},
    {"name": "difclty", "symbols": ["difclty$subexpression$1"]},
    {"name": "nbt", "symbols": [{"literal":"{"}, "nnl+", {"literal":"}"}]},
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
    {"name": "blockdata$string$1", "symbols": [{"literal":"b"}, {"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"k"}, {"literal":"d"}, {"literal":"a"}, {"literal":"t"}, {"literal":"a"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "blockdata", "symbols": ["blockdata$string$1", "nnl+"]},
    {"name": "clear$string$1", "symbols": [{"literal":"c"}, {"literal":"l"}, {"literal":"e"}, {"literal":"a"}, {"literal":"r"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "clear$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "clear$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1", "symbols": ["clear$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "clear$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "clear$ebnf$1$subexpression$1$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "clear$ebnf$1$subexpression$1$ebnf$1", "symbols": ["clear$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "clear$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "clear$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "tagorid", "clear$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "clear$ebnf$1", "symbols": ["clear$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "clear$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "clear", "symbols": ["clear$string$1", "selector", "clear$ebnf$1"]},
    {"name": "clone$string$1", "symbols": [{"literal":"c"}, {"literal":"l"}, {"literal":"o"}, {"literal":"n"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "clone", "symbols": ["clone$string$1", "pos", {"literal":" "}, "pos", {"literal":" "}, "pos"]},
    {"name": "data$string$1", "symbols": [{"literal":"d"}, {"literal":"a"}, {"literal":"t"}, {"literal":"a"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "data", "symbols": ["data$string$1", "nnl+"]},
    {"name": "datapack$string$1", "symbols": [{"literal":"d"}, {"literal":"a"}, {"literal":"t"}, {"literal":"a"}, {"literal":"p"}, {"literal":"a"}, {"literal":"c"}, {"literal":"k"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "datapack", "symbols": ["datapack$string$1", "nnl+"]},
    {"name": "debug$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"b"}, {"literal":"u"}, {"literal":"g"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "debug$subexpression$1$string$1", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"a"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "debug$subexpression$1", "symbols": ["debug$subexpression$1$string$1"]},
    {"name": "debug$subexpression$1$string$2", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "debug$subexpression$1", "symbols": ["debug$subexpression$1$string$2"]},
    {"name": "debug", "symbols": ["debug$string$1", "debug$subexpression$1"]},
    {"name": "defaultgamemode$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"f"}, {"literal":"a"}, {"literal":"u"}, {"literal":"l"}, {"literal":"t"}, {"literal":"g"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"m"}, {"literal":"o"}, {"literal":"d"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "defaultgamemode", "symbols": ["defaultgamemode$string$1", "gmode"]},
    {"name": "difficulty$string$1", "symbols": [{"literal":"d"}, {"literal":"i"}, {"literal":"f"}, {"literal":"f"}, {"literal":"i"}, {"literal":"c"}, {"literal":"u"}, {"literal":"l"}, {"literal":"t"}, {"literal":"y"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "difficulty", "symbols": ["difficulty$string$1", "difclty"]},
    {"name": "effect$string$1", "symbols": [{"literal":"e"}, {"literal":"f"}, {"literal":"f"}, {"literal":"e"}, {"literal":"c"}, {"literal":"t"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "effect", "symbols": ["effect$string$1", "nnl+"]},
    {"name": "enchant$string$1", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"c"}, {"literal":"h"}, {"literal":"a"}, {"literal":"n"}, {"literal":"t"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "enchant", "symbols": ["enchant$string$1", "selector", {"literal":" "}, "tagorid", {"literal":" "}, "d+"]},
    {"name": "execute$string$1", "symbols": [{"literal":"e"}, {"literal":"x"}, {"literal":"e"}, {"literal":"c"}, {"literal":"u"}, {"literal":"t"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "execute", "symbols": ["execute$string$1", "nnl+"]},
    {"name": "fill$string$1", "symbols": [{"literal":"f"}, {"literal":"i"}, {"literal":"l"}, {"literal":"l"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "fill", "symbols": ["fill$string$1", "nnl+"]},
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
    {"name": "gamemode$string$1", "symbols": [{"literal":"g"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"m"}, {"literal":"o"}, {"literal":"d"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "gamemode", "symbols": ["gamemode$string$1", "gmode"]},
    {"name": "gamerule$string$1", "symbols": [{"literal":"g"}, {"literal":"a"}, {"literal":"m"}, {"literal":"e"}, {"literal":"r"}, {"literal":"u"}, {"literal":"l"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "gamerule", "symbols": ["gamerule$string$1", "nnl+"]},
    {"name": "give$string$1", "symbols": [{"literal":"g"}, {"literal":"i"}, {"literal":"v"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "give$ebnf$1", "symbols": []},
    {"name": "give$ebnf$1", "symbols": ["give$ebnf$1", /[\d]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "give", "symbols": ["give$string$1", "selector", {"literal":" "}, "tagorid", "give$ebnf$1"]},
    {"name": "help$string$1", "symbols": [{"literal":"h"}, {"literal":"e"}, {"literal":"l"}, {"literal":"p"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "help", "symbols": ["help$string$1", "command"]},
    {"name": "kill$string$1", "symbols": [{"literal":"k"}, {"literal":"i"}, {"literal":"l"}, {"literal":"l"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "kill", "symbols": ["kill$string$1", "selector"]},
    {"name": "locate$string$1", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "locate", "symbols": ["locate$string$1", "nnl+"]},
    {"name": "particle$string$1", "symbols": [{"literal":"p"}, {"literal":"a"}, {"literal":"r"}, {"literal":"t"}, {"literal":"i"}, {"literal":"c"}, {"literal":"l"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "particle", "symbols": ["particle$string$1", "nnl+"]},
    {"name": "recipe$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"c"}, {"literal":"i"}, {"literal":"p"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "recipe$subexpression$1$string$1", "symbols": [{"literal":"g"}, {"literal":"i"}, {"literal":"v"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "recipe$subexpression$1", "symbols": ["recipe$subexpression$1$string$1"]},
    {"name": "recipe$subexpression$1$string$2", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"k"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "recipe$subexpression$1", "symbols": ["recipe$subexpression$1$string$2"]},
    {"name": "recipe$subexpression$2", "symbols": ["tagorid"]},
    {"name": "recipe$subexpression$2", "symbols": [{"literal":"*"}]},
    {"name": "recipe", "symbols": ["recipe$string$1", "recipe$subexpression$1", {"literal":" "}, "selector", {"literal":" "}, "recipe$subexpression$2"]},
    {"name": "reload$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"l"}, {"literal":"o"}, {"literal":"a"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "reload", "symbols": ["reload$string$1", "_"]},
    {"name": "say$string$1", "symbols": [{"literal":"s"}, {"literal":"a"}, {"literal":"y"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "say", "symbols": ["say$string$1", "nnl+"]},
    {"name": "scoreboard$string$1", "symbols": [{"literal":"s"}, {"literal":"c"}, {"literal":"o"}, {"literal":"r"}, {"literal":"e"}, {"literal":"b"}, {"literal":"o"}, {"literal":"a"}, {"literal":"r"}, {"literal":"d"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "scoreboard", "symbols": ["scoreboard$string$1", "nnl+"]},
    {"name": "seed$string$1", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"e"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "seed", "symbols": ["seed$string$1", "_"]},
    {"name": "setblock$string$1", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}, {"literal":"b"}, {"literal":"l"}, {"literal":"o"}, {"literal":"c"}, {"literal":"k"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "setblock$ebnf$1$subexpression$1$subexpression$1$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"s"}, {"literal":"t"}, {"literal":"r"}, {"literal":"o"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "setblock$ebnf$1$subexpression$1$subexpression$1", "symbols": ["setblock$ebnf$1$subexpression$1$subexpression$1$string$1"]},
    {"name": "setblock$ebnf$1$subexpression$1$subexpression$1$string$2", "symbols": [{"literal":"k"}, {"literal":"e"}, {"literal":"e"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "setblock$ebnf$1$subexpression$1$subexpression$1", "symbols": ["setblock$ebnf$1$subexpression$1$subexpression$1$string$2"]},
    {"name": "setblock$ebnf$1$subexpression$1$subexpression$1$string$3", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"p"}, {"literal":"l"}, {"literal":"a"}, {"literal":"c"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "setblock$ebnf$1$subexpression$1$subexpression$1", "symbols": ["setblock$ebnf$1$subexpression$1$subexpression$1$string$3"]},
    {"name": "setblock$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "setblock$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "setblock$ebnf$1", "symbols": ["setblock$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "setblock$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "setblock", "symbols": ["setblock$string$1", "pos", {"literal":" "}, "dataid", "setblock$ebnf$1"]},
    {"name": "setworldspawn$string$1", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}, {"literal":"w"}, {"literal":"o"}, {"literal":"r"}, {"literal":"l"}, {"literal":"d"}, {"literal":"s"}, {"literal":"p"}, {"literal":"a"}, {"literal":"w"}, {"literal":"n"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "setworldspawn", "symbols": ["setworldspawn$string$1", "pos"]},
    {"name": "spawnpoint$string$1", "symbols": [{"literal":"s"}, {"literal":"p"}, {"literal":"a"}, {"literal":"w"}, {"literal":"n"}, {"literal":"p"}, {"literal":"o"}, {"literal":"i"}, {"literal":"n"}, {"literal":"t"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "spawnpoint", "symbols": ["spawnpoint$string$1", "selector", {"literal":" "}, "pos"]},
    {"name": "spreadplayers$string$1", "symbols": [{"literal":"s"}, {"literal":"p"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"d"}, {"literal":"p"}, {"literal":"l"}, {"literal":"a"}, {"literal":"y"}, {"literal":"e"}, {"literal":"r"}, {"literal":"s"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "spreadplayers", "symbols": ["spreadplayers$string$1", "nnl+"]},
    {"name": "stop$string$1", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"o"}, {"literal":"p"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "stop", "symbols": ["stop$string$1", "_"]},
    {"name": "stopsound$string$1", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"o"}, {"literal":"p"}, {"literal":"s"}, {"literal":"o"}, {"literal":"u"}, {"literal":"n"}, {"literal":"d"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "stopsound", "symbols": ["stopsound$string$1", "nnl+"]},
    {"name": "summon$string$1", "symbols": [{"literal":"s"}, {"literal":"u"}, {"literal":"m"}, {"literal":"m"}, {"literal":"o"}, {"literal":"n"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "summon$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "nbt"]},
    {"name": "summon$ebnf$1$subexpression$1$ebnf$1", "symbols": ["summon$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "summon$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "summon$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "pos", "summon$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "summon$ebnf$1", "symbols": ["summon$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "summon$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "summon", "symbols": ["summon$string$1", "dataid", "summon$ebnf$1"]},
    {"name": "tag$string$1", "symbols": [{"literal":"t"}, {"literal":"a"}, {"literal":"g"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "tag$subexpression$1$string$1", "symbols": [{"literal":"l"}, {"literal":"i"}, {"literal":"s"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "tag$subexpression$1", "symbols": ["tag$subexpression$1$string$1"]},
    {"name": "tag$subexpression$1$subexpression$1$string$1", "symbols": [{"literal":"a"}, {"literal":"d"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "tag$subexpression$1$subexpression$1", "symbols": ["tag$subexpression$1$subexpression$1$string$1"]},
    {"name": "tag$subexpression$1$subexpression$1$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"m"}, {"literal":"o"}, {"literal":"v"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "tag$subexpression$1$subexpression$1", "symbols": ["tag$subexpression$1$subexpression$1$string$2"]},
    {"name": "tag$subexpression$1", "symbols": ["tag$subexpression$1$subexpression$1", "w+"]},
    {"name": "tag", "symbols": ["tag$string$1", "selector", {"literal":" "}, "tag$subexpression$1"]},
    {"name": "team$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"a"}, {"literal":"m"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "team", "symbols": ["team$string$1", "nnl+"]},
    {"name": "teleport$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"l"}, {"literal":"e"}, {"literal":"p"}, {"literal":"o"}, {"literal":"r"}, {"literal":"t"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "teleport$subexpression$1$ebnf$1$subexpression$1", "symbols": ["selector"]},
    {"name": "teleport$subexpression$1$ebnf$1$subexpression$1", "symbols": ["pos"]},
    {"name": "teleport$subexpression$1$ebnf$1", "symbols": ["teleport$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "teleport$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "teleport$subexpression$1", "symbols": ["selector", "teleport$subexpression$1$ebnf$1"]},
    {"name": "teleport$subexpression$1", "symbols": ["pos"]},
    {"name": "teleport", "symbols": ["teleport$string$1", "teleport$subexpression$1"]},
    {"name": "tell$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"l"}, {"literal":"l"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "tell$ebnf$1", "symbols": []},
    {"name": "tell$ebnf$1", "symbols": ["tell$ebnf$1", "nnl"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "tell", "symbols": ["tell$string$1", "selector", {"literal":" "}, "tell$ebnf$1"]},
    {"name": "tellraw$string$1", "symbols": [{"literal":"t"}, {"literal":"e"}, {"literal":"l"}, {"literal":"l"}, {"literal":"r"}, {"literal":"a"}, {"literal":"w"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "tellraw", "symbols": ["tellraw$string$1", "selector", {"literal":" "}, "nnl+"]},
    {"name": "time$string$1", "symbols": [{"literal":"t"}, {"literal":"i"}, {"literal":"m"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "time", "symbols": ["time$string$1", "nnl+"]},
    {"name": "title$string$1", "symbols": [{"literal":"t"}, {"literal":"i"}, {"literal":"t"}, {"literal":"l"}, {"literal":"e"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "title", "symbols": ["title$string$1", "selector", {"literal":" "}, "nnl+"]},
    {"name": "tp", "symbols": ["teleport"]},
    {"name": "trigger$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"i"}, {"literal":"g"}, {"literal":"g"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "trigger$subexpression$1$string$1", "symbols": [{"literal":"a"}, {"literal":"d"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "trigger$subexpression$1", "symbols": ["trigger$subexpression$1$string$1"]},
    {"name": "trigger$subexpression$1$string$2", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "trigger$subexpression$1", "symbols": ["trigger$subexpression$1$string$2"]},
    {"name": "trigger", "symbols": ["trigger$string$1", "w+", {"literal":" "}, "trigger$subexpression$1", "d+"]},
    {"name": "weather$string$1", "symbols": [{"literal":"w"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"h"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weather$subexpression$1$string$1", "symbols": [{"literal":"c"}, {"literal":"l"}, {"literal":"e"}, {"literal":"a"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weather$subexpression$1", "symbols": ["weather$subexpression$1$string$1"]},
    {"name": "weather$subexpression$1$string$2", "symbols": [{"literal":"r"}, {"literal":"a"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weather$subexpression$1", "symbols": ["weather$subexpression$1$string$2"]},
    {"name": "weather$subexpression$1$string$3", "symbols": [{"literal":"t"}, {"literal":"h"}, {"literal":"u"}, {"literal":"n"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "weather$subexpression$1", "symbols": ["weather$subexpression$1$string$3"]},
    {"name": "weather$ebnf$1$subexpression$1", "symbols": [{"literal":" "}, "d+"]},
    {"name": "weather$ebnf$1", "symbols": ["weather$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "weather$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "weather", "symbols": ["weather$string$1", "weather$subexpression$1", "weather$ebnf$1"]},
    {"name": "worldborder$string$1", "symbols": [{"literal":"w"}, {"literal":"o"}, {"literal":"r"}, {"literal":"l"}, {"literal":"d"}, {"literal":"b"}, {"literal":"o"}, {"literal":"r"}, {"literal":"d"}, {"literal":"e"}, {"literal":"r"}, {"literal":" "}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "worldborder", "symbols": ["worldborder$string$1", "nnl+"]},
    {"name": "xp", "symbols": ["experience"]},
    {"name": "command$subexpression$1", "symbols": ["advancement"]},
    {"name": "command$subexpression$1", "symbols": ["blockdata"]},
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
    {"name": "command", "symbols": ["command$subexpression$1"], "postprocess": data => flatten(data[0][0]).filter(cur=>cur!==null).join("")},
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
    {"name": "nnl+$ebnf$1", "symbols": ["nnl"]},
    {"name": "nnl+$ebnf$1", "symbols": ["nnl+$ebnf$1", "nnl"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "nnl+", "symbols": ["nnl+$ebnf$1"], "postprocess": concatid},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\t ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": id},
    {"name": "__$ebnf$1", "symbols": [/[\t ]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\t ]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": id},
    {"name": "w+$ebnf$1", "symbols": [/[\w]/]},
    {"name": "w+$ebnf$1", "symbols": ["w+$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "w+", "symbols": ["w+$ebnf$1"], "postprocess": concatid},
    {"name": "d+$ebnf$1", "symbols": [/[\d]/]},
    {"name": "d+$ebnf$1", "symbols": ["d+$ebnf$1", /[\d]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "d+", "symbols": ["d+$ebnf$1"], "postprocess": concatid}
]
  , ParserStart: "full"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
