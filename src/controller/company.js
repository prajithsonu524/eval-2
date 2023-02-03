
const Services = require('../services/company');

const getCSV = async (req, res) => {
    const data = await Services.getCSV(req.body.urlLink);

    res.status(200).send(data);


};
const getCompanyById = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const companyDetails = await Services.getCompanyById(id);
    res.send(companyDetails);


};
const getCompanyBySector = async (req, res) => {
    const sectorName = req.query.name;

    const companySector = await Services.getCompanyByRank(sectorName);
    res.status(200).send(companySector);


};
const updateCompanyCeo = async (req, res) => {
    const ceoName = req.body.ceoName;
    const companyName = req.body.companyName;
    const update = await Services.updateCompanyCeo(ceoName, companyName);
    if (!update) return res.status(404).send('The company with the given ID was not found.');
    res.json({ message: 'updated' });
};

module.exports = {
    getCSV,
    getCompanyById,
    getCompanyBySector,
    updateCompanyCeo,

};


