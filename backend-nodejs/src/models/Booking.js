const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    date : String,
    approved: Boolean,
    /*Atributos a seguir foram criados para fazer relacionamento 
      com outras coleções.
      E ai? que foi que disse que Mongo por que é NoSql não pode ter relações?
      Pode sim meu chapa!
      Meu Senhor! eu tenho problemas*/
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    spot: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Spot'
    }
})

module.exports = mongoose.model('Booking',BookingSchema)