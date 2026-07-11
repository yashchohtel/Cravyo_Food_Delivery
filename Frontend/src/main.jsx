import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(

  // browser router
  <BrowserRouter>

    {/* provide redux store to the app */}
    <Provider store={store}>

      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            color: "var(--text-primary)",
            background: "var(--background-color)",
            fontSize: "1.3rem",
            fontWeight: 500,
            letterSpacing: "0.03rem",
          },
          success: {
            iconTheme: {
              primary: "var(--primary-color)", // Tick color
              secondary: "var(--background-color)", // Circle color
            },
          },

        }}
      />

    </Provider>

  </BrowserRouter>
)
