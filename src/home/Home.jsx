import React from 'react';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sélectionnez votre mode de paiement
        </h1>
        <div className="space-y-4">
          <a href='/add' className="w-full flex justify-center py-2 text-white bg-orange-500 rounded hover:bg-orange-600">
            Orange Money
          </a>
          <a href='/tMoney' className="w-full flex justify-center py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
            TMoney
          </a>
          <a href='/moov' className="w-full flex justify-center py-2 text-white bg-green-600 rounded hover:bg-green-700">
            Moov Money
          </a>
          <a href='/wave' className="w-full flex justify-center py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Wave Money
          </a>
          <a href='/airtel' className="w-full flex justify-center py-2 text-white bg-red-600 rounded hover:bg-red-700">
            Airtel Money
          </a>
          <a href='/vodacome' className="w-full flex justify-center py-2 text-white bg-red-700 rounded hover:bg-red-800">
            Vodafone
          </a>
        </div>
      </div>
      <a href="/paiement">.</a>
    </div>
  );
}
