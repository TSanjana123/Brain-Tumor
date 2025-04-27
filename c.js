// src/components/HouseLoanInterestRateDisplay.js
import React from "react";

// Helper function to format numbers as currency (e.g., add commas)
const formatCurrency = (value) => {
    if (typeof value !== 'number') return value; // Return as is if not a number
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }); // Adjust currency as needed
};

// Helper function to format numbers with commas (for non-currency amounts)
const formatNumber = (value) => {
     if (typeof value !== 'number') return value;
     return value.toLocaleString('en-US');
}

const HouseLoanInterestRateDisplay = ({ recievedBpsData }) => {
    // Show loading or empty state if data is not yet available
    if (!recievedBpsData) {
        return (
            <div className="container mx-auto p-6 text-center text-gray-500">
                Loading AI analysis data...
            </div>
        );
    }

    // Destructure the data for easier access
    const {
        base_rate,
        bps, // Total BPS adjustment from parameters
        market_bps, // Market specific adjustment
        final_rate,
        customer_id,
        loan_amount,
        loan_duration, // Assuming years based on value '1'
        results // Array of parameter details
    } = recievedBpsData;

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                Loan Interest Rate Analysis
            </h2>

            {/* Section 1: Key Rate Summary */}
            <div className="bg-white shadow-lg rounded-lg border p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                    Rate Calculation Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded">
                        <p className="text-sm font-medium text-blue-600">Base Rate</p>
                        <p className="text-2xl font-bold text-blue-800">
                            {base_rate?.toFixed(2)} %
                        </p>
                    </div>
                     <div className="p-3 bg-red-50 rounded">
                        <p className="text-sm font-medium text-red-600">Customer Adjustment</p>
                        <p className="text-2xl font-bold text-red-800">
                           - {bps?.toFixed(2)} BPS
                        </p>
                         <p className="text-xs text-gray-500">(Based on Profile)</p>
                    </div>
                     <div className="p-3 bg-yellow-50 rounded">
                        <p className="text-sm font-medium text-yellow-700">Market Adjustment</p>
                        <p className="text-2xl font-bold text-yellow-900">
                           - {market_bps?.toFixed(2)} BPS
                        </p>
                         <p className="text-xs text-gray-500">(Market Conditions)</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm font-medium text-green-600">Final Proposed Rate</p>
                        <p className="text-2xl font-bold text-green-800">
                            {final_rate?.toFixed(2)} %
                        </p>
                    </div>
                </div>
                 <p className="text-xs text-gray-500 mt-4 text-center">
                    Note: BPS stands for Basis Points (100 BPS = 1%). Adjustments are subtracted from the Base Rate.
                 </p>
            </div>

            {/* Section 2: Customer and Loan Details */}
             <div className="bg-white shadow-lg rounded-lg border p-6 mb-6">
                 <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                    Customer & Loan Information
                </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Customer ID</p>
                        <p className="text-lg font-semibold text-gray-800">{customer_id || 'N/A'}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-gray-500">Loan Amount</p>
                        {/* Format loan amount as currency */}
                        <p className="text-lg font-semibold text-gray-800">{formatCurrency(loan_amount) || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Loan Duration</p>
                        <p className="text-lg font-semibold text-gray-800">{loan_duration || 'N/A'} {loan_duration === 1 ? 'Year' : 'Years'}</p>
                    </div>
                 </div>
             </div>


            {/* Section 3: Detailed Parameter Breakdown */}
            <div className="bg-white shadow-lg rounded-lg border p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                    Detailed Adjustment Factors
                </h3>
                <div className="overflow-x-auto"> {/* Makes table horizontally scrollable on small screens */}
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="py-3 px-4 rounded-l-lg">
                                    Parameter
                                </th>
                                <th scope="col" className="py-3 px-4">
                                    Value
                                </th>
                                <th scope="col" className="py-3 px-4 text-right rounded-r-lg">
                                    BPS Adjustment
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {results && results.length > 0 ? (
                                results.map((item, index) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.parameter}
                                        </th>
                                        <td className="py-3 px-4">
                                            {/* Handle numeric values that might need formatting */}
                                            {typeof item.value === 'number' && ['Balance', 'EstimatedSalary', 'AnnualIncome', 'LoanAmount', 'MonthlyDebtPayments', 'SavingsAccountBalance', 'CheckingAccountBalance', 'TotalAssets', 'TotalLiabilities', 'MonthlyIncome', 'NetWorth'].includes(item.parameter)
                                              ? formatNumber(item.value)
                                              : item.value}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            {/* Show BPS with higher precision */}
                                            {item.bps?.toFixed(4)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-gray-500">
                                        No detailed parameters available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                         <tfoot>
                            <tr className="font-semibold text-gray-900 bg-gray-100">
                                <th scope="row" colSpan="2" className="py-3 px-4 text-base text-right">Total Customer BPS Adjustment</th>
                                <td className="py-3 px-4 text-base text-right">{bps?.toFixed(4)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HouseLoanInterestRateDisplay;