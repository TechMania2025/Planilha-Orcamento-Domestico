
import React, { useState, useMemo, useCallback } from 'react';
import { AnnualBudgetData, CategoryKey, BudgetItem } from './types';
import { INITIAL_BUDGET_DATA, MONTHS } from './constants';
import Header from './components/Header';
import BudgetTable from './components/BudgetTable';
import Summary from './components/Summary';
import Charts from './components/Charts';
import AnnualOverview from './components/AnnualOverview';

const App: React.FC = () => {
  const [budgetData, setBudgetData] = useState<AnnualBudgetData>(INITIAL_BUDGET_DATA);
  const [currentMonth, setCurrentMonth] = useState<string>(MONTHS[new Date().getMonth()]);

  const handleDataChange = useCallback((month: string, category: CategoryKey, itemId: string, field: 'planned' | 'actual', value: number) => {
    setBudgetData(prevData => {
      const newData = { ...prevData };
      const monthData = { ...newData[month] };
      const sectionData = [...monthData[category]];
      const itemIndex = sectionData.findIndex(item => item.id === itemId);
      
      if (itemIndex > -1) {
        sectionData[itemIndex] = { ...sectionData[itemIndex], [field]: value };
        monthData[category] = sectionData;
        newData[month] = monthData;
      }
      return newData;
    });
  }, []);

  const currentMonthData = budgetData[currentMonth];

  const { totalIncome, totalExpenses, finalBalance, expenseChartData, annualChartData } = useMemo(() => {
    const calculateTotal = (items: BudgetItem[]) => items.reduce((sum, item) => sum + item.actual, 0);

    // Monthly Calculations
    const totalIncome = calculateTotal(currentMonthData.income);
    const fixed = calculateTotal(currentMonthData.fixedExpenses);
    const variable = calculateTotal(currentMonthData.variableExpenses);
    const savings = calculateTotal(currentMonthData.savings);
    const totalExpenses = fixed + variable + savings;
    const finalBalance = totalIncome - totalExpenses;

    const expenseCategories = [
        ...currentMonthData.fixedExpenses,
        ...currentMonthData.variableExpenses,
        ...currentMonthData.savings
    ];
    const expenseChartData = expenseCategories
        .filter(item => item.actual > 0)
        .map(item => ({ name: item.description, value: item.actual }));

    // Annual Calculations
    const annualChartData = MONTHS.map(month => {
        const monthData = budgetData[month];
        const income = calculateTotal(monthData.income);
        const expenses = calculateTotal(monthData.fixedExpenses) + calculateTotal(monthData.variableExpenses) + calculateTotal(monthData.savings);
        return {
            name: month.substring(0, 3),
            saldo: income - expenses
        };
    });

    return { totalIncome, totalExpenses, finalBalance, expenseChartData, annualChartData };
  }, [currentMonthData, budgetData]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
        
        <main className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Summary 
                totalIncome={totalIncome} 
                totalExpenses={totalExpenses} 
                finalBalance={finalBalance}
              />
              <BudgetTable 
                monthData={currentMonthData}
                onDataChange={(category, itemId, field, value) => handleDataChange(currentMonth, category, itemId, field, value)}
              />
            </div>
            <div className="space-y-6">
              <Charts expenseData={expenseChartData} balanceData={annualChartData} />
            </div>
          </div>
          <div className="mt-6">
            <AnnualOverview budgetData={budgetData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
