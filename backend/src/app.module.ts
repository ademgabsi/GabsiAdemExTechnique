import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProduitsModule } from './produits/produits.module';
import { CommunModule } from './commun/commun.module';
import { TableauDeBordModule } from './tableau-de-bord/tableau-de-bord.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>(
          'SQLITE_PATH',
          './gestion-stock.sqlite',
        ),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ProduitsModule,
    CommunModule,
    TableauDeBordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
