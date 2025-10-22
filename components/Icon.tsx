
import React from 'react';

interface IconProps {
  icon: 'logo' | 'phone' | 'phone-hangup' | 'menu' | 'close' | 'chevron-down' | 'upload' | 'play';
  className?: string;
}

export const Icon = ({ icon, className = 'w-6 h-6' }: IconProps) => {
  const icons = {
    logo: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
    phone: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    'phone-hangup': (
       <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.1-2.66 1.82-.08.08-.13.18-.13.29v3.47c0 .55.45 1 1 1 .55 0 1-.45 1-1v-2.5c.19-.13.39-.24.6-.35l.18-.09c.47-.23.96-.42 1.45-.58.55-.17 1.12-.3 1.7-.4.6-.1 1.2-.14 1.8-.14 4.42 0 8-3.58 8-8 .01-1.3-.3-2.52-.85-3.61-.31-.61-1.16-.83-1.7-.53-.55.3-1.04.8-1.55 1.29l-.01-.01c-1.12.98-2.64 1.55-4.28 1.55zm-1.89 8.24c-.05.03-.1.06-.15.08-.22.09-.45.18-.67.26-.29.1-.59.19-.88.29-.21.07-.42.13-.62.2-.18.06-.36.11-.53.16-.04.01-.07.02-.1.03-.18.05-.35.1-.52.14-.15.04-.3.07-.44.1-.12.03-.23.05-.35.07-.12.02-.23.04-.35.05-.14.01-.28.02-.42.02-.3 0-.6-.02-.89-.06-1.58-.22-3.05-.8-4.3-1.68-.42-.3-.65-.81-.59-1.32.12-.99.4-1.93.81-2.79.13-.27.39-.42.68-.36.43.08.82.26 1.17.49l.12.08c.02.01.03.02.05.03.02.01.03.02.05.03.35.24.7.46 1.04.68.11.07.22.14.33.2l.18.1c.36.19.72.38 1.09.55.04.02.08.03.12.05.73.34 1.49.62 2.26.82.51.13 1.02.24 1.54.32.55.09 1.1.13 1.65.13 2.8 0 5.18-1.78 6.2-4.22.2-.48-.09-.98-.55-1.13-1.42-.48-2.96-.75-4.55-.75-1.28 0-2.5.26-3.62.72v.1z"/>
       </svg>
    ),
    menu: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    ),
    close: (
       <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    ),
     'chevron-down': (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    ),
    'upload': (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
        </svg>
    ),
     'play': (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z"/>
        </svg>
    )
  };

  return icons[icon] || null;
};
