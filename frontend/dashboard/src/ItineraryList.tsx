import React from 'react';
import { MapPin, Plane, Hotel } from 'lucide-react';

interface Props {
  itinerary: any[];
}

export const ItineraryList: React.FC<Props> = ({ itinerary }) => {
  return (
    <section className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200 h-full">
      <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2 text-slate-800 tracking-tight">
        <MapPin size={20} className="text-indigo-500" /> Logistics Timeline
      </h3>
      
      <div className="relative pl-4 mt-4">
        {itinerary.map((item, i) => {
          const isFlight = item.type === 'flight';
          return (
            <div key={i} className="relative pb-8 last:pb-0">
              {/* Connecting Line */}
              {i !== itinerary.length - 1 && (
                <div className="absolute left-[3px] top-6 bottom-0 w-0.5 bg-slate-100 rounded-full" />
              )}

              <div className="flex gap-4">
                {/* Timeline Icon */}
                <div className={`relative z-10 -ml-[13px] w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white shadow-sm transition-transform hover:scale-110 duration-300 ${
                  isFlight ? 'border-blue-100 text-blue-500' : 'border-indigo-100 text-indigo-500'
                }`}>
                  {isFlight ? <Plane size={14} /> : <Hotel size={14} />}
                </div>

                {/* Card */}
                <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:bg-slate-100 hover:border-slate-200 transition-colors duration-300 -mt-1 shadow-sm">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">{item.description}</p>
                      <p className="text-xs font-medium text-slate-400 mt-1">
                        {new Date(item.start_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        {item.start_date !== item.end_date && ` - ${new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                      </p>
                    </div>
                    {item.price && (
                      <span className="shrink-0 px-2.5 py-1 bg-white border border-slate-100 rounded-lg text-xs font-black text-slate-700 shadow-sm">
                        ${item.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
