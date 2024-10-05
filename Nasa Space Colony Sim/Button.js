let buttonHighlight;

class buttonUI {
    constructor(x, y, w, h, text, subtext, doHighlight, bgImage){
        // position and size
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        // text to draw and text to draw when hovered
        this.text = text;
        this.subtext = subtext;

        // if it highlights when the mouse gets closer
        this.doHighlight = doHighlight;

        // background image handling.
        this.bgImage = bgImage;
        this.doBgImage = true;
        if(this.bgImage == undefined) this.doBgImage = false;
    }
    drawSelf(){
        // draw the background;
        fill(50);
        if(this.doBgImage == true) image(this.bgImage, this.x, this.y);
        else rect(this.x, this.y, this.w, this.h);

        // draw the text and subtext
        fill(230);
        textAlign(CORNER);
        textSize(25);
        text(this.text, this.x + 15, this.y + this.h/2 + 7);

        if(collc(this.x, this.y, this.w, this.h, mouseX, mouseY, 1, 1, 150, 150)){
            // do highlighting for when mouse gets close
            this.drawHighlight();
            if(collc(this.x, this.y, this.w, this.h, mouseX, mouseY,10, 10)){
                // draw subtext
                textSize(15);
                fill(230);
                text(this.subtext, this.x + this.w - 40, this.y - 10);
            }
        }

        if(this.isPressed()){
            fill(0, 0, 0, 100);
            strokeWeight(3);
            stroke(0);
            rect(this.x, this.y, this.w, this.h);
            strokeWeight(1);
        }
    }
    isPressed(){ 
        return collc(this.x, this.y, this.w, this.h, mouseX, mouseY, 10, 10) == true && mouseIsPressed && mouseButton == LEFT;
    }
    drawHighlight(){
        // get the brightness of the image using the distance between the mouse and the button
        let brightnesx = map(dist(this.x + this.w/2, 0, mouseX, 0), 0, this.w + 580, 0, 127.5);
        let brightnesy = map(dist(this.y + this.h/2, 0, mouseY, 0), 0, this.h + 580, 0, 127.5);
        let totalBrightness = constrain(10000/pow(brightnesx + brightnesy, 2), 0, 150);

        // reset the image size to the button size
        buttonHighlight.width = this.w;            
        buttonHighlight.height = this.h;    
            
        // load the image
        buttonHighlight.loadPixels();

        // variables for the positions of the pixels
        let xPosition = 0;
        let yPosition = 0;

        for(let i = 0; i < buttonHighlight.pixels.length; i+= 4){
            // itterate the xposition by 1;
            xPosition += 1;

            let d = 150 - dist(xPosition, 0, 0, 0);


            // update the pixels
            buttonHighlight.pixels[i] = d;
            buttonHighlight.pixels[i + 1] = d;
            buttonHighlight.pixels[i + 2] = d;
            buttonHighlight.pixels[i + 3] = totalBrightness;

            if(totalBrightness < 1) {xPosition = 0; yPosition ++}

            // change the 1D array positions into 2D positions
            if(xPosition >= buttonHighlight.width){xPosition = 0; yPosition ++}
        }
         
        // update the image itself
        buttonHighlight.updatePixels();

        image(buttonHighlight, this.x, this.y);
    }
}