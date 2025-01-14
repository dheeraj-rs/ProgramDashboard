import React from 'react';
import Dashboard from './components/Dashboard';
import { ProgramProvider } from './components/ProgramContext';
import { programData } from './data';

function App() {
  return (
    <ProgramProvider initialData={programData}>
      <div className="min-h-screen bg-gray-100">
        <Dashboard />
      </div>
    </ProgramProvider>
  );
}

export default App;