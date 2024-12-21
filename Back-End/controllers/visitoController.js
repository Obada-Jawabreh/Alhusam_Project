
const Visitor = require('../models/visitor');

// تحديث عدد الزوار
const updateVisitorCount = async (req, res) => {
    try {
        const { pageName } = req.body;

        let visitor = await Visitor.findOne({ pageName });

        if (!visitor) {
            visitor = new Visitor({
                pageName,
                count: 1
            });
        } else {
            visitor.count += 1;
            visitor.lastVisited = new Date();
        }

        await visitor.save();
        res.json({
            success: true,
            count: visitor.count
        });

    } catch (error) {
        console.error('Error updating visitor count:', error);
        res.status(500).json({
            success: false,
            error: 'Error updating visitor count'
        });
    }
};

// الحصول على عدد الزوار
const getVisitorCount = async (req, res) => {
    try {
        const { pageName } = req.params;
        const visitor = await Visitor.findOne({ pageName });

        res.json({
            success: true,
            count: visitor ? visitor.count : 0
        });
    } catch (error) {
        console.error('Error getting visitor count:', error);
        res.status(500).json({
            success: false,
            error: 'Error getting visitor count'
        });
    }
};

// الحصول على إحصائيات جميع الصفحات
const getAllVisitorStats = async (req, res) => {
    try {
        const stats = await Visitor.find({});
        res.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Error getting visitor stats:', error);
        res.status(500).json({
            success: false,
            error: 'Error getting visitor statistics'
        });
    }
};

module.exports = {
    updateVisitorCount,
    getVisitorCount,
    getAllVisitorStats
};


///////////////////////////////////////////////////////////////

// const Visitor = require('../models/visitor');

// // الحصول على IP العميل
// const getClientIP = (req) => {
//     return req.headers['x-forwarded-for'] ||
//            req.connection.remoteAddress ||
//            req.socket.remoteAddress;
// };

// // تحديث عدد الزوار
// const updateVisitorCount = async (req, res) => {
//     try {
//         const { pageName } = req.body;
//         console.log('Received request body:', req.body); // Add this debug log

//         if (!pageName) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Page name is required'
//             });
//         }

//         const ip = getClientIP(req);
//         const userAgent = req.headers['user-agent'];


//         // البحث عن زائر موجود بنفس IP والصفحة
//         let visitor = await Visitor.findOne({ 
//             ip: ip,
//             pageName: pageName 
//         });

//         const currentDate = new Date();

//         if (!visitor) {
//             // إنشاء سجل جديد
//             visitor = new Visitor({
//                 pageName,
//                 ip,
//                 userAgent,
//                 visitCount: 1,
//                 lastVisit: currentDate
//             });
//         } else {
//             // تحديث آخر زيارة وزيادة العداد
//             const hoursSinceLastVisit = Math.abs(currentDate - visitor.lastVisit) / 36e5;
            
//             // تحديث فقط إذا مر أكثر من 24 ساعة
//             if (hoursSinceLastVisit >= 24) {
//                 visitor.visitCount += 1;
//                 visitor.lastVisit = currentDate;
//             }
//         }
        
//         await visitor.save();

//         // حساب إجمالي الزيارات للصفحة
//         const totalVisits = await Visitor.aggregate([
//             { $match: { pageName: pageName } },
//             { $group: { _id: null, total: { $sum: '$visitCount' } } }
//         ]);

//         res.json({ 
//             success: true,
//             count: totalVisits[0]?.total || 1
//         });
        
//     } catch (error) {
//         console.error('Error updating visitor count:', error);
//         res.status(500).json({ 
//             success: false,
//             error: 'Error updating visitor count' 
//         });
//     }
// };

// // الحصول على إحصائيات الزوار
// const getVisitorStats = async (req, res) => {
//     try {
//         const stats = await Visitor.aggregate([
//             {
//                 $group: {
//                     _id: '$pageName',
//                     totalVisits: { $sum: '$visitCount' },
//                     uniqueVisitors: { $sum: 1 }
//                 }
//             }
//         ]);

//         res.json({ 
//             success: true,
//             stats 
//         });
//     } catch (error) {
//         console.error('Error getting visitor stats:', error);
//         res.status(500).json({ 
//             success: false,
//             error: 'Error getting visitor statistics' 
//         });
//     }
// };

// module.exports = {
//     updateVisitorCount,
//     getVisitorStats
// };