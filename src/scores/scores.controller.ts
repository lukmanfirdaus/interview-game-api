import { Controller, Get, Post, Body } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Score } from './scores.entity';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  async submitScore(@Body() score: Score) {
    await this.scoresService.submitScore(score);
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.scoresService.getLeaderboard();
  }
}