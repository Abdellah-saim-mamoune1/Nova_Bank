export  function Sidebar() {
    return (
      <aside className="w-64 bg-white shadow-lg hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Bank Messages</h2>
        </div>
        <nav className="p-4 space-y-2 text-gray-700">
          <button className="block w-full text-left hover:text-blue-600">Inbox</button>
          <button className="block w-full text-left hover:text-blue-600">Sent</button>
          <button className="block w-full text-left hover:text-blue-600">Archived</button>
        </nav>
      </aside>
    );
  }
  