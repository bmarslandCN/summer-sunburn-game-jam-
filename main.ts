namespace SpriteKind {
    export const Super_Food = SpriteKind.create()
    export const Parent = SpriteKind.create()
    export const Side_Character = SpriteKind.create()
    export const Fish = SpriteKind.create()
    export const Shark = SpriteKind.create()
}
function instructions () {
    Instruction_Asker = game.askForNumber("Instructions? 1: Yes 2: No", 1)
    if (Instruction_Asker == 1) {
        game.setDialogTextColor(15)
        game.setDialogCursor(img`
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . 6 6 9 9 9 9 9 9 9 9 6 6 . . 
            . 6 9 9 9 9 9 6 6 9 9 9 9 9 6 . 
            . 6 9 9 9 9 6 9 9 6 9 9 9 9 6 . 
            . 6 9 9 9 6 6 6 6 6 6 9 9 9 6 . 
            . 6 9 9 6 6 9 9 9 9 6 6 9 9 6 . 
            . 6 9 9 6 9 9 9 9 9 9 6 9 9 6 . 
            c 6 9 9 9 9 9 9 9 9 9 9 9 9 6 c 
            c c 6 6 9 9 9 9 9 9 9 9 6 6 c c 
            c b c c 6 6 6 6 6 6 6 6 c c b c 
            c b b b c c c c c c c c b b b c 
            c b b b b b b b b b b b b b b c 
            c b b b b b b b b b b b b b b c 
            c b b b b b b b b b b b b b b c 
            . c b b b b b b b b b b b b c . 
            . . c c c c c c c c c c c c . . 
            `)
        game.setDialogFrame(img`
            696969696969696969696969696969696969696969696969
            969696969696969696969696969696969696969696969696
            697777777777777777777777777777777777777777777769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967777777777777777777777777777777777777777777796
            696969696969696969696969696969696969696969696969
            969696969696969696969696969696969696969696969696
            `)
        game.showLongText("Your goal is to get to the treasure chest at the end of each level. You have a sunburn meter, if it gets to zero then you lose a life. You can refill your sunburn meter by grabbing ice cream cones. You also lose lives if you fall off a platform. There will be crabs littered around each level starting at level two. Jump on a crab to kill it. Arrow keys to move. There are 5 levels with a special level at the end. Good luck!", DialogLayout.Full)
    } else if (Instruction_Asker == 2) {
    	
    } else {
        instructions()
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canMove == true && Swimming_Level == false) {
        if (Little_Kid.isHittingTile(CollisionDirection.Bottom)) {
            Little_Kid.vy += -200
            animation.stopAnimation(animation.AnimationTypes.All, Little_Kid)
        }
    }
})
function Level_5 () {
    scene.setBackgroundImage(assets.image`Level Background`)
    tiles.setCurrentTilemap(tilemap`SUnburn level 5`)
    Spawn_Tile_Set_Up()
    canMove = true
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(0, 12))
    Sunburn_Tracker.value += 10
}
function Level_1 () {
    scene.setBackgroundImage(assets.image`Level Background`)
    tiles.setCurrentTilemap(tilemap`Sunburn Level 1`)
    canMove = true
    Sunburn_Tracker.value = 10
    for (let value of tiles.getTilesByType(assets.tile`Ice Cream Spawn Tiles`)) {
        Ice_Cream = sprites.create(assets.image`Ice Cream Cone`, SpriteKind.Super_Food)
        tiles.placeOnTile(Ice_Cream, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Shark, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    whenDie()
})
function Spawn_Tile_Set_Up () {
    for (let value of tiles.getTilesByType(assets.tile`Ice Cream Spawn Tiles`)) {
        Ice_Cream = sprites.create(img`
            . . . . . 3 3 b 3 3 d d 3 3 . . 
            . . . . 3 1 1 d 3 d 1 a 1 1 3 . 
            . . . 3 d 1 1 1 d 7 1 1 d 3 1 3 
            . . 3 d d 1 2 1 d d 1 1 5 3 3 3 
            . 3 1 1 d 1 1 1 1 d d 1 1 b . . 
            . 3 9 1 1 d 1 1 3 1 1 d 1 1 3 . 
            . b d 1 1 1 d 1 1 1 9 1 1 1 3 . 
            . 4 b 1 5 1 1 d d 1 1 1 1 d 3 . 
            . 4 4 d 1 1 1 7 1 1 d d d b b . 
            . 4 d b d 1 1 1 1 1 1 1 1 3 . . 
            4 d d 5 b d 3 1 1 1 1 a 1 3 . . 
            4 5 d 5 5 b b d 2 1 1 1 d 3 . . 
            4 5 5 d 5 5 d b b b d d 3 . . . 
            4 5 5 5 d d d d 4 4 b 3 . . . . 
            . 4 5 5 5 4 4 4 . . . . . . . . 
            . . 4 4 4 . . . . . . . . . . . 
            `, SpriteKind.Super_Food)
        tiles.placeOnTile(Ice_Cream, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`Crab Spawn Tile`)) {
        Mr_Crabs = sprites.create(assets.image`Mr Crabs`, SpriteKind.Enemy)
        tiles.placeOnTile(Mr_Crabs, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
function Set_Up2 () {
    Credits_Asker = 0
    Spikes_Counter = 0
    canMove = false
    scene.cameraFollowSprite(Little_Kid)
    canMove = true
    Sunburn_Tracker = statusbars.create(20, 4, StatusBarKind.Energy)
    Sunburn_Tracker.max = 10
    Sunburn_Tracker.attachToSprite(Little_Kid)
    Sunburn_Tracker.setColor(5, 4)
    music.play(music.createSong(assets.song`Levels Song`), music.PlaybackMode.LoopingInBackground)
    Little_Kid.ay = 450
    Level_1()
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(3, 14))
    info.setLife(12)
    pause(500)
    game.showLongText("Am I in my dream?", DialogLayout.Bottom)
    pause(500)
    game.showLongText("I guess I am!", DialogLayout.Bottom)
}
function Level_Screen () {
    pause(1000)
    Little_Kid.setFlag(SpriteFlag.Invisible, true)
    tiles.setCurrentTilemap(tilemap`level2`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Super_Food)
    pause(2000)
    scene.setBackgroundImage(assets.image`myImage1`)
    pause(2000)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canMove == true && Swimming_Level == false) {
        if (Little_Kid.isHittingTile(CollisionDirection.Bottom)) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 4 4 f b f e f f . 
                . f e e 4 1 f d d f 1 4 e e f . 
                . . f e e d d d d d d e e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 4 f 9 9 9 9 9 9 f 4 e . . 
                . . 4 d f 9 9 9 9 9 9 f d 4 . . 
                . . 4 4 f 5 7 5 7 5 7 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
            Little_Kid.vy += -200
        } else if (Little_Kid.isHittingTile(CollisionDirection.Right)) {
            Little_Kid.setImage(assets.image`Kid Walking Right`)
            Little_Kid.vy += -175
        } else if (Little_Kid.isHittingTile(CollisionDirection.Left)) {
            Little_Kid.setImage(assets.image`Kid Walking Left`)
            Little_Kid.vy += -175
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fish, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    whenDie()
})
function Intro_Cutscene () {
    Cutscene_is_happening = true
    scene.setBackgroundImage(assets.image`Intro Cutscene Background`)
    _1 = sprites.create(assets.image`Rando Boy`, SpriteKind.Side_Character)
    _2 = sprites.create(assets.image`Rando Girl`, SpriteKind.Side_Character)
    Mom = sprites.create(assets.image`Mom`, SpriteKind.Parent)
    Dad = sprites.create(assets.image`Dad`, SpriteKind.Parent)
    Little_Kid = sprites.create(assets.image`Little Kid`, SpriteKind.Player)
    Little_Kid.setPosition(88, 100)
    Mom.setPosition(61, 80)
    Dad.setPosition(61, 100)
    _1.setPosition(128, 90)
    _2.setPosition(20, 84)
    Dad.sayText("Welcome to the beach! What do you want to do first?", 6000, true)
    pause(6500)
    Mom.sayText("You can do whatever you like as long as you put on sunscreen before!", 8500, true)
    pause(9000)
    Little_Kid.sayText("Okay Mom! I think I'll take a nap!", 4500, true)
    pause(5000)
    animation.runMovementAnimation(
    Little_Kid,
    animation.animationPresets(animation.flyToCenter),
    2000,
    false
    )
    pause(2500)
    game.setDialogTextColor(15)
    game.setDialogCursor(img`
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . 6 6 9 9 9 9 9 9 9 9 6 6 . . 
        . 6 9 9 9 9 9 6 6 9 9 9 9 9 6 . 
        . 6 9 9 9 9 6 9 9 6 9 9 9 9 6 . 
        . 6 9 9 9 6 6 6 6 6 6 9 9 9 6 . 
        . 6 9 9 6 6 9 9 9 9 6 6 9 9 6 . 
        . 6 9 9 6 9 9 9 9 9 9 6 9 9 6 . 
        c 6 9 9 9 9 9 9 9 9 9 9 9 9 6 c 
        c c 6 6 9 9 9 9 9 9 9 9 6 6 c c 
        c b c c 6 6 6 6 6 6 6 6 c c b c 
        c b b b c c c c c c c c b b b c 
        c b b b b b b b b b b b b b b c 
        c b b b b b b b b b b b b b b c 
        c b b b b b b b b b b b b b b c 
        . c b b b b b b b b b b b b c . 
        . . c c c c c c c c c c c c . . 
        `)
    game.setDialogFrame(img`
        696969696969696969696969696969696969696969696969
        969696969696969696969696969696969696969696969696
        697777777777777777777777777777777777777777777769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967111111111111111111111111111111111111111111796
        697111111111111111111111111111111111111111111769
        967777777777777777777777777777777777777777777796
        696969696969696969696969696969696969696969696969
        969696969696969696969696969696969696969696969696
        `)
    game.showLongText("After a while your eyes start to droop and you fall asleep.", DialogLayout.Bottom)
    sprites.destroyAllSpritesOfKind(SpriteKind.Parent)
    sprites.destroyAllSpritesOfKind(SpriteKind.Side_Character)
    Cutscene_is_happening = false
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canMove == true && Swimming_Level == false) {
        Little_Kid.setImage(img`
            . . . . f f f f f f . . . . . . 
            . . . f e f e e e e f f . . . . 
            . . f e e e f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e e e e e e e f f f f . . . 
            . f e e f f f f e e e e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d d 4 e e e f . . . 
            . . . f e 4 4 4 e e f f . . . . 
            . . . f 9 9 9 e d d 4 . . . . . 
            . . . f 9 9 9 e d d e . . . . . 
            . . . f 7 5 7 f e e f . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f f . . . . . . . 
            `)
        animation.runImageAnimation(
        Little_Kid,
        assets.animation`Walking Animation`,
        200,
        true
        )
    }
})
function whenDie () {
    whenDie_is_happening = true
    canMove = false
    animation.stopAnimation(animation.AnimationTypes.All, Little_Kid)
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    pause(1000)
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(0, 12))
    if (Treasure_Chest_Counter == 0) {
        Level_1()
        music.play(music.createSong(assets.song`Levels Song`), music.PlaybackMode.LoopingInBackground)
    } else if (Treasure_Chest_Counter == 1) {
        Level_2()
        music.play(music.createSong(assets.song`Levels Song`), music.PlaybackMode.LoopingInBackground)
    } else if (Treasure_Chest_Counter == 2) {
        Level_3()
        music.play(music.createSong(assets.song`Levels Song0`), music.PlaybackMode.LoopingInBackground)
    } else if (Treasure_Chest_Counter == 3) {
        Level_4()
        music.play(music.createSong(assets.song`Levels SOng`), music.PlaybackMode.LoopingInBackground)
    } else if (Treasure_Chest_Counter == 4) {
        Level_5()
        music.play(music.createSong(assets.song`Levels Song`), music.PlaybackMode.LoopingInBackground)
    } else if (Treasure_Chest_Counter == 5) {
        Last_levelMinigame()
        music.play(music.createSong(assets.song`Water Level`), music.PlaybackMode.LoopingInBackground)
    }
    canMove = true
    info.changeLifeBy(-1)
    Sunburn_Tracker.value += 10
    whenDie_is_happening = false
}
function Level_2 () {
    scene.setBackgroundImage(assets.image`Level Background`)
    tiles.setCurrentTilemap(tilemap`Sunburn Level 2`)
    Spawn_Tile_Set_Up()
    canMove = true
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(0, 12))
    Sunburn_Tracker.value += 10
}
function Set_Up () {
    Spikes_Counter = 0
    canMove = false
    music.play(music.createSong(assets.song`Levels SOng`), music.PlaybackMode.LoopingInBackground)
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(0, 12))
    scene.cameraFollowSprite(Little_Kid)
    canMove = true
    Little_Kid.ay = 450
    Sunburn_Tracker = statusbars.create(20, 4, StatusBarKind.Energy)
    Sunburn_Tracker.max = 10
    Sunburn_Tracker.attachToSprite(Little_Kid)
    Sunburn_Tracker.setColor(5, 4)
    Level_1()
    info.setLife(12)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (canMove == true && Swimming_Level == false) {
        Little_Kid.setImage(img`
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f e f . . . 
            . . . f f e e e e f e e e f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e e e e e e f . 
            . . . f e e e e f f f f e e f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . f f e e 4 4 4 e f . . . 
            . . . . . 4 d d e 9 9 9 f . . . 
            . . . . . e d d e 9 9 9 f . . . 
            . . . . . f e e f 5 7 5 f . . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f f . . . . . . 
            `)
        animation.runImageAnimation(
        Little_Kid,
        assets.animation`Animation`,
        200,
        true
        )
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Clam Tile`, function (sprite, location) {
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setGameOverMessage(true, "Thanks for playing! :)")
    game.setGameOverEffect(true, effects.confetti)
    game.gameOver(true)
})
function Level_4 () {
    scene.setBackgroundImage(assets.image`Level Background`)
    tiles.setCurrentTilemap(tilemap`Sunburn Level 4`)
    Spawn_Tile_Set_Up()
    canMove = true
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(0, 12))
    Sunburn_Tracker.value += 10
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Ground Spike`, function (sprite, location) {
    Spikes_CounterIsh = 0
    Spikes_CounterIsh = info.life()
    whenDie()
    if (info.life() <= Spikes_CounterIsh - 2) {
        Spikes_CounterIsh = 0
        info.changeLifeBy(1)
    }
})
function Last_levelMinigame () {
    Swimming_Level = true
    info.setLife(7)
    animation.stopAnimation(animation.AnimationTypes.All, Little_Kid)
    game.setDialogTextColor(15)
    game.setDialogCursor(assets.image`A button`)
    game.setDialogFrame(assets.image`Talking Ring`)
    game.showLongText("Dodge the fish and sharks. Get to the clam at the end. Good luck.", DialogLayout.Full)
    music.stopAllSounds()
    music.play(music.createSong(assets.song`Water Level`), music.PlaybackMode.LoopingInBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Super_Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Fish)
    sprites.destroyAllSpritesOfKind(SpriteKind.Shark)
    Last_Level_is_happening = true
    sprites.destroy(Sunburn_Tracker)
    scene.setBackgroundImage(assets.image`Underwater Background`)
    tiles.setCurrentTilemap(tilemap`Swimming Level`)
    for (let value of tiles.getTilesByType(assets.tile`Fishy or Sharky Spawn Tile`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
        if (Math.percentChance(45)) {
            Fishy = sprites.create(assets.image`Fishy`, SpriteKind.Fish)
            tiles.placeOnTile(Fishy, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        } else if (Math.percentChance(45)) {
            Fishy_Mc_Fishy = sprites.create(assets.image`Fishy 2`, SpriteKind.Fish)
            tiles.placeOnTile(Fishy_Mc_Fishy, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        } else if (Math.percentChance(10)) {
            Sharky = sprites.create(assets.image`Sharky`, SpriteKind.Shark)
            tiles.placeOnTile(Sharky, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
    }
    Little_Kid.ay = 0
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(0, 5))
    Swimming_Level = true
    Little_Kid.setImage(assets.image`Scuba Up`)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Treasure Chest Closed`, function (sprite, location) {
    Treasure_Chest_Counter += 1
    if (Treasure_Chest_Counter == 1) {
        canMove = false
        tiles.setTileAt(location, assets.tile`Treasure Chest Open`)
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.Super_Food)
        Level_2()
        Little_Kid.setFlag(SpriteFlag.Invisible, false)
    } else if (Treasure_Chest_Counter == 2) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        Little_Kid.setFlag(SpriteFlag.Invisible, false)
        sprites.destroyAllSpritesOfKind(SpriteKind.Super_Food)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        Level_3()
    } else if (Treasure_Chest_Counter == 3) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        Little_Kid.setFlag(SpriteFlag.Invisible, false)
        sprites.destroyAllSpritesOfKind(SpriteKind.Super_Food)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        Level_4()
    } else if (Treasure_Chest_Counter == 4) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        Little_Kid.setFlag(SpriteFlag.Invisible, false)
        sprites.destroyAllSpritesOfKind(SpriteKind.Super_Food)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        Level_5()
    } else if (Treasure_Chest_Counter == 5) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        Little_Kid.setFlag(SpriteFlag.Invisible, false)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.Super_Food)
        Last_levelMinigame()
    }
})
function Credits_Asker_Function () {
    Credits_Asker = game.askForNumber("Credits? 1: Yes 2: No", 1)
    if (Credits_Asker == 1) {
        game.setDialogTextColor(15)
        game.setDialogCursor(assets.image`A Button`)
        game.setDialogFrame(img`
            696969696969696969696969696969696969696969696969
            969696969696969696969696969696969696969696969696
            697777777777777777777777777777777777777777777769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967111111111111111111111111111111111111111111796
            697111111111111111111111111111111111111111111769
            967777777777777777777777777777777777777777777796
            696969696969696969696969696969696969696969696969
            969696969696969696969696969696969696969696969696
            `)
        game.showLongText("Thank you to all the wonderful people who helped me achieve my project! I of course did all of the coding, but some of my family members helped me along the way as well!", DialogLayout.Bottom)
        game.showLongText("My sister helped me with the music.", DialogLayout.Bottom)
        game.showLongText("My dad helped me with solving some of the problems that came up.", DialogLayout.Bottom)
        game.showLongText("My whole family for helping me playtest this game.", DialogLayout.Bottom)
        game.showLongText("And you, the player. Thank you so, so much, this game wouldn't be here without you.", DialogLayout.Bottom)
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    } else if (Credits_Asker == 2) {
    	
    } else {
        Credits_Asker_Function()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Super_Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    Sunburn_Tracker.value += 5
    music.play(music.createSong(hex`0078000408010200001c00010a006400f401640000040000000000000000000000000005000004120000000400012704000800012508000c00012709010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8001b00000001000400020608040005000400020607080009000400020608`), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.bottom <= otherSprite.y) {
        sprite.vy += -70
        sprites.destroy(otherSprite, effects.disintegrate, 1000)
        music.play(music.createSong(hex`0078000408010206001c00010a006400f4016400000400000000000000000000000000000000020c0000000400012504000800012409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c800070000000100020607`), music.PlaybackMode.UntilDone)
    } else {
        whenDie()
    }
})
function Level_3 () {
    scene.setBackgroundImage(assets.image`Level Background`)
    tiles.setCurrentTilemap(tilemap`Sunburn Level 3`)
    Spawn_Tile_Set_Up()
    canMove = true
    tiles.placeOnTile(Little_Kid, tiles.getTileLocation(0, 12))
    Sunburn_Tracker.value += 10
}
let Sharky: Sprite = null
let Fishy_Mc_Fishy: Sprite = null
let Fishy: Sprite = null
let Dad: Sprite = null
let Mom: Sprite = null
let _2: Sprite = null
let _1: Sprite = null
let Spikes_Counter = 0
let Credits_Asker = 0
let Mr_Crabs: Sprite = null
let Ice_Cream: Sprite = null
let Sunburn_Tracker: StatusBarSprite = null
let Instruction_Asker = 0
let Little_Kid: Sprite = null
let Treasure_Chest_Counter = 0
let whenDie_is_happening = false
let canMove = false
let Swimming_Level = false
let Spikes_CounterIsh = 0
let Last_Level_is_happening = false
let Cutscene_is_happening = false
Cutscene_is_happening = false
Last_Level_is_happening = false
Spikes_CounterIsh = 0
Swimming_Level = false
let being_playtested = false
canMove = false
whenDie_is_happening = false
Treasure_Chest_Counter = 0
let Cutscene_Asker_1 = 1
if (Cutscene_Asker_1 == 1) {
    Intro_Cutscene()
    Set_Up2()
    sprites.destroyAllSpritesOfKind(SpriteKind.Parent)
} else if (Cutscene_Asker_1 == 2) {
    Little_Kid = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f e e f f f . . . . 
        . . . f f f e e e e f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e e e e e e e e e f . . 
        . . f e e f f f f f f e e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 9 9 9 9 9 9 f 4 e . . 
        . . 4 d f 9 9 9 9 9 9 f d 4 . . 
        . . 4 4 f 5 7 5 7 5 7 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    Set_Up()
} else {
    game.reset()
}
instructions()
forever(function () {
    if (info.life() == 100000000) {
        if (Sunburn_Tracker.value == 10) {
            Little_Kid.setImage(assets.image`Kid`)
        } else if (Sunburn_Tracker.value == 9) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 4 4 f b f e f f . 
                . f e e 4 1 f d d f 1 4 e e f . 
                . . f e 3 d d d d d d 3 e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 4 f 9 9 9 9 9 9 f 4 e . . 
                . . 4 d f 9 9 9 9 9 9 f d 4 . . 
                . . 4 4 f 5 7 5 7 5 7 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 8) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 4 4 f b f e f f . 
                . f e e 4 1 f d d f 1 4 e e f . 
                . . f e 3 d d d d d d 3 e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 4 f 9 9 9 9 9 9 f 4 e . . 
                . . 4 d f 9 9 9 9 9 9 f d 4 . . 
                . . 4 4 f 5 7 5 7 5 7 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 7) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 4 4 f b f e f f . 
                . f e e 2 1 f d d f 1 2 e e f . 
                . . f e 2 d d d d d d 2 e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 4 f 9 9 9 9 9 9 f 4 e . . 
                . . 4 d f 9 9 9 9 9 9 f d 4 . . 
                . . 4 4 f 5 7 5 7 5 7 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 6) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 2 2 f b f e f f . 
                . f e e 2 1 f d d f 1 2 e e f . 
                . . f e 2 d d d d d d 2 e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 4 f 9 9 9 9 9 9 f 4 e . . 
                . . 4 d f 9 9 9 9 9 9 f d 4 . . 
                . . 4 4 f 5 7 5 7 5 7 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 5) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 2 2 f b f e f f . 
                . f e e 2 1 f d d f 1 2 e e f . 
                . . f e 2 d d d d d d 2 e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 2 f 9 9 9 9 9 9 f 2 e . . 
                . . 4 d f 9 9 9 9 9 9 f d 4 . . 
                . . 4 4 f 5 7 5 7 5 7 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 4) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 2 2 f b f e f f . 
                . f e e 2 1 f d d f 1 2 e e f . 
                . . f e 2 d d d d d d 2 e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 2 f 9 9 9 9 9 9 f 2 e . . 
                . . 2 d f 9 9 9 9 9 9 f d 4 . . 
                . . 2 2 f 5 7 5 7 5 7 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 3) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 2 2 f b f e f f . 
                . f e e 2 1 f d d f 1 2 e e f . 
                . . f e 2 d d d d d d 2 e f . . 
                . . . f e e 4 4 4 4 e e f . . . 
                . . e 2 f 9 9 9 9 9 9 f 2 e . . 
                . . 2 d f 9 9 9 9 9 9 f d 2 . . 
                . . 2 2 f 5 7 5 7 5 7 f 2 2 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 2) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 2 2 f b f e f f . 
                . f e e 2 1 f d d f 1 2 e e f . 
                . . f e 2 d d d d d d 2 e f . . 
                . . . f e e 2 2 2 2 e e f . . . 
                . . e 2 f 9 9 9 9 9 9 f 2 e . . 
                . . 2 d f 9 9 9 9 9 9 f d 2 . . 
                . . 2 2 f 5 7 5 7 5 7 f 2 2 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        } else if (Sunburn_Tracker.value == 1) {
            Little_Kid.setImage(img`
                . . . . . . f f f f . . . . . . 
                . . . . f f f e e f f f . . . . 
                . . . f f f e e e e f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e e e e e e e e e f . . 
                . . f e e f f f f f f e e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 2 2 f b f e f f . 
                . f e e 2 1 f d d f 1 2 e e f . 
                . . f e 2 d d d d d d 2 e f . . 
                . . . f e e 2 2 2 2 e e f . . . 
                . . e 2 f 9 9 9 9 9 9 f 2 e . . 
                . . 2 d f 9 9 9 9 9 9 f d 2 . . 
                . . 2 2 f 5 7 5 7 5 7 f 2 2 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
        }
    }
})
game.onUpdateInterval(1375.829, function () {
    if (canMove == true) {
        Sunburn_Tracker.value += -1
    }
})
forever(function () {
    if (info.life() == 100000000) {
        Little_Kid.setImage(img`
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f e f . . . 
            . . . f f e e e e f e e e f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e e e e e e f . 
            . . . f e e e e f f f f e e f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . f f e e 4 4 4 e f . . . 
            . . . . . 4 d d e 9 9 9 f . . . 
            . . . . . e d d e 9 9 9 f . . . 
            . . . . . f e e f 5 7 5 f . . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f f . . . . . . 
            `)
    }
})
forever(function () {
    if (canMove == true) {
        controller.moveSprite(Little_Kid, 100, 0)
    }
    if (whenDie_is_happening == true) {
        controller.moveSprite(Little_Kid, 0, 0)
    }
})
forever(function () {
    if (Sunburn_Tracker.value <= 0) {
        game.splash("You got overheated!")
        whenDie()
        Sunburn_Tracker.value += 10
    }
})
forever(function () {
    if (canMove == true && Swimming_Level == true) {
        controller.moveSprite(Little_Kid, 100, 100)
    }
})
forever(function () {
    if (canMove == true && (Swimming_Level == true && controller.right.isPressed())) {
        Little_Kid.setImage(assets.image`Scuba Forward`)
    } else if (canMove == true && (Swimming_Level == true && controller.left.isPressed())) {
        Little_Kid.setImage(assets.image`Scuba Back`)
    } else if (canMove == true && (Swimming_Level == true && controller.up.isPressed())) {
        Little_Kid.setImage(assets.image`Scuba Start`)
    } else if (canMove == true && (Swimming_Level == true && controller.down.isPressed())) {
        Little_Kid.setImage(assets.image`Scuba Down`)
    }
})
forever(function () {
    if (Last_Level_is_happening == true) {
        Sunburn_Tracker.value = 10
    }
})
