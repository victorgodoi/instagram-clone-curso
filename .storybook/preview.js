/** @type { import('@storybook/react-webpack5').Preview } */
import '../src/App.css';
import '../src/index.css';

// Configurar variáveis de ambiente para o Storybook
if (typeof global !== 'undefined') {
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  
  // Definir variáveis de ambiente para Firebase (valores fictícios para Storybook)
  global.process.env.REACT_APP_FIREBASE_API_KEY = 'fake-api-key';
  global.process.env.REACT_APP_FIREBASE_AUTH_DOMAIN = 'fake-project.firebaseapp.com';
  global.process.env.REACT_APP_FIREBASE_PROJECT_ID = 'fake-project';
  global.process.env.REACT_APP_FIREBASE_STORAGE_BUCKET = 'fake-project.appspot.com';
  global.process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '123456789';
  global.process.env.REACT_APP_FIREBASE_APP_ID = '1:123456789:web:fake-app-id';
  global.process.env.REACT_APP_FIREBASE_MEASUREMENT_ID = 'G-FAKE-ID';
}

// Se window existe (browser), também definir process
if (typeof window !== 'undefined') {
  window.process = window.process || {};
  window.process.env = window.process.env || {};
  
  window.process.env.REACT_APP_FIREBASE_API_KEY = 'fake-api-key';
  window.process.env.REACT_APP_FIREBASE_AUTH_DOMAIN = 'fake-project.firebaseapp.com';
  window.process.env.REACT_APP_FIREBASE_PROJECT_ID = 'fake-project';
  window.process.env.REACT_APP_FIREBASE_STORAGE_BUCKET = 'fake-project.appspot.com';
  window.process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '123456789';
  window.process.env.REACT_APP_FIREBASE_APP_ID = '1:123456789:web:fake-app-id';
  window.process.env.REACT_APP_FIREBASE_MEASUREMENT_ID = 'G-FAKE-ID';
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;