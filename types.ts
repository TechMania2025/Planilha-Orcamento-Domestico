
export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  planned: number;
  actual: number;
}

export type BudgetSection = BudgetItem[];

export interface MonthlyData {
  income: BudgetSection;
  fixedExpenses: BudgetSection;
  variableExpenses: BudgetSection;
  savings: BudgetSection;
}

export type AnnualBudgetData = Record<string, MonthlyData>;

export enum CategoryKey {
  Income = 'income',
  FixedExpenses = 'fixedExpenses',
  VariableExpenses = 'variableExpenses',
  Savings = 'savings'
}
