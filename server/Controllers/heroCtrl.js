import { Hero } from "../model.js"

export default {
    getHeros: async (req, res) => {
        try {console.log("getHeros")
        const allHeros = await Hero.findAll()
        console.log(allHeros)
        res.send(allHeros)
        } catch(err) {
            console.log(err)
        }
    },
    
}