module.exports = (app, db) => {
    app.get('/products', (req, res) => {
        db.product.findAll()
            .then((result) => {
                res.status(201).json(result)
            }).catch((err) => {
                res.status(400).json({ message: err.message })
            })
    })
    app.post('/upload', (req, res) => {
        product_id = req.body.product_id
        product_name = req.body.product_name
        price = req.body.price
        detail = req.body.detail
        category = req.body.category
        images_id = req.body.images_id
        image_url_1 = req.body.image_url_1
        image_url_2 = req.body.image_url_2
        image_url_3 = req.body.image_url_3
        image_url_4 = req.body.image_url_4

        db.images.create({
            image_url_1: image_url_1,
            image_url_2: image_url_2,
            image_url_3: image_url_3,
            image_url_4: image_url_4,

        }).then((result) => {
            console.log(result)
            db.product.create({
                images_id: result.images_id,
                product_id: product_id,
                product_name: product_name,
                price: price,
                detail: detail,
                category: category,
            })

            res.status(201).json(result)
        }).catch((err) => {
            res.status(400).json({ ErrorMessage: err.message })
        })
    })
    // app.put('/boat/:id', (req, res) => {
    //     db.boat.update(
    //         {
    //             name: req.body.name,
    //             color: req.body.color
    //         },
    //         {
    //             where: { id: req.params.id }
    //         }
    //     ).then((result) => {
    //         res.status(201).json('update success')
    //     }).catch((err) => {
    //         res.status(400).json('update error')
    //     })
    // })
    // app.delete('/boat/:id', (req, res) => {
    //     db.boat.destroy(
    //         {
    //             where: { id: req.params.id }
    //         }
    //     ).then((result) => {
    //         res.status(204).json('delete success')
    //     }).catch((err) => {
    //         res.status(400).json('delete error')
    //     })
    // })
}