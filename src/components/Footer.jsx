import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-16 px-4">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        <div className="flex flex-col items-center md:items-start space-y-4">
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
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Jobzee. Sva prava zadržana.</p>
      </div>
    </footer>
  );
};

export default Footer;