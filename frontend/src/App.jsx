import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CategoryButtons from './components/CategoryButtons.jsx';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <header className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="material-symbols-outlined mr-2">account_circle</span>
            <h1 className="text-xl font-bold">Feedle AI</h1>
          </div>
          <div>
          </div>
        </header>
        <CategoryButtons />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;