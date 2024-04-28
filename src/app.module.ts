import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { ReviesService } from './revies/revies.service';

@Module({
  imports: [ReviewModule],
  controllers: [AppController],
  providers: [AppService, ReviesService],
})
export class AppModule {}
