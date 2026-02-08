import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AddReminder } from './components/AddReminder';
import { UpgradeModal } from './components/UpgradeModal';
import { useReminders } from './context/ReminderContext';

function AppContent() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { isUpgradeModalOpen } = useReminders();

  return (
    <Layout onAddClick={() => setIsAddOpen(true)}>
      <Dashboard />
      {isAddOpen && <AddReminder onClose={() => setIsAddOpen(false)} />}
      {isUpgradeModalOpen && <UpgradeModal />}
    </Layout>
  )
}

function App() {
  return <AppContent />
}

export default App

