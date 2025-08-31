import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';

// Modern futuristic theme inspired by the image
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6', // Purple neon
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    secondary: {
      main: '#EC4899', // Pink neon
      light: '#F472B6',
      dark: '#DB2777',
    },
    background: {
      default: '#0F172A', // Dark blue
      paper: '#1E293B', // Slightly lighter blue
    },
    text: {
      primary: '#F8FAFC', // Light gray
      secondary: '#94A3B8', // Medium gray
    },
    success: {
      main: '#10B981', // Green neon
    },
    warning: {
      main: '#F59E0B', // Orange neon
    },
    error: {
      main: '#EF4444', // Red neon
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#F8FAFC',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#F8FAFC',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: '#F8FAFC',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: '#F8FAFC',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#F8FAFC',
    },
    body1: {
      fontSize: '1rem',
      color: '#94A3B8',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#94A3B8',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
          '&:hover': {
            background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
          },
        },
        outlined: {
          borderColor: '#8B5CF6',
          color: '#8B5CF6',
          '&:hover': {
            borderColor: '#EC4899',
            color: '#EC4899',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(139, 92, 246, 0.2)',
            borderColor: 'rgba(139, 92, 246, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            '&:hover': {
              borderColor: 'rgba(139, 92, 246, 0.5)',
            },
            '&.Mui-focused': {
              borderColor: '#8B5CF6',
              boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.2)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94A3B8',
            '&.Mui-focused': {
              color: '#8B5CF6',
            },
          },
          '& .MuiInputBase-input': {
            color: '#F8FAFC',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }} />
        
        {/* Subtle wave patterns */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.03) 30%, rgba(139, 92, 246, 0.03) 70%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.03) 30%, rgba(236, 72, 153, 0.03) 70%, transparent 70%)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
