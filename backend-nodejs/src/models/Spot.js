const mongoose = require('mongoose')

const connectionUrl = require('../services/connectionUrl')

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true,
  }
})

/*o metodo virtual cria um novo atributo
  dentro do objeto. 
  Nessa caso chamado de thumbnail_url
  que traz o caminho (endpoit) para se ter acesso 
  a imagem do Spot*/
SpotSchema.virtual('thumbnail_url').get(function() {
  return `${connectionUrl}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema)