import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BidSchema } from '../models/Bid'
import { CarSchema } from '../models/Car'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Bids = mongoose.model('Bid', BidSchema);
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarSchema)
  // Profiles is the same collection as account and therefore acts as a 'reducer'
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
