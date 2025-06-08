import express from 'express';
import { calculateCagr } from '../services/cagr.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/cagr/calculate:
 *   post:
 *     summary: Calculate CAGR (Compound Annual Growth Rate)
 *     tags: [CAGR]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - initialInvestment
 *               - finalInvestmentValue
 *               - investmentPeriod
 *             properties:
 *               initialInvestment:
 *                 type: number
 *                 description: Initial investment amount
 *                 example: 100000
 *               finalInvestmentValue:
 *                 type: number
 *                 description: Final investment value
 *                 example: 150000
 *               investmentPeriod:
 *                 type: number
 *                 description: Investment period in years
 *                 example: 5
 *               adjustForInflation:
 *                 type: boolean
 *                 description: Whether to adjust for inflation
 *                 example: true
 *               inflationRate:
 *                 type: number
 *                 description: Annual inflation rate (if adjusting for inflation)
 *                 example: 6
 *     responses:
 *       200:
 *         description: CAGR calculation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cagr:
 *                   type: number
 *                   description: Calculated CAGR
 *                   example: 8.45
 *                 totalReturn:
 *                   type: number
 *                   description: Total return percentage
 *                   example: 50
 *                 absoluteReturn:
 *                   type: number
 *                   description: Absolute return amount
 *                   example: 50000
 *                 inflationAdjustedCagr:
 *                   type: number
 *                   description: Inflation-adjusted CAGR
 *                   example: 2.45
 *                 inflationAdjustedValue:
 *                   type: number
 *                   description: Inflation-adjusted final value
 *                   example: 112000
 *                 yearlyBreakdown:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: number
 *                         example: 1
 *                       value:
 *                         type: number
 *                         example: 108450
 *                       inflationAdjustedValue:
 *                         type: number
 *                         example: 102311
 *       400:
 *         description: Invalid input parameters
 */
router.post('/calculate', (req, res) => {
  try {
    const result = calculateCagr(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router; 