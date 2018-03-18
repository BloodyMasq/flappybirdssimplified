
const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}


class Pipe {

    constructor (x) {
        this.x = x;
        this.width = 70;
        this.speed = 3; //3
        this.top = rand(64, canvas.height / 2);
        this.bottom = canvas.height - this.top - 192;
    }

    show () {

        //pipe at the top
        drawImage(context, "./img/pipe_body.png", this.x, 0, this.width, this.top);
        drawImage(context, "./img/pipe_up.png", this.x - 8.75, this.top - 10, 87.5, 45);


        //pipe at the bottom
        drawImage(context, "./img/pipe_body.png", this.x, canvas.height - this.bottom, this.width, this.bottom);
        drawImage(context, "./img/pipe_up.png", this.x - 8.75, canvas.height - this.bottom - 10, 87.5, 45);

    }

    update () {
        this.x -= this.speed;
    }

    offscreen () {
        if (this.x < -this.width * 10) {
            return true;
        } else {
            return false;
        }
    }

    hits (bird) {
        if (bird.y < this.top + 28 || bird.y  > canvas.height - this.bottom - 35) {
            if (bird.x > this.x - 8.75 && bird.x < this.x + this.width + 8.75) {
                return true;
            }
        } 
        return false;
        
    }

    wentThrough (bird) {
        if (bird.y > this.top && bird.y < canvas.height - this.bottom) {
            if (bird.x < (this.x + this.width / 2 + 50) && bird.x > this.x ) {
                return true;
            }
        }
        return false;
    }

}

