import React, { useRef, useState } from 'react';
import Home from './Components/HomePage/Home';
import EmployeeTable from './Components/ListofEmployee/EmployeeTable';

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const tableRef = useRef(null);

  const handleEmployeeAdded = () => {
    // Trigger table to reload
    setRefreshKey(prev => prev + 1);

    // Smoothly scroll to table
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div>
      <Home onEmployeeAdded={handleEmployeeAdded} />
      <div ref={tableRef}>
        <EmployeeTable key={refreshKey} />
      </div>
    </div>
  );
};

export default App;
