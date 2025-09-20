import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ReferenceLine } from 'recharts';

interface ChartsProps {
  expenseData: { name: string; value: number }[];
  balanceData: { name: string; saldo: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D1FF', '#FF9D19'];

const CustomTooltipPie = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-bold">{`${payload[0].name}`}</p>
          <p className="text-sm">{`Valor: ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
          <p className="text-sm">{`Percentual: ${(payload[0].percent * 100).toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
};

const CustomTooltipLine = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-bold">{`Mês: ${label}`}</p>
          <p className="text-sm" style={{ color: payload[0].value >= 0 ? '#10B981' : '#EF4444' }}>{`Saldo: ${payload[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
        </div>
      );
    }
    return null;
};

const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        strokeWidth={2}
        fill={payload.saldo >= 0 ? '#10B981' : '#EF4444'}
        stroke="#fff"
      />
    );
};


const Charts: React.FC<ChartsProps> = ({ expenseData, balanceData }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-slate-700 mb-4">Despesas por Categoria</h3>
        <div style={{ width: '100%', height: 300 }}>
          {expenseData.length > 0 ? (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltipPie />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
                Nenhum dado de despesa para exibir.
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-slate-700 mb-4">Evolução do Saldo Anual</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={balanceData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="name" tick={{fill: '#475569'}}/>
              <YAxis tickFormatter={(value) => `R$${Number(value)/1000}k`} tick={{fill: '#475569'}} />
              <Tooltip content={<CustomTooltipLine />} cursor={{stroke: '#d1d5db', strokeWidth: 1}}/>
              <ReferenceLine y={0} stroke="#64748b" strokeDasharray="2 2" />
              <Line 
                type="monotone" 
                dataKey="saldo" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={<CustomDot />}
                activeDot={{ r: 7, strokeWidth: 2 }} 
            />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Charts;