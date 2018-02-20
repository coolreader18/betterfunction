@{%
  function mid(num) {
    return data => eval(`data${"[0]".repeat(num)}`);
  }
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }
%}
@builtin "number.ne"


selector -> "@" selectorBases ("[" selectorSpec:+ "]" {% concat %}):? {% concat %} | [\w]
selectorSpec -> w+ "=" [^\]]:+ ("," " ":*):? {% data => concat(data[0]) + data[1] + concat(data[2]) %}
selectorBases -> ("a" | "e" | "p" | "r" | "s") {% id %}
dataid -> (w+ ":" | null) w+
tag -> "#" dataid
tagorid -> (tag | dataid) {% mid(2) %}
pos -> 1pos " " 1pos " " 1pos
1pos -> ("^" | "~" | null) (d+ | null)
path -> [\w"'\.[\]]:*
gmode -> ("survival" | "creative" | "adventure" | "spectator")
difclty -> ("easy" | "normal" | "hard" | "peaceful")
nbt -> "{" nnl+ "}"

advancement -> "advancement " (("grant" | "revoke") {% mid(2) %}) " " selector " " ("everything" | ("from" | "only" | "through" | "until") " " dataid)
blockdata -> "blockdata " nnl+
clear -> "clear " selector (" " tagorid (" " [0-9]:+):?):?
clone -> "clone " pos " " pos " " pos
data -> "data " nnl+
datapack -> "datapack " nnl+
debug -> "debug " ("start" | "stop")
defaultgamemode -> "defaultgamemode " gmode
difficulty -> "difficulty " difclty
effect -> "effect " nnl+
enchant -> "enchant " selector " " tagorid " " d+
execute -> "execute " nnl+
fill -> "fill " nnl+
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
gamemode -> "gamemode " gmode
gamerule -> "gamerule " nnl+
give -> "give " selector " " tagorid [\d]:*
help -> "help " command
kill -> "kill " selector
locate -> "locate " nnl+
particle -> "particle " nnl+
recipe -> "recipe " ("give" | "take") " " selector " " (tagorid | "*")
reload -> "reload" _
say -> "say " nnl+
scoreboard -> "scoreboard " nnl+
seed -> "seed" _
setblock -> "setblock " pos " " dataid (" " ("destroy" | "keep" | "replace")):?
setworldspawn -> "setworldspawn " pos
spawnpoint -> "spawnpoint " selector " " pos
spreadplayers -> "spreadplayers " nnl+
stop -> "stop" _
stopsound -> "stopsound " nnl+
summon -> "summon " dataid (" " pos (" " nbt):?):?
tag -> "tag " selector " " ("list" | ("add" | "remove") w+)
team -> "team " nnl+
teleport -> "teleport " (selector (selector | pos):? | pos)
tell -> "tell " selector " " nnl:*
tellraw -> "tellraw " selector " " nnl+
time -> "time " nnl+
title -> "title " selector " " nnl+
tp -> teleport
trigger -> "trigger " w+ " " ("add" | "set") d+
weather -> "weather " ("clear" | "rain" | "thunder") (" " d+ ):?
worldborder -> "worldborder " nnl+
xp -> experience

command -> (advancement|blockdata|bossbar|clear|clone|data|defaultgamemode|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|kill|locate|msg|particle|playsound|recipe|reload|replaceitem|say|scoreboard|tag|team|seed|setblock|setworldspawn|spreadplayers|stopsound|summon|teleport|tellraw|tell|time|title|tp|trigger|w|weather|worldborder|xp) {% data => flatten(data[0][0]).filter(cur=>cur!==null).join("") %}
