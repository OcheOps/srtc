import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PeerService } from './peer.service';

@Controller('peer')
export class PeerController {
  constructor(private readonly peerService: PeerService) {}

  @All('*')
  handlePeer(@Req() req: Request, @Res() res: Response) {
    const peerServer = this.peerService.getPeerServer();
    peerServer(req, res);
  }
}