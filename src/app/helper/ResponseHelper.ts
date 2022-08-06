import {Response} from 'express';

class ResponseHelper {

  async success (res: Response, content: any) {
    return res.status(200).json(content);
  }

  async created (res: Response, content: any) {
    return res.status(201).json(content);
  }

  async noContent (res: Response) {
    return res.status(204);
  }

  async badRequest (res: Response, content: any) {
    return res.status(400).json(content);
  }

  async notAuthorized (res: Response, content: any) {
    return res.status(401).json(content);
  }

  async notFound (res: Response, content: any) {
    return res.status(404).json(content);
  }

  async unprocessableEntity (res: Response, content: any) {
    return res.status(422).json(content);
  }
}
export default new ResponseHelper();
