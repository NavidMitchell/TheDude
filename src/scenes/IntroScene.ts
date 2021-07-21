import {Scene} from 'phaser'

export class IntroScene extends Scene {

    constructor() {
      super({
        key: 'IntroScene'
      })
    }

    public preload(): void {
      this.load.video('stranger', 'StrangerThingsIntro.mp4', 'loadeddata', false, false)
    }

    public create(): void {
        // FIXME: use correct type once new version of phaser is released https://github.com/photonstorm/phaser/issues/5003
        const vid: Phaser.GameObjects.Image = this.add.video(640, 360, 'stranger')

        vid.on('complete', (video: any) => {
            // Shutdown this Scene and run the given one
            this.scene.start('BasicScoreboardScene')
        });

        (vid as Phaser.GameObjects.Image & { play: (loop: boolean) => void }).play(false)
    }

}

