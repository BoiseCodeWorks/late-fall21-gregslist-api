import { Auth0Provider } from '@bcwdev/auth0provider'
import { bidsService } from '../services/BidsService'
import BaseController from '../utils/BaseController'

export class BidsController extends BaseController {
  constructor() {
    super('api/bids')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put(':/id', this.edit)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.bidderId = req.userInfo.id
      const bid = await bidsService.create(req.body)
      res.send(bid)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.bidderId = req.userInfo.id
      req.body.id = req.params.id
      const bid = await bidsService.edit(req.body)
      res.send(bid)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await bidsService.remove(req.params.id, req.userInfo.id)
      res.send({ message: 'Removed Bid' })
    } catch (error) {
      next(error)
    }
  }
}
