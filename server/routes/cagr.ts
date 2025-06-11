import express, { Request, Response } from 'express';
import { calculateCagr } from '../services/cagr.js';

const router = express.Router();

interface CagrRequest {
  initialValue: number;
  finalValue: number;
  years: number;
}

interface CagrResponse {
  cagr: number;
  totalReturn: number;
  absoluteReturn: number;
}

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
 *               - initialValue
 *               - finalValue
 *               - years
 *             properties:
 *               initialValue:
 *                 type: number
 *                 description: Initial investment value
 *               finalValue:
 *                 type: number
 *                 description: Final investment value
 *               years:
 *                 type: number
 *                 description: Investment period in years
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
 *                   description: Compound Annual Growth Rate
 *                 totalReturn:
 *                   type: number
 *                   description: Total return amount
 *                 absoluteReturn:
 *                   type: number
 *                   description: Absolute return percentage
 *       400:
 *         description: Invalid input parameters
 */
router.post('/calculate', (req: Request<{}, {}, CagrRequest>, res: Response<CagrResponse>) => {
  const { initialValue, finalValue, years } = req.body;

  // Validate input
  if (!initialValue || !finalValue || !years) {
    return res.status(400).json({
      error: 'Missing required fields',
    } as any);
  }

  if (initialValue <= 0 || finalValue < 0 || years <= 0) {
    return res.status(400).json({
      error: 'Invalid input values',
    } as any);
  }

  // Calculate CAGR
  const cagr = Math.pow(finalValue / initialValue, 1 / years) - 1;
  const totalReturn = finalValue - initialValue;
  const absoluteReturn = (totalReturn / initialValue) * 100;

  res.json({
    cagr,
    totalReturn,
    absoluteReturn,
  });
});

export default router; 