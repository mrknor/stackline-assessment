import React from 'react';
import { useSelector } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { RootState } from '../store';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-white border border-gray-200 rounded shadow-sm text-sm">
                <p>
                    {`Date: ${new Date(payload[0].payload.weekEnding).toLocaleDateString(
                        'en-US',
                        { month: 'short', day: 'numeric', year: 'numeric' }
                    )}`}
                </p>
                <p>{`Retail Sales: $${payload[0].value.toLocaleString()}`}</p>
                <p>{`Wholesale Sales: $${payload[1].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const SalesChart: React.FC = () => {
    const product = useSelector((state: RootState) => state.sales.product);

    if (!product) return null;

    // X-axis logic
    const uniqueMonthTicks: string[] = [];
    let lastMonthKey = '';
    product.sales.forEach((sale) => {
        const date = new Date(sale.weekEnding);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        if (monthKey !== lastMonthKey) {
            uniqueMonthTicks.push(sale.weekEnding);
            lastMonthKey = monthKey;
        }
    });

    return (
        <div className="mb-8">
            <h2 className="text-xl text-gray-600 mb-6">Retail Sales</h2>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={product.sales}
                        margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                    >
                        <XAxis
                            dataKey="weekEnding"
                            ticks={uniqueMonthTicks}
                            tickFormatter={(value) =>
                                new Date(value)
                                    .toLocaleDateString('en-US', { month: 'short' })
                                    .toUpperCase()
                            }
                            stroke="#B0B0B0"
                            fontSize={12}
                            padding={{ left: 10, right: 10 }}
                            axisLine={{ stroke: '#E0E0E0' }}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[-500000, 1500000]} 
                            stroke="#B0B0B0"
                            fontSize={12}
                            axisLine={{ stroke: '#E0E0E0' }}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
                        <Line
                            type="monotone"
                            dataKey="retailSales"
                            stroke="#40A0FF"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 5 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="wholesaleSales"
                            stroke="#A0AEC0"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesChart;
