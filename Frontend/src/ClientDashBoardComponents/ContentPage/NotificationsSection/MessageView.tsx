type Props = {
    message: {
      subject: string;
      sender: string;
      date: string;
      body: string;
    };
  };
  
  export  function MessageView({ message }: Props) {
    return (
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2">{message.subject}</h1>
        <div className="text-sm text-gray-500 mb-4">
          From: <strong>{message.sender}</strong> | {message.date}
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {message.body}
        </p>
      </div>
    );
  }
  