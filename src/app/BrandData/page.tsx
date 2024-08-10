"use client"
import React, { useCallback } from 'react';
import Brands from '@/components/Brands/brandsData';
import ChatboxComponent from '@/components/UserInformation/Chatbox';
import axios from 'axios';
import ChatbotSectionOne from '@/components/UserInfo/ChatbotSectionOne'; 

const Page = () => {
  const handleSendMessage = useCallback(async (message: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/chatbot', { message });
      if (response.data && response.data.success) {
        console.log('Message stored successfully');
      } else {
        console.error('Error storing message:', response.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);
  

  return (
    <div>
      {}
      <Brands />

    </div>
  );
};

export default Page;
