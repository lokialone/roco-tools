const {clipboard} = require('electron')
const EventEmitter = require('events');
class ListenClipBoard extends EventEmitter {
    constructor() {
        super();
        this.timer= null
        this.time = 1500
        this.maxCount = 20
        this.lastTexts = []
        this.listenClipBoard()
    }

    listenClipBoard() {
        this.destroyTimer();
        this.timer = setInterval(() => {
            this.pushText(clipboard.readText());
        }, this.time)
    }

    pushText(text) {
        let index = this.lastTexts.indexOf(text)
        if (index === 0) return
        if (index === -1) {
            this.lastTexts.unshift(text)
            if (this.lastTexts.length > this.maxCount) {
                this.lastTexts.pop()
            }
            this.notify()
            return
        } else {
            let newTexts = [text];
            this.lastTexts.forEach((_text) => {
                if (_text !== text) {
                    newTexts.push(_text)
                }
            })
            this.lastTexts = newTexts;
            this.notify()
        }
    }
    notify() {
        this.emit('clip-change', this.lastTexts);
    }
    destroyTimer() {
        if(this.timer) {
            clearInterval(this.timer);
            this.timer= null;
        }
    }
    destroy() {
        this.destroyTimer();
    }
}


module.exports = ListenClipBoard;