import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

// this decorator along with interceptor to keep only userId from user while saving tasks
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map(data => instanceToPlain(data)));
  }
}