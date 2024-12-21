import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const VisitorCounter = ({ pageName = 'homepage' }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndUpdateVisitor = async () => {
      try {
        const visitorKey = `visitor_${pageName}`;
        const lastVisitTime = localStorage.getItem(visitorKey);
        const currentTime = new Date().getTime();
        
        // تحقق مما إذا كان المستخدم قد زار الصفحة في آخر 24 ساعة
        if (!lastVisitTime || (currentTime - parseInt(lastVisitTime)) > 24 * 60 * 60 * 1000) {
          // تحديث عدد الزوار فقط إذا كانت الزيارة جديدة
          const updateResponse = await fetch('http://localhost:5000/api/visitors/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pageName })
          });
          const updateData = await updateResponse.json();
          
          if (updateData.success) {
            setVisitorCount(updateData.count);
            // تحديث وقت آخر زيارة
            localStorage.setItem(visitorKey, currentTime.toString());
          }
        } else {
          // إذا كان المستخدم قد زار الصفحة مؤخراً، نقوم فقط بجلب العدد الحالي
          const response = await fetch(`http://localhost:5000/api/visitors/${pageName}`);
          const data = await response.json();
          if (data.success) {
            setVisitorCount(data.count);
          }
        }
      } catch (error) {
        console.error('Error with visitor tracking:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAndUpdateVisitor();
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
              <div className="flex items-center justify-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  عدد زوار منصتنا الكرام
                </h3>
              </div>

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
       <Link to="/provider">
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
</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisitorCounter;