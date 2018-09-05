# betterfunction

An alternate language for Minecraft functions.

## What can you do with it?

```
namespace example_project {
  tick func clock { // will run every tick

    if ?not entity @e[tag=target], func {// easy if

      say "Target doesn't exist!";

      // runat is an alias for `run execute at @s run`
      execute func {
        // inline functions!
        tp ~ ~1 ~
      }, as: @e[tag=other], run_at: @s;
    };
    
  }
  load function load {
    // will run on load

    // can leave out `dummy` when creating an objective
    scoreboard::objectives::add "objectiv";
  }
}
```

## Installation

You need node and yarn or npm to install, or you grab the binary from /dist, but it may not be up to date

```sh
yarn global add https://github.com/coolreader18/betterfunction
```

## License

This project is licensed under the MIT license. Please see the [LICENSE](LICENSE) file for more details.
