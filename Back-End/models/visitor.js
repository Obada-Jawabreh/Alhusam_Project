const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    },
    lastVisited: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Visitor', visitorSchema);

////////////////////////////////////////////////////////////////////////////////////////

// const mongoose = require('mongoose');

// const visitorSchema = new mongoose.Schema({
//     pageName: {
//         type: String,
//         required: true
//     },
//     ip: {
//         type: String,
//         required: true
//     },
//     userAgent: {
//         type: String
//     },
//     visitDate: {
//         type: Date,
//         default: Date.now
//     },
//     lastVisit: {
//         type: Date,
//         default: Date.now
//     },
//     visitCount: {
//         type: Number,
//         default: 1
//     }
// }, {
//     timestamps: true
// });

// // إنشاء مؤشر مركب للـ IP والصفحة
// visitorSchema.index({ ip: 1, pageName: 1 });

// module.exports = mongoose.model('Visitor', visitorSchema);