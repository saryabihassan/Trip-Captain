import React from 'react';
import { MapPin, Plane, Hotel } from 'lucide-react';

interface Props {
  itinerary: any[];
}

export const ItineraryList: React.FC<Props> = ({ itinerary }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <MapPin size={20} className="text-indigo-500" /> Itinerary
      </h3>
      <div className="space-y-4">
        {itinerary.map((item, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-white rounded-lg border border-slate-100 h-fit">
              {item.type === 'flight' ? <Plane size={18} className="text-blue-500" /> : <Hotel size={18} className="text-indigo-500" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{item.description}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{new Date(item.start_date).toLocaleDateString()}</p>
              {item.price && <p className="text-xs font-bold text-slate-900 mt-1">${item.price}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
