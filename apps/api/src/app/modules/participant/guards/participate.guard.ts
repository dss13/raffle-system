import { BadGatewayException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ParticipantService } from '../participant.service';

@Injectable()
export class ParticipateGuard implements CanActivate {
  constructor(private participantService: ParticipantService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.participantService.validateParticipation(request.body);
  }
}
