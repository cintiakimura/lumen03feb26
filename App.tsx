
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StudentView } from './components/StudentView';
import { TeacherView } from './components/TeacherView';
import { Role } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(Role.Student);

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      <Sidebar currentRole={role} setRole={setRole} />
      <main className="flex-1 flex flex-col h-screen">
        {role === Role.Student ? <StudentView /> : <TeacherView />}
      </main>
    </div>
  );
};

export default App;
