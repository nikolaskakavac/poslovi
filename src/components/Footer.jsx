import React from 'react';
import { Mail, MapPin, Briefcase } from 'lucide-react'; 
const Footer = () => {
  return (
   
    <footer className="bg-slate-900 text-slate-200 py-16 px-4">
      
    
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
               <Briefcase size={28} className="text-white" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Jobzee
            </span>
          </div>
          <p className="text-slate-400 text-sm text-center md:text-left max-w-xs">
            Započni karijeru ili napravi sledeći veliki korak - Jobzee tvoj partner na putu do uspeha!
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Meni</h3>
          <ul className="flex flex-col gap-4 text-center">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 font-medium">Početna</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 font-medium">Ponuda</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 font-medium">Za Kompanije</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 font-medium">Blog & Saveti</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Kontakt</h3>
          <div className="flex flex-col gap-4 text-slate-300 text-center md:text-right">
            

            <a href="mailto:hello@jobzee.rs" className="flex items-center justify-center md:justify-end gap-3 hover:text-blue-400 transition-colors group">
              <Mail size={20} className="text-blue-500 group-hover:animate-pulse" />
              <span className="font-medium">support@jobzee.rs</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Jobzee. Sva prava zadržana.</p>
      </div>
    </footer>
  );
};

export default Footer;