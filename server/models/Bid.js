import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const BidSchema = new Schema(
  {
    carId: { type: ObjectId, required: true, ref: 'Car' },
    bidderId: { type: ObjectId, required: true, ref: 'Account' },
    price: { type: Number, min: 1 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// the combination of these two values is only allowed once
BidSchema.index({ carId: 1, bidderId: 1 }, { unique: true })

BidSchema.virtual('car', {
  localField: 'carId',
  foreignField: '_id',
  ref: 'Car',
  justOne: true
})

BidSchema.virtual('bidder', {
  localField: 'bidderId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
