
import React, { useState } from 'react';
import { Verifier } from './components/Verifier';
import { Predictor } from './components/Predictor';
import { UpgradeModal } from './components/ui/UpgradeModal';
import { CopyIcon } from './components/icons/CopyIcon';
import { CoffeeIcon } from './components/icons/CoffeeIcon';

type Tab = 'verifier' | 'predictor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('predictor');
  const [isPro, setIsPro] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleUpgrade = () => {
    setIsPro(true);
    setIsUpgradeModalOpen(false);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const header = (
    <header className="text-center p-4 md:p-6 border-b border-slate-700 relative">
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        AI-Powered Roll Intelligence Suite
      </h1>
      <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
        Leveraging predictive analytics to provide strategic insights for provably fair systems.
      </p>
      <div className="absolute top-4 right-4">
        {isPro ? (
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-full">
                Pro Version
            </span>
        ) : (
            <button 
                onClick={() => setIsUpgradeModalOpen(true)}
                className="px-4 py-2 text-sm font-bold text-slate-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
            >
                Upgrade to Pro
            </button>
        )}
      </div>
    </header>
  );

  const tabs = (
    <div className="flex justify-center border-b border-slate-700">
      <button
        onClick={() => setActiveTab('predictor')}
        className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${
          activeTab === 'predictor'
            ? 'text-yellow-400 border-b-2 border-yellow-400'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        Predictor
      </button>
      <button
        onClick={() => setActiveTab('verifier')}
        className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${
          activeTab === 'verifier'
            ? 'text-yellow-400 border-b-2 border-yellow-400'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        Verifier
      </button>
    </div>
  );
  
  const renderContent = () => {
    switch(activeTab) {
        case 'predictor':
            return <Predictor isPro={isPro} openUpgradeModal={() => setIsUpgradeModalOpen(true)} />;
        case 'verifier':
            return <Verifier />;
        default:
            return null;
    }
  }

  const footer = (
     <footer className="text-center p-4 mt-8 text-slate-500 text-sm">
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-300 mb-3">Support the Developer</h4>
                <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4">
                    <a href="https://csgoempire.com/r/rolltoolfree" target="_blank" rel="noopener noreferrer" className="px-4 py-3 text-sm font-bold text-slate-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors shadow-md w-full sm:w-auto text-center flex items-center justify-center">
                        <span>Get a Free Case + $1 on CSGOEmpire</span>
                    </a>
                    <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center justify-center gap-2 text-center flex-grow">
                        <CoffeeIcon className="w-5 h-5 text-yellow-400" />
                        <p className="text-slate-300 text-xs px-2">
                            Support me with a coffee by tipping via CSGOEMPIRE ID:
                        </p>
                        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full">
                            <span className="font-mono text-white text-sm tracking-wider">76561199701189598</span>
                            <button onClick={() => handleCopyToClipboard('76561199701189598')} className="p-1 rounded-full hover:bg-slate-600 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">
                                {isCopied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <CopyIcon className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>This tool is for educational purposes to demonstrate "provably fair" algorithms.</p>
                <p>The prediction feature analyzes past data and is not a guarantee of future results.</p>
                <p className="mt-4">Engineered by gaconlonton33333.</p>
            </div>
        </div>
    </footer>
  )

  return (
    <>
      <div className="min-h-screen bg-transparent text-white font-sans">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {header}
          <main className="mt-8 bg-slate-800/50 rounded-lg shadow-2xl shadow-slate-950/50 animate-fade-in-up">
            {tabs}
            <div className="p-6 md:p-8">
              {renderContent()}
            </div>
          </main>
          {footer}
        </div>
      </div>
      <UpgradeModal 
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={handleUpgrade}
      />
    </>
  );
};

export default App;