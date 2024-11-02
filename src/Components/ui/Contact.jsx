import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center">
        <img src="/profile.jpg" alt="Your Name" className="w-48 h-48 rounded-full mb-8" />
        <h2 className="text-3xl font-bold mb-4 text-black">Salman Usmani</h2>
        <p className="text-md mb-6 text-gray-400">Aspiring web developer committed to leveraging technology to solve real-world problems and create user-centric solutions.</p>

        <div className="flex space-x-4">
          <a href="https://github.com/Code-bySalman?tab=repositories" target='_blank' rel="noopener noreferrer">
            <FaGithub className="text-2xl text-gray-700 hover:text-blue-500" />
          </a>
          <a href="https://www.instagram.com/kyusalman/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-gray-700 hover:text-pink-500" />
          </a>
          <a href="https://www.linkedin.com/in/salmanusmani7/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl text-gray-700 hover:text-blue-800" />
          </a>
          
            <a href ="https://mail.google.com/mail/u/0/#inbox">
            <FaEnvelope className="text-2xl text-gray-700 hover:text-blue-500" />
            </a>
          
        </div>
      </div>
    </div>
  );
}

export default Contact;