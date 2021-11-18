import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { carsService } from './CarsService'

class BidsService {
  async getById(id) {
    const bid = await dbContext.Bids.findById(id)
    if (!bid) {
      throw new BadRequest('Invalid Bid Id')
    }
    return bid
  }

  async getBidsByCarId(carId) {
    return await dbContext.Bids.find({ carId }).populate('bidder')
  }

  async getBidsByBidderId(bidderId) {
    return await dbContext.Bids.find({ bidderId }).populate('car')
  }

  async create(body) {
    await carsService.getById(body.carId)
    const found = await dbContext.Bids.findOne({ carId: body.carId, bidderId: body.bidderId })
    if (found) {
      throw new BadRequest('You already have a bid')
    }
    const bid = await dbContext.Bids.create(body)
    await bid.populate('bidder car')
    return bid
  }

  async edit(body) {
    const bid = await this.getById(body.id)
    if (bid.id.toString() !== body.creatorId) {
      throw new BadRequest('This is not your bid')
    }
    if (bid.price > body.price) {
      throw new BadRequest('Bids can only increase in price')
    }
    bid.price = body.price
    await bid.save()
    return bid
  }

  async remove(bidId, userId) {
    const bid = await this.getById(bidId)
    if (bid.id.toString() !== userId) {
      throw new BadRequest('This is not your bid')
    }
    await dbContext.Bids.findByIdAndDelete(bidId)
  }
}

export const bidsService = new BidsService()
