@{%
  function flatten(arr) {
    return Array.isArray(arr) ? arr.reduce((flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []) : [arr];
  }
%}
@include "nbt.ne"

selector -> "@" selectorBases ("[" selectorSpec:+ "]"):? | w+
selectorSpec -> w+ "=" (nbt | range | "!":? w+) ("," " ":*):?
selectorBases -> ("a" | "e" | "p" | "r" | "s") {% id %}
dataid -> (w+ ":" | null) w+
tag -> "#" dataid
tagorid -> tag | dataid
pos -> 1pos " " 1pos " " 1pos
1pos -> ("^" | "~" | null) (d+ | null)
path -> [\w"'\.[\]]:*
gmode -> "survival" | "creative" | "adventure" | "spectator"
difclty -> "easy" | "normal" | "hard" | "peaceful"
dimension -> "overworld" | "the_end" | "the_nether"
anchor -> "feet" | "eyes"
range -> d+:? "..":? d+:?
datatype -> "byte" | "double" | "float" | "int" | "long" | "short"
path -> [\[\]"\w]:+
condition -> "block " pos " " tagorid
  | "blocks " pos " " pos " " pos " " ("all" | "masked")
  | "entity " selector
  | "score " selector " " w+ " " (("<" | "<=" | "=" | "=>" | ">") " " selector " " w+ | "matches " range)


advancement -> "advancement " ("grant" | "revoke") " " selector " " ("everything" | ("from" | "only" | "through" | "until") " " dataid)
blockdata -> "blockdata " nnl+
clear -> "clear " selector (" " tagorid (" " d+):?):?
clone -> "clone " pos " " pos " " pos
data -> "data " nnl+
datapack -> "datapack " nnl+
debug -> "debug " ("start" | "stop")
defaultgamemode -> "defaultgamemode " gmode
difficulty -> "difficulty " difclty
effect -> "effect " nnl+
enchant -> "enchant " selector " " tagorid " " d+
execute -> "execute" (" " (
  ("at" | "as") " " selector
  | "positioned " (pos | "at " selector)
  | "facing " pos
  | "align " [x-z]:+
  | "facing " (pos | "entity " selector " " anchor)
  | "rotated " (d+ " " d+ | "as " selector)
  | "in " dimension
  | "anchored " anchor
  | ("if" | "unless") " " condition
  | "store " ("result" | "success") " " (
    "block " pos " " path " " datatype
    | "bossbar " dataid " " ("max" | "value")
    | "entity " selector " " path " " datatype
    | "score " selector " " w+
    )
  )):*
  (" " ("run" | "runat" {% () => "run execute at @s run" %}) " " command):? {%
    data => {
      data = JSON.parse(JSON.stringify(data))
      let command = flatten(data[2] ? data[2][3] : undefined)[0];
      if (data[2]) data[2][3] = "%EXECUTECOMMAND%";
      return {
        type: "execute",
        command,
        text: flatten(data).join("")
      }
    }
  %}
experience -> "experience " (
  ("add " selector " " int | "set " selector " " d+) " " ("levels" | "points")
  | "query " selector
  )
fill -> "fill " nnl+
function -> "function " (functionBlock {%
  data => ({
    type: "function",
    commands: data[0]
  })
%} | tagorid) {% data => data[1].type == "function" ? data[1] : data %}
gamemode -> "gamemode " gmode
gamerule -> "gamerule " nnl+
give -> "give " selector " " tagorid [\d]:*
help -> "help " command
if -> "if " "not ":? condition " " functionBlock {% 
  data => ({
    type: "execute",
    command: {
      type: "function",
      commands: data[4]
    },
    text: `execute ${data[1] ? "unless" : "if"} ${data[2]} run %EXECUTECOMMAND%`
  })
%}
kill -> "kill " selector
locate -> "locate " nnl+
msg -> "msg " selector " " nnl+
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

command -> (advancement|blockdata|bossbar|clear|clone|data|defaultgamemode|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|kill|locate|msg|particle|playsound|recipe|reload|replaceitem|say|scoreboard|tag|team|seed|setblock|setworldspawn|spreadplayers|stopsound|summon|teleport|tellraw|tell|time|title|tp|trigger|weather|worldborder|xp) {%
  data => {
    data = data[0][0]
    let cond = data.type == "execute";
    if (Array.isArray(data)) {
      data = { text: data };
    }
    data.text = flatten(data.text).join("");
    return data;
  }
%}
