import { Test, TestingModule } from '@nestjs/testing';
import { ScoresService } from './scores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Score } from './score.entity';

describe('ScoresService', () => {
  let service: ScoresService;

  // Membuat modul pengujian sebelum setiap pengujian
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScoresService,
        // Menyediakan repository palsu untuk pengujian
        {
          provide: getRepositoryToken(Score),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ScoresService>(ScoresService);
  });

  // Pengujian untuk metode submitScore
  describe('submitScore', () => {
    it('should save score to the database', async () => {
      // Menyiapkan data pengujian
      const scoreData = { name: 'Alice', score: 100 };

      // Menjalankan metode yang diuji
      await service.submitScore(scoreData);

      // Memastikan bahwa metode save pada repository dipanggil dengan data yang benar
      expect(service.scoreRepository.save).toHaveBeenCalledWith(scoreData);
    });
  });

  // Pengujian untuk metode getLeaderboard
  describe('getLeaderboard', () => {
    it('should return leaderboard from the database', async () => {
      // Data leaderboard palsu
      const leaderboardData = [{ name: 'Alice', score: 100 }, { name: 'Bob', score: 90 }];

      // Mengatur perilaku repository palsu
      service.scoreRepository.find.mockResolvedValue(leaderboardData);

      // Menjalankan metode yang diuji
      const leaderboard = await service.getLeaderboard();

      // Memastikan bahwa metode find pada repository dipanggil
      expect(service.scoreRepository.find).toHaveBeenCalled();

      // Memastikan bahwa leaderboard yang dikembalikan adalah yang diharapkan
      expect(leaderboard).toEqual(leaderboardData);
    });
  });
});
