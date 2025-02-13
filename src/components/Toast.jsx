// components/Toast.jsx
import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getBackgroundColor = () => {
        switch (type) {
            case 'error':
                return 'rgb(40, 20, 20)';
            case 'success':
                return 'rgb(20, 40, 20)';
            default:
                return 'rgb(19, 26, 29)';
        }
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '0',
                left: '0',
                margin: 'auto',
                width: '18rem',
                padding: '1rem',
                borderRadius: '4px',
                backgroundColor: getBackgroundColor(),
                color: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 1000,
                animation: 'slideIn 0.3s ease-out',
                border: `1px solid ${type === 'error' ? 'rgb(240, 0, 0)' : type === 'success' ? 'rgb(16, 255, 16)' : '#111'}`,
            }}
        >
            {message} <span className='hover:cursor-pointer' style={{ color: `${type === 'error' ? 'rgb(240, 0, 0)' : type === 'success' ? 'rgb(16, 255, 16)' : '#111'}`, float: 'right', }} onClick={() => setIsVisible(false)}>X</span>
        </div >

    );
};

export default Toast;