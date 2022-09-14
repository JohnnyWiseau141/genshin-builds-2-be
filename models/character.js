import mongoose from 'mongoose'

const Schema = mongoose.Schema

const characterSchema = new Schema ({
  characterName: String,
  characterWeapon: String,
  characterVision: String,
  characterNation: String,
  characterRarity: Number,
  skillTalents: String,
  passiveTalents: String,
  constellations: String,
  buildRanking: [{type: Schema.Types.Number, ref: 'Build'}]
})

const Character = mongoose.model('Character', characterSchema)

export {
  Character
}