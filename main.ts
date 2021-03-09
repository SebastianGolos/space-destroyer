namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let index = 0; index < 10; index++) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . . . . . . 
            . . . 7 7 . . . 
            . . . 7 7 . . . 
            . . . 7 7 . . . 
            . . . 7 7 . . . 
            `, ship, randint(-100, 100), -140)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    boss_health += -1
    if (boss_health == 0) {
        otherSprite.destroy()
    }
})
info.onCountdownEnd(function () {
    if (boss_health > 0) {
        game.over(false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let final_boss: Sprite = null
let health: Sprite = null
let boss_health = 0
let projectile: Sprite = null
let ship: Sprite = null
let asteroids = [
img`
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
    `,
sprites.space.spaceSmallAsteroid0,
sprites.space.spaceAsteroid0,
sprites.space.spaceAsteroid1,
sprites.space.spaceAsteroid4,
sprites.space.spaceAsteroid3
]
ship = sprites.create(sprites.food.smallBurger, SpriteKind.Player)
ship.setFlag(SpriteFlag.StayInScreen, true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
let create_boss = false
game.onUpdateInterval(randint(500, 10000), function () {
    health = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 . . . 2 2 2 . . . 
        . . 2 2 2 2 2 2 . . 2 2 2 2 . . 
        . 2 2 2 2 2 2 2 . 2 2 1 1 2 2 . 
        . 2 2 2 2 2 2 2 2 2 2 d d 1 2 . 
        . 2 2 2 2 2 2 2 2 2 2 2 d 1 2 . 
        . . 2 2 2 2 2 2 2 2 2 2 d 1 2 . 
        . . 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . . 2 2 2 2 2 . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, randint(-100, 100), 75)
    health.setKind(SpriteKind.Food)
})
forever(function () {
    if (info.score() > 25 && create_boss == false) {
        final_boss = sprites.create(img`
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222225555522222222222222
            22222222222225555522222222222222
            22222222222225555522222222222222
            22222222222225555522222222222222
            22222222222225555522222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            22222222222222222222222222222222
            `, SpriteKind.Boss)
        final_boss.setPosition(80, 0)
        final_boss.ay = 10
        boss_health = 300
        create_boss = true
        info.startCountdown(5)
    }
})
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
