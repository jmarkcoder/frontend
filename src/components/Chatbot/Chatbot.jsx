import React, { useState, useEffect, useRef } from 'react';
import '../Style/Chatbot.css';
import axios from 'axios';
import Messages from './Messages';
// import pcIssues from './PC_Issues';
// import {RiQuestionnaireLine} from "react-icons/ri";

const Chatbot = ({isDarkMode}) => {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const textQuery = async () => {
    if (!message) return; // don't send empty message
    const response = await axios.post('http://localhost:3001/chatbot/query', {
      user_query: message,
    });
    setConversations([...conversations, { userMessage: message, response: response.data }]);
    setMessage('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  return (
    <div className="messages-container">
    <div className={`chatbot ${isDarkMode ? "dark-mode" : ""}`}>
      <div className='chatbot__body'>
        {conversations.map((conversation, index) => (
          <Messages
            key={index}
            userMessage={conversation.userMessage}
            response={conversation.response}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* <div className='pc__issues'>
        {pcIssues.map((issue, index) => (
          <p key={index}>{issue.issue}</p>
        ))}
    </div> */}
      <div className='chatbot__footer'>
        <input
          className='chatbot__footer--input'
          type='text'
          placeholder='Ask here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && textQuery()}
        />
        {/* <RiQuestionnaireLine className='question_icon'/> */}
        <i className='fa-sharp fa-solid fa-location-arrow' onClick={textQuery} />
      </div>
    </div>
    </div>
  );
};

export default Chatbot;
