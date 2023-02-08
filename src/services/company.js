const axios = require('axios');
const { Companies } = require('../../database/models');
const updateCompanyCeo = async (ceoName, companyName) => {
    const update = await Companies.update({ CEO: ceoName }, { where: { compName: companyName } });
    return update;
};

const getCSV = async (url) => {
    const promise = axios.get(`${url}`);
    const csv = await promise.then((response) => csvJSON(response.data));
    const data = await collatedData(csv);
    console.log(data);
    for (let i = 0; i < csv.length; i++) {
        await Companies.create({
            compId: data[i].company_id,
            compName: data[i].name,
            compSector: data[i].sector,
            CEO: data[i].ceo,
            score: Math.floor(data[i].score),
            createdAt: new Date(),
            updatedAt: new Date()

        });

    }
    const companies = await Companies.findAll({
        attributes: ['compId', 'compName', 'CEO', 'compSector'],
    }
    );

    return companies;

};
const getCompanyById = async (id) => {
    const promise = axios.get(`http://54.167.46.10/company/${id}`);
    const companyDetails = await promise.then((response) => response.data);

    return companyDetails;
};
const getCompanyBySector = async (sectorName) => {
    console.log(sectorName);
    const promise = axios.get(`http://54.167.46.10/sector?name=${sectorName}`);
    const companySector = await promise.then((response) => response.data);
    return companySector;
};
const getCompanyByRank = async () => {

    const data = await Companies.findAll({
        attributes: ['compId', 'compName', 'score'],
    });

    data.sort((a, b) => b.score - a.score);
    var rank = 1;
    for (var i = 0; i < data.length; i++) {
        // increase rank only if current score less than previous
        if (i > 0 && data[i].score < data[i - 1].score) {
            rank++;
        }
        data[i].dataValues.rank = rank;
    }

    return data;
};

module.exports = {
    getCSV,
    getCompanyById,
    getCompanyBySector,
    getCompanyByRank,
    updateCompanyCeo,
};


const collatedData = async (csv) => {
    const data = [];
    for (let i = 0; i < csv.length; i++) {
        const company_id = csv[i].company_id;
        const company_sector = csv[i].company_sector;
        const company_details = await getCompanyById(company_id);
        const company_sector_details = await getCompanyBySector(company_sector);

        const index = company_sector_details.findIndex(company => company.companyId == company_id);

        const obj = {
            company_id,

            name: company_details.name,
            sector: company_details.sector,
            ceo: company_details.ceo,
            score: score(index, company_sector_details).toFixed(2),
        };
        data.push(obj);
    }
    return data;
};



const csvJSON = (csv) => {

    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(',');

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }


    return result;
};
const score = (index, company_sector_details) => {
    const performanceIndex = company_sector_details[index].performanceIndex;
    const cpi = performanceIndex[performanceIndex.findIndex(cpi => cpi.key == 'cpi')].value;
    const cf = performanceIndex[performanceIndex.findIndex(cf => cf.key == 'cf')].value;
    const mau = performanceIndex[performanceIndex.findIndex(mau => mau.key == 'mau')].value;
    const roic = performanceIndex[performanceIndex.findIndex(roic => roic.key == 'roic')].value;
    const score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
    return score;

};