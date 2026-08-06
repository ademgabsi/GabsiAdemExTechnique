import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogsMiddleware } from './middlewares/logs.middleware';

@Module({
  imports: [],
})
export class CommunModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}