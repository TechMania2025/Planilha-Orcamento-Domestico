
import React from 'react';

interface SummaryProps {
  totalIncome: number;
  totalExpenses: number;
  finalBalance: number;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SummaryCard: React.FC<{ title: string; value: number; colorClass: string; icon: React.ReactNode }> = ({ title, value, colorClass, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-xl font-bold text-slate-800">{formatCurrency(value)}</p>
        </div>
    </div>
);


const Summary: React.FC<SummaryProps> = ({ totalIncome, totalExpenses, finalBalance }) => {
  const balanceColor = finalBalance >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
  const balanceIcon = finalBalance >= 0 ? 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> : 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-slate-700 mb-4">Resumo Mensal</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Total de Entradas" value={totalIncome} colorClass="bg-blue-100 text-blue-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
        <SummaryCard title="Total de Saídas" value={totalExpenses} colorClass="bg-orange-100 text-orange-600" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
        <SummaryCard title="Saldo Final" value={finalBalance} colorClass={balanceColor} icon={balanceIcon} />
      </div>
      {totalExpenses > totalIncome && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
          <strong>Alerta:</strong> Suas despesas ultrapassaram sua renda este mês!
        </div>
      )}
    </div>
  );
};

export default Summary;
