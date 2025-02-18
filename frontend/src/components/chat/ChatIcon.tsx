import { useQuery } from '@apollo/client';
import { GET_VISITOR_CHATS } from '@/graphql/queries';
import { useAuth } from '@/contexts/VisitorAuthContext';
import Link from 'next/link';
import { BsChatDots } from 'react-icons/bs';

const ChatIcon = () => {
  const { visitor } = useAuth();
  
  const { data } = useQuery(GET_VISITOR_CHATS, {
    variables: { visitorId: visitor?.id },
    skip: !visitor?.id,
  });

  const unreadCount = data?.getVisitorChats?.length || 0;

  return (
    <Link href="/visitor-dashboard/chats" className="relative">
      <BsChatDots className="text-2xl hover:text-orange transition-colors" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Link>
  );
};

export default ChatIcon;
