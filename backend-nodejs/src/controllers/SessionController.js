const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email } = req.body

        //Consulta se o usuário existe
        let user = await User.findOne({ email })

        //Caso não exista faz a criação
        if (!user) { user = await User.create({ email }) }
        
        return res.json(user)
    }

}


