criteria -> "dummy" | "trigger" | "deathCount" | "playerKillCount"
  | "totalKillCount" | "health" | "xp" | "level" | "food" | "air" | "armor"
  | "minecraft." ((
      "broken" | "crafted" | "dropped" | "killed" | "mined" | "picked_up" | "used" |
    ) ":" word)
  | ("teamkill" | "killedByTeam") "." color

color -> "dark_blue" | "dark_green" | "dark_aqua" | "dark_red" | "dark_purple" | "gold" | "gray" | "dark_gray" | "blue" | "green" | "aqua" | "red" | "light_purple" | "yellow" | "white"

statCriteria -> "animalsBred" | "armorCleaned" | "aviateOneCm" | "bannerCleaned" | "beaconInteraction" | "boatOneCm" | "brewingstandInteraction" | "cakeSlicesEaten" | "cauldronFilled" | "cauldronUsed" | "chestOpened" | "climbOneCm" | "craftingTableInteraction" | "crouchOneCm" | "damageDealt" | "damageTaken" | "deaths" | "dispenserInspected" | "diveOneCm" | "drop" | "dropperInspected" | "enderchestOpened" | "fallOneCm" | "fishCaught" | "flowerPotted" | "flyOneCm" | "furnaceInteraction" | "hopperInspected" | "horseOneCm" | "itemEnchanted" | "jump" | "leaveGame" | "minecartOneCm" | "mobKills" | "noteblockPlayed" | "noteblockTuned" | "pigOneCm" | "playOneMinute" | "playerKills" | "recordPlayed" | "shulkerBoxOpened" | "sleepInBed" | "sneakTime" | "sprintOneCm" | "swimOneCm" | "talkedToVillager" | "timeSinceDeath" | "tradedWithVillager" | "trappedChestTriggered" | "walkOneCm"

display -> "belowName" | "list" | "sidebar" (".team." color):?

soundtype -> ("*" | "ambient" | "block" | "hostile" | "master" | "music" | "neutral" | "player" | "record" | "voice" | "weather")
