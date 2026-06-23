import express from 'express';
import PortfolioData from '../models/PortfolioData.js';
import protect from '../middleware/authMiddleware.js';
import { getDefaultData } from '../seed.js';

const router = express.Router();

const VALID_SECTIONS = [
  'hero', 'skills', 'projects', 'currentlyBuilding',
  'education', 'certifications', 'achievements', 'proofOfWork', 'contact', 'footer'
];

// Helper: get or create the single portfolio document
const getPortfolioDoc = async () => {
  let doc = await PortfolioData.findOne();
  if (!doc) {
    const defaults = getDefaultData();
    doc = await PortfolioData.create(defaults);
  }
  return doc;
};

// GET /api/data — Get ALL portfolio data (public)
router.get('/', async (req, res) => {
  try {
    const doc = await getPortfolioDoc();
    res.json(doc);
  } catch (error) {
    console.error('Get all data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/data/:section — Get a specific section (public)
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;
    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({ message: `Invalid section: ${section}` });
    }
    const doc = await getPortfolioDoc();
    res.json({ [section]: doc[section] });
  } catch (error) {
    console.error('Get section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/data/:section — Update a specific section (protected)
router.put('/:section', protect, async (req, res) => {
  try {
    const { section } = req.params;
    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({ message: `Invalid section: ${section}` });
    }

    const doc = await getPortfolioDoc();
    doc[section] = req.body[section] ?? req.body;
    doc.updatedAt = new Date();
    await doc.save();

    res.json({ message: `${section} updated successfully`, [section]: doc[section] });
  } catch (error) {
    console.error('Update section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/data/reset/:section — Reset a section to defaults (protected)
router.post('/reset/:section', protect, async (req, res) => {
  try {
    const { section } = req.params;
    if (!VALID_SECTIONS.includes(section)) {
      return res.status(400).json({ message: `Invalid section: ${section}` });
    }

    const defaults = getDefaultData();
    const doc = await getPortfolioDoc();
    doc[section] = defaults[section];
    doc.updatedAt = new Date();
    await doc.save();

    res.json({ message: `${section} reset to defaults`, [section]: doc[section] });
  } catch (error) {
    console.error('Reset section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/data/reset — Reset ALL data to defaults (protected)
router.post('/reset', protect, async (req, res) => {
  try {
    const defaults = getDefaultData();
    await PortfolioData.deleteMany({});
    const doc = await PortfolioData.create(defaults);
    res.json({ message: 'All data reset to defaults', data: doc });
  } catch (error) {
    console.error('Reset all error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
