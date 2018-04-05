@{%
  function flatten(arr) {
    return Array.isArray(arr) ? arr.reduce((flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []) : [arr];
  }
%}
@include "nbt.ne"
@include "large-data.ne"

selector -> "@" selectorBases ("[" selectorSpec:+ "]"):? | word
selectorSpec -> word "=" (nbt | range | "!":? word) ("," " ":*):?
selectorBases -> ("a" | "e" | "p" | "r" | "s")
dataid -> (word ":" | null) word
tag -> "#" dataid
tagorid -> tag | dataid
1pos -> "~" double | "~" | double
rayPos -> "^" double
pos -> 1pos " " 1pos " " 1pos
  | rayPos " " rayPos " " rayPos
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
  | "score " selector " " word " " (("<" | "<=" | "=" | "=>" | ">") " " selector " " word | "matches " range)
word -> [\w-_+\.]:+
operation -> ("%" | "+" | "*" | "-" | "/" | null) "=" | "<" | ">" | "><"


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
    | "score " selector " " word
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
experience -> ("experience" | "xp") " " ("add " selector " " int
  | "set " selector " " d+ " " ("levels" | "points")
  | "query " selector)
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
    type: "if",
    condition: flatten(data[2]).join(""),
    commands: data[4],
    not: !!data[1]
  })
%}
kill -> "kill " selector
locate -> "locate " nnl+
msg -> ("msg" | "w" | "tell") " " selector " " nnl+
particle -> "particle " nnl+
recipe -> "recipe " ("give" | "take") " " selector " " (tagorid | "*")
reload -> "reload" _
say -> "say " nnl+
scoreboard -> "scoreboard "
  ("objectives "
    ("add " word (" " criteria (" " nnl+):? | null {% () => "dummy" %})
    | "list"
    | "remove " word
    | "setdisplay " display " " word
  )
  | "players " (
    ("add" | "set") " " selector " " word " " int
    | ("enable" | "get") " " selector " " word
    | "list " selector
    | "operation " selector " " word " " operation " " selector " " word
    | "remove " selector " " word " " d+
    | "reset " selector (" " word):?
    )
  )
seed -> "seed"
setblock -> "setblock " pos " " dataid (" " ("destroy" | "keep" | "replace")):?
setworldspawn -> "setworldspawn " pos
spawnpoint -> "spawnpoint " selector " " pos
spreadplayers -> "spread" "players":? " " 1pos " " 1pos " " posDouble " " posDouble " " ("true" | "false") " " selector
stop -> "stop" _
stopsound -> "stopsound " nnl+
summon -> "summon " dataid (" " pos (" " nbt):?):?
tag -> "tag " selector " " ("list" | ("add" | "remove") word)
team -> "team " nnl+
teleport -> "teleport " (selector (selector | pos):? | pos)
tell -> "tell " selector " " nnl:*
tellraw -> "tellraw " selector " " nnl+
time -> "time " nnl+
title -> "title " selector " " nnl+
trigger -> "trigger " word " " ("add" | "set") d+
weather -> "weather " ("clear" | "rain" | "thunder") (" " d+ ):?
worldborder -> "worldborder " nnl+

command -> (advancement|blockdata|bossbar|clear|clone|data|defaultgamemode|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|if|kill|locate|msg|particle|playsound|recipe|reload|replaceitem|say|scoreboard|tag|team|seed|setblock|setworldspawn|spreadplayers|stopsound|summon|teleport|tellraw|tell|time|title|tp|trigger|weather|worldborder) {%
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
