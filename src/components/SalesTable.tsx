import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SalesData } from '../types';

const SalesTable: React.FC = () => {
  const product = useSelector((state: RootState) => state.sales.product);
  const [sortField, setSortField] = useState<keyof SalesData>('weekEnding');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (!product || !product.sales) {
    return <div className="bg-gray-50 rounded p-8">Loading...</div>;
  }

  const handleSort = (field: keyof SalesData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...product.sales].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === 'asc'
      ? (aValue > bValue ? 1 : -1)
      : (bValue > aValue ? 1 : -1);
  });

  return (
    <div className="bg-gray-50 rounded overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th 
              className="py-4 px-6 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 border-b"
              onClick={() => handleSort('weekEnding')}
            >
              WEEK ENDING
            </th>
            <th 
              className="py-4 px-6 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 border-b"
              onClick={() => handleSort('retailSales')}
            >
              RETAIL SALES
            </th>
            <th 
              className="py-4 px-6 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 border-b"
              onClick={() => handleSort('wholesaleSales')}
            >
              WHOLESALE SALES
            </th>
            <th 
              className="py-4 px-6 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 border-b"
              onClick={() => handleSort('unitsSold')}
            >
              UNITS SOLD
            </th>
            <th 
              className="py-4 px-6 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 border-b"
              onClick={() => handleSort('retailerMargin')}
            >
              RETAILER MARGIN
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedData.map((sale) => (
            <tr key={sale.weekEnding} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6 text-sm text-gray-600">
                {new Date(sale.weekEnding).toLocaleDateString('en-US', { 
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit'
                })}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                ${sale.retailSales.toLocaleString()}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                ${sale.wholesaleSales.toLocaleString()}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {sale.unitsSold.toLocaleString()}
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                ${sale.retailerMargin.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;