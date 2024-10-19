import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for the application
import App from './App'; // Main application component
import reportWebVitals from './reportWebVitals'; // Performance measuring tool

// Create a root element for the React application
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Function to render the application
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Render the application and handle any rendering errors
try {
  renderApp();
} catch (error) {
  console.error('Error rendering the app:', error);
  // Optionally, you could implement an error boundary here
}

// Optional: Measure performance in your app
// You can pass a function to log results (e.g., reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
