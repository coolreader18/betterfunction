# creeperfunction
A preprocessor for Minecraft mcfunction files.

## What can you do with it?

```
namespace thenamespace {
  tick function clock {
    # will run every tick
    
    if not entity @e[tag=target] {
      # easy if statements
      
      say Doesn't exist!
      
      # runat is an alias for `run execute at @s run`
      execute as @e[tag=other] runat function {
        # functions in the function command!
        tp ~ ~1 ~
      }
    }
    
    // can use `//` for comments
  }
  load function load {
    // will run on load
    
    // can leave out `dummy` when creating an objective
    scoreboard objectives add objectiv
  }
}
```

## Installation

You need node and yarn or npm to install, or you grab the binary from /dist, but it may not be up to date

```sh
yarn global add github:coolreader18/creeperfunction
```
