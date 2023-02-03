const Controller = require('../../src/controller/company.js');
const Services = require('../../src/services/company.js');

describe('POST url and get back the data with scores', () => {
    it('should return the company data with scores', async () => {
        const mockValue = [{
            company_id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
            name: 'Volkswagen',
            ceo: 'Henry Rempel',
            score: '15.78'
        },

        ];
        jest.spyOn(Services, 'getCSV').mockResolvedValue(mockValue);
        const req = {
            body: {
                urlLink: 'http://localhost:3000/company/api/save',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        await Controller.getCSV(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockValue);

    });
});
describe('GET companies with scores calculated', () => {
    it('should return the company data with scores', async () => {
        const mockValue = [{
            company_id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
            name: 'Volkswagen',
            ceo: 'Henry Rempel',
            score: '15.78'
        },

        ];
        jest.spyOn(Services, 'getCompanyByRank').mockResolvedValue(mockValue);
        const req = {
            query: {
                name: 'Automotive',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        await Controller.getCompanyBySector(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockValue);

    });

});