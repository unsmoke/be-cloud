import dummyService from '../services/dummyService.mjs'

const test = async (req, res, next) => {
    try {
        const result = await dummyService.test();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    test
}
