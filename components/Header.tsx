import React from 'react';
import { MONTHS } from '../constants';

interface HeaderProps {
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentMonth, setCurrentMonth }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">
        Orçamento doméstico inteligente
      </h1>
      <div className="mt-4 sm:mt-0">
        <select
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
          className="bg-white border border-slate-300 rounded-md py-2 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {MONTHS.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;