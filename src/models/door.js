import gpio from 'pi-gpio'

export default class Door {
    constructor(pin) {
        this.open = false
        this.locks = []
        this.pin = pin
    }
    getOpen() {
        return this.open
    }
    setOpen(val) {
        if(val != this.open) {
            gpio.open(this.pin, "output", (err) => {		// Open pin 16 for output 
                gpio.write(this.pin, 1, () => {
                    setTimeout(() => {
                        gpio.write(this.pin, 0, () => {
                            this.open = val
                            gpio.close();	
                        })
                    },1000)  
                })
            })
        }

        return this.open
    }
}