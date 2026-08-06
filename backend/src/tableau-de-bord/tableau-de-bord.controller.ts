import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TableauDeBordService } from './tableau-de-bord.service';
import { StatistiquesDto } from './dto/statistiques.dto';

@ApiTags('tableau-de-bord')
@Controller('tableau-de-bord')
export class TableauDeBordController {
  constructor(private readonly tableauDeBordService: TableauDeBordService) {}

  @Get('statistiques')
  obtenirStatistiques(): Promise<StatistiquesDto> {
    return this.tableauDeBordService.obtenirStatistiques();
  }
}