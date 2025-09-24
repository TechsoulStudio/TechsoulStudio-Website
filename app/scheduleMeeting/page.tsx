"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const dynamic = "force-dynamic";

function ScheduleMeetingContent() {
  const [showPopup, setShowPopup] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const popupParam = searchParams?.get("popup");
    if (popupParam === "true" || popupParam === null) {
      setShowPopup(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setShowPopup(false);
    router.push("/services");
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="relative w-[90%] h-[90vh] bg-white rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-3xl font-light z-10"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="w-full md:w-[40%] p-4 sm:p-6 flex flex-col items-center justify-center bg-[#f9f9f9] border-b md:border-b-0 md:border-r border-gray-200 text-center">
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src="/images/1.png"
                  alt="Techsoulstudio"
                  fill
                  className="object-cover rounded-full shadow"
                  priority
                />
              </div>
              <h3 className="text-xs font-medium text-gray-500 mb-1">
                Techsoulstudio
              </h3>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 leading-snug">
                Personalised Discussion
              </h2>
              <div className="flex items-center justify-center gap-1 text-gray-600 text-xs mb-2">
                <span>🕒</span>
                <span>30 min</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                Web conferencing details provided upon confirmation.
                <br />
                Schedule a call with us to explore how we can work together.
              </p>
            </div>
            <div className="w-full md:w-[60%] h-full">
              <iframe
                src="https://calendly.com/techsoulstudio/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Calendly Scheduling"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ScheduleMeeting() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ScheduleMeetingContent />
    </Suspense>
  );
}
