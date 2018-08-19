# WIP
@builtin "string.ne"

nbt -> nbtObj
nbtObj -> "{" (_ nbtObjEntry (_ "," _ nbtObjEntry):*):? _ "}"
nbtObjEntry -> (word | dqstring) _ ":" _ nbtValue
nbtValue -> nbtObj | nbtArr | double | int | long | short | float | byte | dqstring
nbtArr -> "[" (nbtValue (_ "," _ nbtValue):*):? _ "]"
posDouble -> dp ("." dp:?):?
double -> "-":? posDouble
byte -> ("0" | "1") "b"
float -> double "f"
short -> dp
long -> dp
int -> ("-"):? dp
