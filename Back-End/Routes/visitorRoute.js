const express = require('express');
const router = express.Router();
const {
    updateVisitorCount,
    getVisitorCount,
    getAllVisitorStats
} = require('../controllers/visitoController');

// تحديث عدد الزوار لصفحة معينة
router.post('/update', updateVisitorCount);

// الحصول على عدد الزوار لصفحة معينة
router.get('/:pageName', getVisitorCount);

// الحصول على إحصائيات جميع الصفحات
router.get('/', getAllVisitorStats);

module.exports = router;
//////////////////////////////////////////////////////////////////////
// const express = require('express');
// const router = express.Router();
// const {
//     updateVisitorCount,
//     getVisitorStats
// } = require('../controllers/visitoController');

// // تحديث عدد الزوار لصفحة معينة
// router.post('/update', updateVisitorCount);

// // الحصول على إحصائيات جميع الصفحات
// router.get('/', getVisitorStats);

// module.exports = router;
