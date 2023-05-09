import express = require('express');
import LeaderboardService from '../database/services/leaderboard.service';
import LeaderboardController from '../database/controllers/leaderboard.controller';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

const router = express.Router();

router.get('/home', leaderboardController.getHomeTeams);
router.get('/away', leaderboardController.getAwayTeams);

export default router;
