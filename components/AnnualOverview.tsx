import React, { useMemo } from 'react';
import { AnnualBudgetData, BudgetItem } from '../types';
import { MONTHS } from '../constants';

interface AnnualOverviewProps {
  budgetData: AnnualBudgetData;
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
  

const AnnualOverview: React.FC<AnnualOverviewProps> = ({ budgetData }) => {
    const annualSummary = useMemo(() => {
        return MONTHS.map(month => {
            const monthData = budgetData[month];
            const calculateTotal = (items: BudgetItem[]) => items.reduce((sum, item) => sum + item.actual, 0);

            const totalIncome = calculateTotal(monthData.income);
            const totalExpenses = calculateTotal(monthData.fixedExpenses) + calculateTotal(monthData.variableExpenses) + calculateTotal(monthData.savings);
            const balance = totalIncome - totalExpenses;

            return { month, totalIncome, totalExpenses, balance };
        });
    }, [budgetData]);

    const grandTotals = useMemo(() => {
        return annualSummary.reduce((acc, month) => {
            acc.totalIncome += month.totalIncome;
            acc.totalExpenses += month.totalExpenses;
            acc.balance += month.balance;
            return acc;
        }, { totalIncome: 0, totalExpenses: 0, balance: 0 });
    }, [annualSummary]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-slate-700 mb-4">Controle Anual</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600 uppercase">Mês</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-slate-600 uppercase">Total Entradas</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-slate-600 uppercase">Total Saídas</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-slate-600 uppercase">Saldo</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {annualSummary.map(({ month, totalIncome, totalExpenses, balance }) => (
              <tr key={month} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="py-3 px-4 font-medium">{month}</td>
                <td className="py-3 px-4 text-right text-blue-600">{formatCurrency(totalIncome)}</td>
                <td className="py-3 px-4 text-right text-orange-600">{formatCurrency(totalExpenses)}</td>
                <td className={`py-3 px-4 text-right font-bold ${balance >= 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                  {formatCurrency(balance)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="font-extrabold text-slate-800 bg-slate-200">
              <tr>
                <td className="py-4 px-4">Total Anual</td>
                <td className="py-4 px-4 text-right">{formatCurrency(grandTotals.totalIncome)}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(grandTotals.totalExpenses)}</td>
                <td className={`py-4 px-4 text-right ${grandTotals.balance >= 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                    {formatCurrency(grandTotals.balance)}
                </td>
              </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AnnualOverview;