type Props = {
    messages: any[];
    selectedId: number | null;
    onSelect: (id: number) => void;
  };
  
  export  function MessageList({ messages, selectedId, onSelect }: Props) {
    return (
      <div className="md:w-1/3 bg-white border-r overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => onSelect(msg.id)}
            className={`p-4 cursor-pointer hover:bg-gray-100 border-b ${
              selectedId === msg.id ? "bg-blue-50" : ""
            }`}
          >
            <h4 className="font-semibold">{msg.subject}</h4>
            <p className="text-sm text-gray-600">{msg.sender}</p>
            <p className="text-xs text-gray-500">{msg.date}</p>
          </div>
        ))}
      </div>
    );
  }
  