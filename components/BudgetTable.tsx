import React from 'react';
import { MonthlyData, BudgetItem, BudgetSection, CategoryKey } from '../types';

interface BudgetTableProps {
  monthData: MonthlyData;
  onDataChange: (category: CategoryKey, itemId: string, field: 'planned' | 'actual', value: number) => void;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Section: React.FC<{
  title: string;
  items: BudgetSection;
  categoryKey: CategoryKey;
  onDataChange: (category: CategoryKey, itemId: string, field: 'planned' | 'actual', value: number) => void;
  isIncome?: boolean;
}> = ({ title, items, categoryKey, onDataChange, isIncome = false }) => {
  const totalPlanned = items.reduce((sum, item) => sum + item.planned, 0);
  const totalActual = items.reduce((sum, item) => sum + item.actual, 0);
  const totalDifference = totalActual - totalPlanned;

  const getDifferenceClasses = (diff: number) => {
    if (diff === 0) return 'text-slate-500';
    if (isIncome) {
      return diff > 0 
        ? 'text-green-700 bg-green-50' 
        : 'text-red-700 bg-red-50';
    }
    return diff > 0 
        ? 'text-red-700 bg-red-50' 
        : 'text-green-700 bg-green-50';
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-bold text-slate-600 mb-2 px-1">{title}</h3>
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-sm text-slate-600 uppercase w-2/5">Descrição</th>
            <th className="text-right py-3 px-4 font-semibold text-sm text-slate-600 uppercase w-1/5">Planejado</th>
            <th className="text-right py-3 px-4 font-semibold text-sm text-slate-600 uppercase w-1/5">Real</th>
            <th className="text-right py-3 px-4 font-semibold text-sm text-slate-600 uppercase w-1/5">Diferença</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {items.map((item) => {
            const difference = item.actual - item.planned;
            return (
              <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-2 px-4 text-right">
                  <input
                    type="number"
                    value={item.planned || ''}
                    onChange={(e) => onDataChange(categoryKey, item.id, 'planned', parseFloat(e.target.value) || 0)}
                    className="w-full text-right bg-transparent outline-none focus:bg-slate-100 rounded p-1"
                    placeholder="R$ 0,00"
                  />
                </td>
                <td className="py-2 px-4 text-right">
                  <input
                    type="number"
                    value={item.actual || ''}
                    onChange={(e) => onDataChange(categoryKey, item.id, 'actual', parseFloat(e.target.value) || 0)}
                    className="w-full text-right bg-transparent outline-none focus:bg-slate-100 rounded p-1"
                    placeholder="R$ 0,00"
                  />
                </td>
                <td className={`py-3 px-4 text-right font-medium ${getDifferenceClasses(difference)}`}>
                  {formatCurrency(difference)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="font-bold bg-slate-100">
          <tr>
            <td className="py-3 px-4 text-slate-600">Total</td>
            <td className="py-3 px-4 text-right text-slate-600">{formatCurrency(totalPlanned)}</td>
            <td className="py-3 px-4 text-right text-slate-600">{formatCurrency(totalActual)}</td>
            <td className={`py-3 px-4 text-right ${getDifferenceClasses(totalDifference)}`}>{formatCurrency(totalDifference)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};


const BudgetTable: React.FC<BudgetTableProps> = ({ monthData, onDataChange }) => {
  return (
    <div className="space-y-6">
      <Section title="Entradas de Renda" items={monthData.income} categoryKey={CategoryKey.Income} onDataChange={onDataChange} isIncome={true}/>
      <Section title="Despesas Fixas" items={monthData.fixedExpenses} categoryKey={CategoryKey.FixedExpenses} onDataChange={onDataChange} />
      <Section title="Despesas Variáveis" items={monthData.variableExpenses} categoryKey={CategoryKey.VariableExpenses} onDataChange={onDataChange} />
      <Section title="Planejamento de Poupança e Investimentos" items={monthData.savings} categoryKey={CategoryKey.Savings} onDataChange={onDataChange} />
    </div>
  );
};

export default BudgetTable;