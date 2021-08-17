const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const Welcome = ('Welcome to find your hat!');
console.log(Welcome);

const height = prompt('height?')
const width = prompt('width?')

let currentlyPlaying = true;

class Field {
    constructor(field) {
        this._field = field;
        this.y = 0;
        this.x = 0;
    }

    get field() {
        return this._field;
    }

    //Print the field to the terminal in a two-dimensional plane
    print() {
        return this.field.map(row =>
            row.join('')
        ).join('\n');
    }

    //Retrieve user's input and move the player's cursor
    ask() {
        let moveing = prompt('which way should i go?? (s for Up, x for down, z for left and c for right)');
        switch(moveing.toLowerCase()) {
            case 's':
                console.log('up');
                this.y -= 1;
                console.clear();
                break;
            case 'x':
                console.log('down');
                this.y += 1;
                console.clear();
                break;
            case 'z':
                console.log('left');
                this.x -= 1;
                console.clear();
                break;
            case 'c':
                console.log('right');
                this.x += 1;
                console.clear();
                break;
            default:
                break;
        }    
    }

    //Detect the game status if player wins or loses
    checkWin() {
        if (this.field[this.y] == undefined) {
            console.log('You lose - Out of boundary');
            return currentlyPlaying = false;            
        }
        //
        switch (this.field[this.y][this.x]) {
            case hole:
                console.log('You lose - You fell in a hole! :( ');
                currentlyPlaying = false;
                break;
            case undefined:
                console.log('You lose - Out of boundary');
                currentlyPlaying = false;
                break;
            case hat:
                console.log('You win!!!! - You found the hat! :) ');
                currentlyPlaying = false;
                break;
            case fieldCharacter:
                console.log('Keep looking for the hat...');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('You are stepping on *');
                break;
        }    
    }

    static generateField(height, width, percentage) {

        //return hole or fieldCharacter depening on percentage.
        const fieldOrHole = (percentage) => {
            if (percentage >= 0 && percentage <= 100) {
              const ranNum = Math.random() * 100;
              if (ranNum < percentage) {
                return hole;
              } else {
                return fieldCharacter;
              }
            } else {
              console.log('Please enter a number between 0 - 100');
            }
        }

        ///return a plain field with no hat and pathCharacter
        const plainField = () => {
            function makeWidthArray() {
                let widthArray = [];
                for (let i=0; i < width; i++) {
                    widthArray.push(fieldOrHole(percentage));
                }
                return widthArray;
            }
            let plainField = [];
            for (let i=0; i < height; i++) {
                plainField.push(makeWidthArray());
            }
            return plainField;
        }

        const gameReadyField = plainField();

        //while loop will check if hat sits on * and will reposition if so
        do {
            gameReadyField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        }   while (gameReadyField[0][0] == hat);
        
        //Adding pathCharacter to left-upper corner
        gameReadyField[0][0] = pathCharacter;

        return gameReadyField;
    }

}


const myField = new Field(Field.generateField(Welcome,height,width,20));

function findHatGame() {
    while(currentlyPlaying) {
        console.log(myField.print());
        myField.ask();
        myField.checkWin();
    }
    console.log('Play again!!')
}

findHatGame();
