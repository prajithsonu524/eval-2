const router = require('express').Router();

const { getCSV, getCompanyById, getCompanyBySector, updateCompanyCeo } = require('../controller/company');
router.post('/api/save', getCSV);
router.get('/:id', getCompanyById);
router.get('/api/companies', getCompanyBySector);
router.post('/api/update', updateCompanyCeo);





module.exports = router;