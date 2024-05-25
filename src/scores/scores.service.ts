import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './scores.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
  ) {}
  
  async submitScore(score: Score): Promise<void> {
    await this.scoresRepository.save(score);
  }

  async getLeaderboard(): Promise<Score[]> {
    return this.scoresRepository.find({
      order: { score: 'DESC' },
      take: 10,
    });
  }
}
