import { AnnualBudgetData, MonthlyData } from './types';

export const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const createInitialMonthData = (): MonthlyData => ({
  income: [
    { id: 'inc1', category: 'Renda', description: 'Salário', planned: 0, actual: 0 },
    { id: 'inc2', category: 'Renda', description: 'Renda Extra', planned: 0, actual: 0 },
    { id: 'inc3', category: 'Renda', description: 'Investimentos', planned: 0, actual: 0 },
    { id: 'inc4', category: 'Renda', description: 'Outros', planned: 0, actual: 0 },
  ],
  fixedExpenses: [
    { id: 'fix1', category: 'Despesas Fixas', description: 'Aluguel/Financiamento', planned: 0, actual: 0 },
    { id: 'fix2', category: 'Despesas Fixas', description: 'Água', planned: 0, actual: 0 },
    { id: 'fix3', category: 'Despesas Fixas', description: 'Luz', planned: 0, actual: 0 },
    { id: 'fix4', category: 'Despesas Fixas', description: 'Gás', planned: 0, actual: 0 },
    { id: 'fix5', category: 'Despesas Fixas', description: 'Internet', planned: 0, actual: 0 },
    { id: 'fix6', category: 'Despesas Fixas', description: 'Telefone', planned: 0, actual: 0 },
    { id: 'fix7', category: 'Despesas Fixas', description: 'Transporte', planned: 0, actual: 0 },
    { id: 'fix8', category: 'Despesas Fixas', description: 'Supermercado', planned: 0, actual: 0 },
    { id: 'fix9', category: 'Despesas Fixas', description: 'Saúde', planned: 0, actual: 0 },
    { id: 'fix10', category: 'Despesas Fixas', description: 'Educação', planned: 0, actual: 0 },
  ],
  variableExpenses: [
    { id: 'var1', category: 'Despesas Variáveis', description: 'Lazer', planned: 0, actual: 0 },
    { id: 'var2', category: 'Despesas Variáveis', description: 'Compras Pessoais', planned: 0, actual: 0 },
    { id: 'var3', category: 'Despesas Variáveis', description: 'Presentes e Extras', planned: 0, actual: 0 },
    { id: 'var4', category: 'Despesas Variáveis', description: 'Alimentação Fora', planned: 0, actual: 0 },
    { id: 'var5', category: 'Despesas Variáveis', description: 'Emergências', planned: 0, actual: 0 },
  ],
  savings: [
    { id: 'sav1', category: 'Poupança e Investimentos', description: 'Reserva de Emergência', planned: 0, actual: 0 },
    { id: 'sav2', category: 'Poupança e Investimentos', description: 'Aposentadoria', planned: 0, actual: 0 },
    { id: 'sav3', category: 'Poupança e Investimentos', description: 'Metas Financeiras', planned: 0, actual: 0 },
  ],
});

export const INITIAL_BUDGET_DATA: AnnualBudgetData = MONTHS.reduce((acc, month) => {
  acc[month] = createInitialMonthData();
  return acc;
}, {} as AnnualBudgetData);