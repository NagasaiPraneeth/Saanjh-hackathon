import { useState } from 'react';

const NewSignin = () => {
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user

  // Function to handle user selection
  const selectUser = (user) => {
    setSelectedUser(user);
    // Optionally, you can navigate or perform other actions based on user selection here
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-50">
      <div className="layout-container flex flex-col max-w-[960px] w-full px-6">
        <header className="flex items-center justify-between border-b border-solid border-b-[#e7edf3] px-4 py-3">
          <div className="flex items-center gap-4 text-[#0e141b]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em]">HealthCo</h2>
          </div>
          <div className="flex items-center gap-8">
            <button className="text-[#1980e6] text-sm font-medium leading-normal" onClick={() => alert('Link to professionals')}>
              For professionals
            </button>
            <button className="text-[#1980e6] text-sm font-medium leading-normal" onClick={() => alert('Link to caretakers')}>
              For caretakers
            </button>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center flex-1">
          <h2 className="text-[#0e141b] tracking-light text-[28px] font-bold leading-tight pb-3">Welcome to HealthCo</h2>
          <button
            className="bg-[#1980e6] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] py-3 px-8 rounded-lg mb-6"
            onClick={() => alert('Display user selection')}
          >
            Select User
          </button>
          {/* User selection options */}
          {selectedUser === null && (
            <div className="flex gap-6">
              <button
                className="flex items-center justify-center bg-[#1980e6] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] py-3 px-8 rounded-lg"
                onClick={() => selectUser('doctor')}
              >
                Doctor
              </button>
              <button
                className="flex items-center justify-center bg-[#1980e6] text-slate-50 text-base font-bold leading-normal tracking-[0.015em] py-3 px-8 rounded-lg"
                onClick={() => selectUser('caretaker')}
              >
                Caretaker
              </button>
            </div>
          )}
          {/* Display selected user */}
          {selectedUser && (
            <div className="text-[#0e141b] text-base font-normal leading-normal mt-4">
              You are signed in as <strong>{selectedUser}</strong>.
            </div>
          )}
        </div>
        <footer className="flex justify-center py-3">
          <p className="text-[#4e7397] text-sm font-normal leading-normal">
            By continuing, you agree to our Terms of Use and Privacy Policy
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NewSignin;
