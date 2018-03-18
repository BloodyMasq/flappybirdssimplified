class Bird {

    constructor (x, y, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.image = new Image();
        this.image.src = "./img/obird.png";
        this.imageWidth = 32;
        this.imageHeight = 24;
        this.animationDelay = 0;
        this.animationCurrentFrame = 0;
        this.animationIndexCounter = 0;
        this.enableLift = true;
    };

    animate (spriteSheetIndex) {

        if (def(spriteSheetIndex.length)) {

            if (this.animationDelay++ >= 4) {

                this.animationDelay = 0;
                this.animationIndexCounter++;

                if (this.animationIndexCounter >= spriteSheetIndex.length) 
                    this.animationIndexCounter = 0;

                this.animationCurrentFrame = spriteSheetIndex[this.animationIndexCounter];
            }

            let spriteSheetX = this.animationCurrentFrame % 1;
            let spriteSheetY = Math.floor(this.animationCurrentFrame / 2);
            
            context.drawImage(this.image, spriteSheetX * this.imageWidth, spriteSheetY * this.imageHeight, this.imageWidth, this.imageHeight, this.x, this.y, this.imageWidth, this.imageHeight);
        }

    }

    up () {
        // Putting lift up to the bird
        this.velocity = lift;
    };

    dead () {
        this.velocity += 50;
        this.enableLift = false;
    }

    update () { 
        // gravity down
        this.y += this.velocity;
        this.velocity += gravity;
        

        //check if bird isn't going out of the down part of the screen
        if (this.y >= canvas.height) {
            this.velocity = 0;
            this.y = canvas.height;
            gameOver(bird, rScore, highScore);
        }

        //check if bird isn't going out of the upper part of the screen
        if (this.y < 0) {
            this.velocity = 0;
            this.y = 0;
        }
        
        if (this.enableLift) {
            document.addEventListener("keydown", (e) => {
                switch(e.keyCode) {
                    //space
                    case 32:
                        this.up();   
                        break; 
                }
            });
        } 
        
    }


}
