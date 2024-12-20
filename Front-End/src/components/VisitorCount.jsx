
// import React, { useEffect, useState } from 'react';

// const VisitorCounter = ({ pageName = 'homepage' }) => {
//   const [visitorCount, setVisitorCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const updateVisitorCount = async () => {
//       try {
//         // تحقق من آخر زيارة في localStorage
//         const lastVisit = localStorage.getItem(`lastVisit_${pageName}`);
//         const now = new Date().getTime();
        
//         // إذا لم تكن هناك زيارة سابقة أو مر أكثر من 24 ساعة
//         if (!lastVisit || (now - parseInt(lastVisit)) > 24 * 60 * 60 * 1000) {
//           // تحديث العداد
//           const response = await fetch('http://localhost:5000/api/visitors/update', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ pageName }),
//           });
          
//           const data = await response.json();
//           if (data.success) {
//             setVisitorCount(data.count);
//             // تحديث وقت آخر زيارة
//             localStorage.setItem(`lastVisit_${pageName}`, now.toString());
//           }
//         } else {
//           // إذا كانت هناك زيارة حديثة، نجلب فقط العدد الحالي
//           const response = await fetch(`http://localhost:5000/api/visitors/${pageName}`);
//           const data = await response.json();
//           if (data.success) {
//             setVisitorCount(data.count);
//           }
//         }
//       } catch (error) {
//         console.error('Error with visitor counter:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     updateVisitorCount();
//   }, [pageName]);

//   const containerStyle = {
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//     maxWidth: '300px',
//     margin: '20px auto',
//     textAlign: 'center'
//   };

//   const titleStyle = {
//     fontSize: '1.5rem',
//     color: '#333',
//     marginBottom: '15px',
//     fontWeight: 'bold'
//   };

//   const counterStyle = {
//     fontSize: '2.5rem',
//     color: '#2563eb',
//     fontWeight: 'bold'
//   };

//   const loadingStyle = {
//     fontSize: '1.5rem',
//     color: '#9ca3af'
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={titleStyle}>عداد الزوار</h2>
//       <div>
//         {loading ? (
//           <span style={loadingStyle}>جاري التحميل...</span>
//         ) : (
//           <span style={counterStyle}>{visitorCount}</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VisitorCounter;
////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Users } from 'lucide-react';

// const VisitorCounter = ({ pageName = 'homepage' }) => {
//   const [visitorCount, setVisitorCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVisitors = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/visitors/${pageName}`);
//         const data = await response.json();
//         if (data.success) {
//           setVisitorCount(data.count);
//         }
//       } catch (error) {
//         console.error('Error fetching visitors:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVisitors();
//   }, [pageName]);

//   return (
//     <section className="py-16 bg-gradient-to-b from-[#1E88E5]/10 to-transparent">
//       <div className="container mx-auto px-4">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-lg mx-auto"
//         >
//           <div className="
//             bg-gradient-to-br from-[#1E88E5] to-[#64B5F6]
//             rounded-2xl p-8 text-white text-center
//             shadow-lg hover:shadow-xl
//             transform hover:scale-105 transition-all
//             duration-300
//           ">
//             <div className="flex justify-center mb-4">
//               <div className="bg-white/20 p-4 rounded-full">
//                 <Users className="w-10 h-10" />
//               </div>
//             </div>
            
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               className="mb-3"
//             >
//               <span className="text-4xl font-bold">
//                 {loading ? "..." : visitorCount.toLocaleString('ar-SA')}
//               </span>
//             </motion.div>
            
//             <p className="text-lg text-white/90">
//               عدد زوار منصتنا الكرام
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default VisitorCounter;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const VisitorCounter = ({ pageName = 'homepage' }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/visitors/${pageName}`);
        const data = await response.json();
        if (data.success) {
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching visitors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, [pageName]);

  return (
    <section className="py-16 bg-gradient-to-b from-[#1E88E5]/10 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold text-[#1565C0] mb-6">
            نفخر بثقتكم ونسعى دائماً لتقديم تجربة استثنائية
          </h2>

          <div className="
      bg-gradient-to-br from-[#1E88E5] to-[#64B5F6]
      rounded-2xl p-8 text-white
      shadow-lg hover:shadow-xl
      transform hover:scale-105 transition-all
      duration-300 max-w-xl mx-auto
    ">
      <div className="space-y-6">
        {/* Header with title and icon */}
        <div className="flex items-center justify-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            عدد زوار منصتنا الكرام
          </h3>
        </div>

        {/* Counter number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-5xl font-bold block mb-2">
            {loading ? "..." : visitorCount.toLocaleString('ar-SA')}
          </span>
          <p className="text-lg text-white/90">
            زائر يثق بنا ويشاركنا النجاح
          </p>
        </motion.div>
      </div>
    </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="
              bg-[#1E88E5] text-white 
              px-8 py-3 
              rounded-full text-lg font-semibold
              hover:bg-[#1565C0] transition-colors
              shadow-md hover:shadow-lg
              transform hover:scale-105 transition-all
              duration-300 mt-8
            ">
              انضمي إلينا اليوم
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisitorCounter;