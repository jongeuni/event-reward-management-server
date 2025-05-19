import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Title, TitleSchema } from './title.schema';
import { TitleRepository } from './title.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Title.name, schema: TitleSchema }]),
  ],
  providers: [TitleRepository],
  exports: [TitleRepository],
})
export class TitleRepositoryModule {}