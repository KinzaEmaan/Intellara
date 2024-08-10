"use client";

import React, { useEffect } from 'react';

interface Message {
    name: string;
    message: string;
}

interface ChatboxProps {
    onSendMessage: (message: string) => void;
}

class Chatbox {
    args: {
        openButton: HTMLElement | null;
        chatBox: HTMLElement | null;
        sendButton: HTMLElement | null;
    };

    state: boolean;
    messages: Message[];

    constructor() {
        this.args = {
            openButton: null,
            chatBox: null,
            sendButton: null,
        };

        this.state = false;
        this.messages = [];
    }

    display(onSendMessage: (message: string) => void) {
        const { openButton, chatBox, sendButton } = this.args;

        openButton?.addEventListener('click', () => this.toggleState(chatBox));

        sendButton?.addEventListener('click', () => this.onSendButton(chatBox, onSendMessage));

        const node = chatBox?.querySelector('input');
        node?.addEventListener('keyup', ({ key }) => {
            if (key === 'Enter') {
                this.onSendButton(chatBox, onSendMessage);
            }
        });
    }

    toggleState(chatbox: HTMLElement | null) {
        if (!chatbox) return;

        this.state = !this.state;

        if (this.state) {
            chatbox.classList.add('translate-y-[-10px]', 'z-[123456]', 'opacity-100');
            chatbox.classList.remove('opacity-0');
        } else {
            chatbox.classList.add('opacity-0');
            chatbox.classList.remove('translate-y-[-10px]', 'z-[123456]', 'opacity-100');
        }
    }

    onSendButton(chatbox: HTMLElement | null, onSendMessage: (message: string) => void) {
        if (!chatbox) return;

        const textField = chatbox.querySelector('input') as HTMLInputElement;
        let text1 = textField.value.trim();
        if (text1 === '') {
            return;
        }

        let msg1: Message = { name: 'User', message: text1 };
        this.messages.push(msg1);
        this.updateChatText(chatbox);

        onSendMessage(text1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((r) => {
                let msg2: Message = { name: 'Sam', message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox);
                textField.value = '';
            });
    }

    updateChatText(chatbox: HTMLElement | null) {
        if (!chatbox) return;

        let html = '';
        this.messages.forEach(function (item) {
            if (item.name === 'Sam') {
                html += '<div class="messages_item messages_item--visitor bg-gray-300 text-black rounded-lg p-2 m-1 w-fit max-w-[70%] break-words">' + item.message + '</div>';
            } else {
                html += '<div class="messages_item messages_item--operator bg-blue-600 text-white rounded-lg p-2 m-1 w-fit max-w-[70%] ml-auto break-words">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        if (chatmessage) {
            chatmessage.innerHTML = html;
            chatmessage.scrollTop = chatmessage.scrollHeight; // Scroll to bottom
        }
    }
}

const ChatboxComponent: React.FC<ChatboxProps> = ({ onSendMessage }) => {
    useEffect(() => {
        const chatbox = new Chatbox();
        chatbox.args.openButton = document.querySelector('.chatbox__button');
        chatbox.args.chatBox = document.querySelector('.chatbox__support');
        chatbox.args.sendButton = document.querySelector('.send__button');
        chatbox.display(onSendMessage);

        return () => {
            // Cleanup code if needed
        };
    }, [onSendMessage]);

    return (
        <div className="container">
            <div className="absolute bottom-8 right-8">
                <div className="transform transition-all duration-500 ease-in-out bg-gray-200 w-80 h-[450px] z-[-123456] opacity-0 chatbox__support flex flex-col">
                    <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center p-4 rounded-t-2xl shadow-lg">
                        <div className="mr-2">
                            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
                        </div>
                        <div>
                            <h4 className="text-xl text-white">Chat support</h4>
                            <p className="text-sm text-white">Hi. My name is Sam. How can I help you?</p>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 chatbox__messages">
                        <div></div>
                    </div>
                    <div className="sticky bottom-0 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-between p-4 shadow-lg rounded-b-xl chatbox__footer">
                        <input type="text" className="w-4/5 border-none px-4 py-2 rounded-full text-left" placeholder="Write a message..." />
                        <button className="text-white send__button">Send</button>
                    </div>
                </div>
                <div className="text-right chatbox__button">
                    <button className="bg-white p-2 rounded-full shadow-lg focus:outline-none"><img src="./images/logo/chatbox-icon.svg" alt="Chat Icon" /></button>
                </div>
            </div>
        </div>
    );
};

export default ChatboxComponent;
