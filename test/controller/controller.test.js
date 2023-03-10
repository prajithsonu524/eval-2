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
        await Controller.getCompanyDetails(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockValue);

    });
    it('should return a message of not a sucessful insertion in db', async () => {

        jest.spyOn(Services, 'getCSV').mockResolvedValue(0);
        const req = {
            body: {
                urlLink: 'http://localhost:3000/company/api/save',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await Controller.getCompanyDetails(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'The company data was not inserted in the database ' });
    });
});
describe('GET companies with scores calculated', () => {
    it('should return the company data with scores', async () => {
        const mockValue = [{
            company_id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
            name: 'Volkswagen',
            ceo: 'Henry Rempel',
            score: '15.78',
            rank: 1
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
        await Controller.getCompanyByRank(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockValue);

    });

});
describe('POST update the ceo name', () => {
    it('should return a message of successful updation', async () => {
        const mockValue = {
            message: 'updated'
        };
        jest.spyOn(Services, 'updateCompanyCeo').mockResolvedValue(mockValue);
        const req = {
            body: {
                ceoName: 'Henry Rempel',
                companyName: 'Volkswagen'
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await Controller.updateCompanyCeo(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockValue);
    });
    it('should return a message of not found', async () => {

        jest.spyOn(Services, 'updateCompanyCeo').mockResolvedValue(0);
        const req = {
            body: {
                ceoName: 'Henry Rempel',
                companyName: 'Volkswagen'
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await Controller.updateCompanyCeo(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'The company with the given ID was not found.' });
    });
});