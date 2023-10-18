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
    },

    addArticle: async (req, res) => {
        try {
            console.log("Add Article")

            const { title, date, description, imgUrl } = req.body

            const articleObj = await Article.create({
                title,
                date,
                description,
                imgUrl
            });
            res.status(200).send(articleObj)
        } catch (err) {
            console.log(err)
            res.status(500).send("Something went wrong creating new article")
        }
    },

    updateArticle: async (req, res) => {
        try {
            console.log("Update Article!")

            const { title, date, description, imgUrl } = req.body
            const { id } = req.params

            const updateArticle = await Article.update(
                {
                    title,
                    date,
                    description,
                    imgUrl
                },
                {
                    where: { articleId: id }
                }
            )
            const updatedArticle = await Article.findByPk(id);
            res.status(200).send(updatedArticle)

        } catch (err) {
            console.log(err)
            res.status(500).send("Error updating article")
        }
    },

    removeArticle: async (req, res) => {
        try {
            console.log("RemoveArticle")

            const { id } = req.params;

            const deletedArticle = await Article.destroy({
                where: { articleId: id }
            })
            if (deletedArticle) {
                res.status(200).send("Deleted article successfully")
            } else {
                res.status(404).send("Article not found!")
            }

        } catch (err) {
            console.log(err)
            res.status(500).send("Internal server error")
        }
    }
}