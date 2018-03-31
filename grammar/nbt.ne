# WIP
@builtin "string.ne"
sp -> " ":*

nbt -> nbtObj
nbtObj -> "{" (sp nbtObjEntry (sp "," sp nbtObjEntry):*):? sp "}"
nbtObjEntry -> (w+ | dqstring) sp ":" sp nbtValue
nbtValue -> nbtObj | nbtArr | double | int | long | short | float | byte | dqstring
nbtArr -> "[" (nbtValue (sp "," sp nbtValue):*):? sp "]"
double -> d+ "." d+
byte -> ("0" | "1") "b"
float -> double "f"
short -> d+
long -> d+
int -> ("-"):? d+
