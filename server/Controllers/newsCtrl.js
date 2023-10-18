import { Article } from '../model.js'

export default {
    getAllArticles: async (req, res) => {
        try {
            console.log("All articles")
            const articles = await Article.findAll()

            res.status(200).send(articles)

        } catch (err) {
            console.log(err)
            res.status(500).send("Something went wrong!")
        }
    }
}