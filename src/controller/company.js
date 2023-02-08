
const Services = require('../services/company');

const getCompanyDetails = async (req, res) => {
    const companies = await Services.getCSV(req.body.urlLink);
    if (!companies) return res.status(401).json({ message: 'The company data was not inserted in the database ' });
    res.status(200).json(companies);


};

const getCompanyByRank = async (req, res) => {


    const companySector = await Services.getCompanyByRank();
    res.status(200).json(companySector);


};
const updateCompanyCeo = async (req, res) => {
    const ceoName = req.body.ceoName;
    const companyName = req.body.companyName;
    const update = await Services.updateCompanyCeo(ceoName, companyName);
    if (update == 0) return res.status(401).json({ message: 'The company with the given ID was not found.' });
    res.status(200).json({ message: 'updated' });
};

module.exports = {
    getCompanyDetails,

    getCompanyByRank,
    updateCompanyCeo,

};


