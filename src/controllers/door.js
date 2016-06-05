import Door from 'models/door'

let garage = new Door()

export default {
    getOpen: (req, res) => {
        garage.getOpen()
        res.send(garage)
    },
    setOpen: (req, res) => {
        if(req.body.open === "true") {
            garage.setOpen(true)
        } else {
            garage.setOpen(false)
        }
        res.send(garage)
    },
    getLocks: (req, res) => {
        res.send()
    }
}