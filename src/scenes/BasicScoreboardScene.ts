import {Scene} from 'phaser'

export class BasicScoreboardScene extends Scene {

    private score: number = 0
    private scoreBuffer: number = 0
    private scoreLabel!: Phaser.GameObjects.Text
    private scoreLabelTween!: Phaser.Tweens.Tween

    constructor() {
      super({
        key: 'BasicScoreboardScene'
      })
    }

    public preload(): void {
        this.load.image('backdrop', 'backdrop.png')

        this.load.image('sparkBlue', 'assets/particles/blue.png')
        this.load.image('sparkRed', 'assets/particles/red.png')
        this.load.image('sparkYellow', 'assets/particles/yellow.png')

        // Thanks to c418 for this one great stuff!! https://soundcloud.com/c418/stranger-think
        this.load.audio('strangerThink', 'StrangerThinkShorter.mp3')

        this.load.audio('explosion', 'explosion.mp3')
        this.load.audio('lowfire', 'lowfire.mp3')
    }

    public create(): void {
        const img: Phaser.GameObjects.Image = this.add.image(640, 360, 'backdrop').setInteractive()
        const backgroundMusic: Phaser.Sound.BaseSound = this.sound.add('strangerThink', { loop: true, volume: 0.8 })
        backgroundMusic.play()

        this.createScore()

        // add particle emitters
        const emitter0 = this.add.particles('sparkBlue').createEmitter({
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.4, end: 0 },
            blendMode: 'SCREEN',
            frequency: -1,
            lifespan: 200,
            gravityY: 800
        })

        const emitter1 = this.add.particles('sparkRed').createEmitter({
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            frequency: -1,
            lifespan: 300,
            gravityY: 800
        })

        const emitter2 = this.add.particles('sparkYellow').createEmitter({
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            frequency: -1,
            lifespan: 2000,
            gravityY: 800
        })

        const i = 0
        // TODO: remove when we have another input
        img.on('pointerdown', (pointer: any) => {
            emitter0.explode(100, pointer.x + 2, pointer.y + 2)
            emitter1.explode(250, pointer.x + 10, pointer.y + 10)
            emitter2.explode(50, pointer.x, pointer.y)
            const newScore = Math.ceil(Math.random() * 1000)

            this.sound.play('explosion')
            this.createScoreAnimation(pointer.x + 20, pointer.y - 100, '+' + newScore, newScore)
        })


    }

    public createScore(): void {

        const style = {
            font: '64px Arial',
            fill: '#ce1208',
            stroke: '#000',
            strokeThickness: 15,
            align: 'right', // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: 'right',
            boundsAlignV: 'top' }

        this.scoreLabel = this.add.text(1000, 0, this.score.toString(), style)

        // Create a tween to grow / shrink the score label
        this.scoreLabelTween = this.add.tween({
            targets: [this.scoreLabel],
            scale: 1.5,
            ease: 'Linear',
            yoyo: true,
            duration: 200,
            paused: true
        })
    }

    public update(): void {
        // this.score += this.scoreBuffer
        // this.scoreBuffer = 0
        // this.scoreLabel.setText(this.score.toString())
        // While there is score in the score buffer, add it to the actual score
        if (this.scoreBuffer > 0) {
            const amount = Math.min(30, this.scoreBuffer)
            this.incrementScore(amount)
            this.scoreBuffer = this.scoreBuffer - amount
        }
    }

    public incrementScore(amount: number): void {
        // Increase the score by one and update the total score label text
        this.score += amount
        this.scoreLabel.setText(this.score.toString())
    }

    public createScoreAnimation(x: number, y: number, message: string, score: number): void {

        const scoreFont = '90px Arial'

        // Create a new label for the score
        const scoreAnimation = this.add.text(x, y, message, { font: scoreFont, color: '#ce1208', stroke: '#000', strokeThickness: 15 })
        // scoreAnimation.anchor.setTo(0.5, 0);
        // scoreAnimation.align = 'center';

        // Tween this score label to the total score label
        const scoreTween = this.add.tween({
            targets: [scoreAnimation],
            x: 1000,
            y: 0,
            ease: 'Expo.easeIn',
            duration: 800
        })

        // When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        scoreTween.setCallback('onComplete', () => {
            scoreTween.remove()
            scoreAnimation.destroy()
            this.scoreLabelTween.play()
            this.scoreBuffer += score
        }, [])
    }

}

