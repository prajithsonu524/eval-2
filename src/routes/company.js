const router = require('express').Router();

const { getCompanyDetails, getCompanyByRank, updateCompanyCeo } = require('../controller/company');
router.post('/api/save', getCompanyDetails);

router.get('/api/companies', getCompanyByRank);
router.post('/api/update', updateCompanyCeo);





module.exports = router;