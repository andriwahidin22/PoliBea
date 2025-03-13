const express = require('express');
const router = express.Router();
const ScholarshipController = require('../controllers/scholarshipController'); // Pastikan ini benar

router.get('/scholarships', ScholarshipController.getAllScholarships);
router.post('/scholarships', ScholarshipController.createScholarship);
router.put('/scholarships/:id', ScholarshipController.updateScholarship);
router.delete('/scholarships/:id', ScholarshipController.deleteScholarship);

module.exports = router;