// CustomRouter.js
import React, { useState, useEffect } from 'react';

const CustomRouter = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.props.path === currentPath) {
          return child;
        }
        return null;
      })}
    </>
  );
};

const Route = ({ path, component }) => {
  return component;
};

const Link = ({ to, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', to);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export { CustomRouter, Route, Link };
