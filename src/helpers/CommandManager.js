export class CommandManager {

    constructor(engine) {
        this.engine = engine;
        this.stack = [];
        this.index = 0;
    }

    addCommand = (command) => {
        // A change is made, so everything stored after the current point in the timeline should be erased.
        this.stack.length = this.index;
        this.stack.push(command);
        this.index += 1;
    }

    undo = () => {
        if (this.index > 0) {
            this.index = this.index -1;

            const command = this.stack[this.index];

            command.undo(this.engine);
        }
    }

    redo = () => {
        if (this.index < (this.stack.length - 1)) {
            this.index++;

            const command = this.stack[this.index];

            command.execute(this.engine);
        }
    }
}

