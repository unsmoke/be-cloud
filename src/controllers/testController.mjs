import testService from '../services/testService.mjs'

const test = async (req, res, next) => {
    try {
        const result = await testService.test();
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
