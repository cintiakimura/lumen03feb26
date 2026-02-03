
import React from 'react';
import { Role } from '../types';

interface SidebarProps {
  currentRole: Role;
  setRole: (role: Role) => void;
}

const GrokLogo = () => (
    <div className="flex items-center justify-center mb-10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 6C8.69 6 6 8.69 6 12H8C8 9.79 9.79 8 12 8V6Z" fill="currentColor"/>
            <path d="M15.5 10.5C15.5 10.22 15.28 10 15 10H13V12H15C15.28 12 15.5 11.78 15.5 11.5V10.5Z" fill="currentColor"/>
            <path d="M10.5 13.5C10.5 13.78 10.28 14 10 14H8V12H10C10.28 12 10.5 12.22 10.5 12.5V13.5Z" fill="currentColor"/>
        </svg>
        <span className="text-xl font-bold ml-2 text-gray-200">Lumen</span>
    </div>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const TeacherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v1.5M12 17.75v-1.5M12 12.25v-1.5M12 12.25h-1.5M12 12.25h1.5M4.253 12h-1.5M19.75 12h1.5M5.636 5.636l-1.06 1.06M18.364 18.364l1.06-1.06M5.636 18.364l-1.06-1.06M18.364 5.636l1.06 1.06" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


export const Sidebar: React.FC<SidebarProps> = ({ currentRole, setRole }) => {
  const baseButtonClass = "flex items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors duration-200";
  const activeButtonClass = "bg-gray-700 text-white";
  const inactiveButtonClass = "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700/50 p-6 flex flex-col">
      <GrokLogo />
      <nav className="flex-1 space-y-2">
        <button
          onClick={() => setRole(Role.Student)}
          className={`${baseButtonClass} ${currentRole === Role.Student ? activeButtonClass : inactiveButtonClass}`}
        >
          <UserIcon />
          Student Mode
        </button>
        <button
          onClick={() => setRole(Role.Teacher)}
          className={`${baseButtonClass} ${currentRole === Role.Teacher ? activeButtonClass : inactiveButtonClass}`}
        >
          <TeacherIcon />
          Teacher Mode
        </button>
      </nav>
      <div className="text-xs text-center text-gray-500 mt-6">
        <p>Powered by Grok</p>
        <p>&copy; Lumen Academy</p>
      </div>
    </aside>
  );
};
