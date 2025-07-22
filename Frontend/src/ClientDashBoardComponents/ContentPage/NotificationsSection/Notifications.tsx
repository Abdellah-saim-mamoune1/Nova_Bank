import { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../../features/Slices/hooks";
import { UpdateIsNotificationViewed } from "../../../features/Slices/Client_Infos_Slice";
import { ArrowDownCircle, ArrowUpCircle, Send, Mail, MessageCircleWarning } from "lucide-react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { UpdateIsEmployeeNotificationViewed } from "../../../features/EmployeeFeatures/Others/APIs";
import { SetNotificationViewed } from "../../../features/Others/ClientInterfaces";
export type Message = {
  id: number;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
  type: string;
};

export function Notifications() {
  const dispatch = useAppDispatch();
  const person=useAppSelector(state=>state.MainSlice.logininfos);
  const notifications = useAppSelector(
    (state: any) => person?.Type==="Client"?state.ClientInfos.ClientNotifications:
    state.EPages.ENotifications
  );
  const account=useAppSelector((state) => person?.Type==="Client"?state.ClientInfos.client_informations?.
  accountInfo.accountId:state.EPages.EmployeeInfos?.accountInfo.accountId); 

  const initialMessages = useMemo<Message[]>(() => {
    if (!notifications||!account) return [];
    return notifications.map((notif: any) => ({
      id: notif.id,
      subject: notif.title,
      body: notif.notification,
      date: new Date(notif.date).toLocaleDateString(),
      type: notif.type,
      isRead: notif.isviewed,
    }));
  }, [notifications]);

  const [messagesState, setMessagesState] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    setMessagesState(initialMessages);
  }, [initialMessages]);

  const unreadCount = messagesState.filter((msg) => !msg.isRead).length;

  const markAsRead = (id: number) => {
    setMessagesState((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );

   
    if(person?.Type==="Client"){
    dispatch(UpdateIsNotificationViewed(id));
    console.log("CLIENT");
    
  }
 
    else if(person?.Type==="Employee"){
    const isviewed:SetNotificationViewed={
    account:account,
    id:id}

    dispatch(UpdateIsEmployeeNotificationViewed(isviewed));}

  };

  if (!notifications) {
    return <div className="h-full flex-1 bg-white dark:bg-gray-900"></div>;
  }

  // Virtualization constants
  const ROW_HEIGHT = 70; // px (adjust if your row height changes)
  const LIST_WIDTH = 360; // width in px of sidebar
  const LIST_HEIGHT = 600; // max height or viewport height for scrollable list

  // Row renderer for react-window
  const Row = ({ index, style }: ListChildComponentProps) => {
    const msg = messagesState[index];
    const isSelected = selected?.id === msg.id;

    return (
      <div
        style={style}
        key={msg.id}
        onClick={() => {
          setSelected(msg);
          if (!msg.isRead) markAsRead(msg.id);
        }}
        className={`
          px-6 py-4 cursor-pointer border-b dark:border-gray-500 border-gray-600
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
          ${
            isSelected
              ? "bg-cyan-100 dark:bg-cyan-900"
              : !msg.isRead
              ? "bg-gray-100 dark:bg-gray-700 font-semibold"
              : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300"
          }
        `}
      >
        <div className="flex items-center gap-2">
          {msg.type === "Withdraw" && (
            <div className="text-red-600">
              <ArrowDownCircle size={22} />
            </div>
          )}
          {msg.type === "Deposite" && (
            <div className="text-green-600">
              <ArrowUpCircle size={22} />
            </div>
          )}
          {msg.type === "Transfer Fund" && (
            <div className="text-cyan-600">
              <Send size={22} />
            </div>
          )}
          {msg.type === "Message" && (
            <div className="text-gray-400">
              <Mail size={22} />
            </div>
          )}
          {msg.type === "Warning" && (
            <div>
              <MessageCircleWarning size={22} />
            </div>
          )}
          <div className="text-sm truncate">{msg.subject}</div>
        </div>
        <div className="text-xs text-right mt-1">{msg.date}</div>
      </div>
    );
  };

  return (
    <div className="flex-1 dark:bg-gray-900 flex flex-col h-full">
      <div className="h-full shadow-lg w-full rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="text-center dark:bg-gray-800 dark:text-white font-semibold sm:text-xl py-4 bg-white border-b dark:border-gray-500 border-gray-600 w-full rounded-t-xl">
          <h4>
            Bank Notifications{" "}
            {unreadCount > 0 && (
              <span className="text-red-500">({unreadCount} unread)</span>
            )}
          </h4>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white overflow-hidden">
          {/* Sidebar - Message List */}
          <aside
            className={`
              ${selected ? "hidden" : "block"}  /* hide on small when a message is selected */
              sm:block                             /* always show on sm+ */
              border-r border-gray-600 dark:border-gray-500
            `}
            style={{ width: LIST_WIDTH }}
          >
            <div className="px-6 py-4 border-b dark:border-gray-500 border-gray-600 text-lg font-bold sticky top-0 bg-white dark:bg-gray-800 z-10">
              📩 Inbox
            </div>

            {messagesState.length === 0 ? (
              <div className="p-6 dark:text-gray-100 text-center text-gray-400">
                No messages
              </div>
            ) : (
              <List
                height={LIST_HEIGHT}
                itemCount={messagesState.length}
                itemSize={ROW_HEIGHT}
                width={LIST_WIDTH}
                className="custom-scrollbar"
              >
                {Row}
              </List>
            )}
          </aside>

          {/* Message Detail */}
          <main
            className={`
              ${selected ? "block" : "hidden"}  /* show on small only if selected */
              sm:flex                            /* always show on sm+ */
              flex-1 flex-col
              bg-gray-50 dark:bg-gray-800 p-8 overflow-y-auto
            `}
          >
            {/* Go Back button only on small screens */}
            {selected && (
              <button
                onClick={() => setSelected(null)}
                className="sm:hidden mb-4 text-teal-600"
              >
                ← Back to Inbox
              </button>
            )}

            {selected ? (
              <div className="space-y-4">
                <div className="text-xl font-bold text-teal-700 dark:text-cyan-300">
                  {selected.subject}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selected.date}
                </div>
                <pre className="whitespace-pre-wrap text-base text-gray-700 dark:text-gray-200">
                  {selected.body}
                </pre>
              </div>
            ) : (
              <div className="m-auto text-center text-gray-400 dark:text-gray-300 text-sm">
                Select a message to view its content
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
