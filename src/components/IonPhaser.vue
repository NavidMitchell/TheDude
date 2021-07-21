<template>
    <ion-phaser
            :game.prop="game"
            :initialize.prop="initialize"
    />
</template>

<script>
    import Phaser from 'phaser'
    import { IntroScene } from '@/scenes/IntroScene'
    import { BasicScoreboardScene } from '@/scenes/BasicScoreboardScene'
    import {TestScene} from "@/scenes/TestScene";

    export default {
        name: 'Ion',
        data() {
            return {
                initialize: true,
                game: {
                    width: 800,
                    height: 600,
                    physics: {
                      default: 'arcade',
                      arcade: {
                        gravity: { y: 300 },
                        debug: false
                      }
                    },
                    type: Phaser.AUTO,
                    scene: [TestScene],
                    audio: {
                        disableWebAudio: true
                    }
                }
            }
        }
    }
</script>
