@{%
  function mid(num) {
    return data => eval(`data${"[0]".repeat(num)}`);
  }
%}
@builtin "number.ne"

command -> (advancement|bossbar|clear|clone|data|defaultgamemode|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|kill|locate|msg|particle|playsound|recipe|reload|replaceitem|say|scoreboard|tag|team|seed|setblock|setworldspawn|spreadplayers|stopsound|summon|teleport|tellraw|tell|time|title|tp|trigger|w|weather|worldborder|xp) {% data => data[0][0].join("") %}

selector -> "@" selectorBases ("[" selectorSpec:+ "]" {% concat %}):? {% concat %} | [\w]
selectorSpec -> [\w]:+ "=" [^\]]:+ ("," " ":*):? {% data => concat(data[0]) + data[1] + concat(data[2]) %}
selectorBases -> ("a" | "e" | "p" | "r" | "s") {% id %}
dataid -> ([\w]:+ ":" | null) [\w]
tag -> "#" dataid
tagorid -> (tag | dataid) {% mid(2) %}


advancement -> "advancement " (("grant" | "revoke") {% mid(2) %}) " " selector " " ("everything" | ("from" | "only" | "through" | "until") " " dataid)
clear -> "clear " selector " " tagorid (" " [0-9]:+):?
function -> "function " (functionBlock {%
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
%} | tagorid)
say -> "say " (nnl:+ {% concatid %})
