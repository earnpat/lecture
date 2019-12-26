module.exports = (app, db) => {
    app.get('/registers', (req, res) => {
        db.customer.findAll()
        .then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            res.status(400).json({ message: err.message })
        })
    })
    app.post('/register', (req, res) => {
        customer_id = req.body.customer_id
        customer_username = req.body.customer_username
        customer_password = req.body.customer_password
        firstname = req.body.firstname
        lastname = req.body.lastname
        birth = req.body.birth
        email = req.body.email
        address = req.body.address
        tel = req.body.tel
        
        db.customer.create({
            customer_id: customer_id,
            customer_username: customer_username,
            customer_password: customer_password,
            firstname: firstname,
            lastname: lastname,
            birth: birth,
            email: email,
            address: address,
            tel: tel,
            
        }).then((result) => {
            // console.log('customer regis success')
            res.status(201).json(result)
        }).catch((err) => {
            // console.log(`customer regis fail ${err}`)
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