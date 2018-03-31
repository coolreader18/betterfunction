yarn run v1.5.1
$ cd test && node .. test.crfunction
ret [ { type: 'function',
    name: 'func0',
    data: 'summon creeper ~ ~1 ~ {ignited:1,ExplosionRadius:1.5,Fuse:1}\nkill @s' },
  { type: 'function', name: 'func1', data: 'summon creeper' } ]
[
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": [
              {
                "type": "function",
                "name": "func0",
                "data": "summon creeper ~ ~1 ~ {ignited:1,ExplosionRadius:1.5,Fuse:1}\nkill @s"
              },
              {
                "type": "function",
                "name": "func1",
                "data": "summon creeper"
              }
            ]
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] run execute at @s run execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ],
  [
    [
      {
        "type": "namespace",
        "name": "minibomb",
        "data": [
          {
            "type": "function",
            "name": "minibomb",
            "commands": [
              "execute as @e[type=item,nbt={Item:{tag:{Tags:[\"minibomb\"]}},OnGround:1b},tag=!noExplodeMB] run execute at @s run function %genfunc0%",
              "function %genfunc1%",
              "execute as @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count: 1b}}] runat execute as @e[type=item,nbt={Item:{id:redstone,Count: 1b}},distance=..1,limit=1,sort=nearest] run execute at @s run function minibomb:sk"
            ],
            "tick": true
          },
          {
            "type": "folder",
            "name": "foo",
            "data": [
              {
                "type": "function",
                "name": "bar",
                "commands": [
                  "say baz"
                ],
                "tick": false
              }
            ]
          },
          {
            "type": "function",
            "name": "sk",
            "commands": [
              "summon item ~ ~ ~ {Item:{id:\"tnt\",Count:1b,tag:{Tags:[\"minibomb\"],HideFlags:1,display:{Name:\"MiniBomb\",Lore:[\"Throw to Activate\"]},ench:[{id:34,lvl:1}]}},Tags:[\"noExplodeMB\"]}",
              "kill @e[type=item,nbt={Item:{id:\"minecraft:gunpowder\",Count:1b}},distance=..1,limit=1,sort=nearest]",
              "kill @s"
            ],
            "tick": false
          },
          {
            "type": "folder",
            "name": "crfngen",
            "data": []
          }
        ]
      }
    ]
  ]
]
[32m Done!
Done in 1.02s.
