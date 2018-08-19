@{%
  function flatten(arr) {
    return Array.isArray(arr) ? arr.reduce((flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []) : [arr];
  }
%}
@include "nbt.ne"
@include "large-data.ne"

# command space, allows for 'say \
# hi'
cs -> __ (__ | "\\" nl):* {% nuller %}
selector -> "@" selectorBases ("[" selectorSpec:+ "]"):? | word
selectorSpec -> word "=" (nbt | range | "!":? word) ("," " ":*):?
selectorBases -> ("a" | "e" | "p" | "r" | "s")
dataid -> (word ":"):? word
tag -> "#" dataid
tagorid -> tag | dataid
1pos -> "~" double | "~" | double
rayPos -> "^" double
pos -> 1pos cs 1pos cs 1pos
  | rayPos cs rayPos cs rayPos
path -> [\w"'\.[\]]:*
gmode -> "survival" | "creative" | "adventure" | "spectator"
difclty -> "easy" | "normal" | "hard" | "peaceful"
dimension -> "overworld" | "the_end" | "the_nether"
anchor -> "feet" | "eyes"
range -> dp:? "..":? dp:?
datatype -> "byte" | "double" | "float" | "int" | "long" | "short"
path -> ([\w]|"["|"]"|"\""):+
condition -> "block" cs pos cs tagorid
  | "blocks" cs pos cs pos cs pos cs ("all" | "masked")
  | "entity" cs selector
  | "score" cs selector cs word cs (("<" | "<=" | "=" | "=>" | ">") cs selector cs word | "matches" cs range)
operation -> ("%" | "+" | "*" | "-" | "/" | null) "=" | "<" | ">" | "><"


advancement -> "advancement" cs ("grant" | "revoke") cs selector cs ("everything" | ("from" | "only" | "through" | "until") cs dataid)
bossbar -> "bossbar" cs nnlp
clear -> "clear" cs selector (cs tagorid (cs dp):?):?
clone -> "clone" cs pos cs pos cs pos
data -> "data" cs nnlp
datapack -> "datapack" cs nnlp
debug -> "debug" cs ("start" | "stop")
defaultgamemode -> "defaultgamemode" cs gmode
difficulty -> "difficulty" cs difclty
effect -> "effect" cs nnlp
enchant -> "enchant" cs selector cs tagorid cs dp
execute -> "execute" (cs (
  ("at" | "as") cs selector
  | "positioned" cs (pos | "at" cs selector)
  | "facing" cs pos
  | "align" cs [x-z]:+
  | "facing" cs (pos | "entity" cs selector cs anchor)
  | "rotated" cs (dp cs dp | "as" cs selector)
  | "in" cs dimension
  | "anchored" cs anchor
  | ("if" | "unless") cs condition
  | "store" cs ("result" | "success") cs (
    "block" cs pos cs path cs datatype
    | "bossbar" cs dataid cs ("max" | "value")
    | "entity" cs selector cs path cs datatype
    | "score" cs selector cs word
    )
  )):*
  (cs ("run" | "runat" {% () => "run execute at @s run" %}) cs command):? {%
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
experience -> ("experience" | "xp") cs ("add" cs selector cs int
  | "set" cs selector cs dp cs ("levels" | "points")
  | "query" cs selector)
fill -> "fill" cs nnlp
function -> "function" cs (functionBlock {%
  data => ({
    type: "function",
    commands: data[0]
  })
%} | tagorid) {% data => data[2].type == "function" ? data[1] : data %}
gamemode -> "gamemode" cs gmode
gamerule -> "gamerule" cs nnlp
give -> "give" cs selector cs tagorid [\d]:*
help -> "help" cs command
if -> "if" cs "not":? cs condition cs functionBlock {%
  data => ({
    type: "if",
    condition: flatten(data[4]).join(""),
    commands: data[6],
    not: !!data[2]
  })
%}
kill -> "kill" cs selector
locate -> "locate" cs nnlp
msg -> ("msg" | "w" | "tell") cs selector cs nnlp
particle -> "particle" cs nnlp
playsound -> "playsound" cs nnlp
recipe -> "recipe" cs ("give" | "take") cs selector cs (tagorid | "*")
reload -> "reload"
replaceitem -> "replaceitem" cs nnlp
say -> "say" cs nnlp
scoreboard -> "scoreboard "
  ("objectives "
    ("add" cs word (cs criteria (cs nnlp):? | null {% () => "dummy" %})
    | "list"
    | "remove" cs word
    | "setdisplay" cs display cs word
  )
  | "players" cs (
    ("add" | "set") cs selector cs word cs int
    | ("enable" | "get") cs selector cs word
    | "list" cs selector
    | "operation" cs selector cs word cs operation cs selector cs word
    | "remove" cs selector cs word cs dp
    | "reset" cs selector (cs word):?
    )
  )
seed -> "seed"
setblock -> "setblock" cs pos cs dataid (cs ("destroy" | "keep" | "replace")):?
setworldspawn -> "setworldspawn" cs pos
spawnpoint -> "spawnpoint" cs selector cs pos
spreadplayers -> ("spread" "players":? {%()=>"spreadplayers"%}) cs 1pos cs 1pos cs posDouble cs posDouble cs ("true" | "false") cs selector
stop -> "stop"
stopsound -> "stopsound" cs selector cs soundtype (cs dataid):?
summon -> "summon" cs dataid (cs pos (cs nbt):?):?
tag -> "tag" cs selector cs ("list" | ("add" | "remove") word)
team -> "team" cs nnlp
teleport -> "teleport" cs (selector (selector | pos):? | pos)
tell -> "tell" cs selector cs nnlp
tellraw -> "tellraw" cs selector cs nnlp
time -> "time" cs nnlp
title -> "title" cs selector cs nnlp
trigger -> "trigger" cs word cs ("add" | "set") dp
weather -> "weather" cs ("clear" | "rain" | "thunder") (cs dp ):?
worldborder -> "worldborder" cs nnlp

command -> (advancement|bossbar|clear|clone|data|defaultgamemode|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|if|kill|locate|msg|particle|playsound|recipe|reload|replaceitem|say|scoreboard|tag|team|seed|setblock|setworldspawn|spreadplayers|stopsound|summon|teleport|tellraw|tell|time|title|trigger|weather|worldborder) {%
  data => {
    data = data[0][0]
    console.log(flatten(data).join(" "))
    if (Array.isArray(data)) {
      data = { text: data };
    }
    data.text = flatten(data.text).join("");
    return data;
  }
%}
