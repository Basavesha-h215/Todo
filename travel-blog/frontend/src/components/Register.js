import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Grid
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAdd as RegisterIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Badge as BadgeIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(formData);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 
               err.response?.data?.email?.[0] || 
               err.response?.data?.password?.[0] || 
               'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
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
        }}
      />
      
      {/* Subtle wave patterns */}
      <Box
        sx={{
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
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
              }}
            >
              <RegisterIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Join the Adventure
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#94A3B8',
                fontSize: '1.1rem',
              }}
            >
              Create your account and start sharing your travel stories
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                '& .MuiAlert-icon': {
                  color: '#EF4444',
                }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#8B5CF6' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
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
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon sx={{ color: '#8B5CF6' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
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
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#8B5CF6' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
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
              }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#8B5CF6' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
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
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#8B5CF6' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#8B5CF6' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
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
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="password_confirm"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.password_confirm}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#8B5CF6' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: '#8B5CF6' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
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
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <RegisterIcon />}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                },
                '&:disabled': {
                  background: 'rgba(139, 92, 246, 0.3)',
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3, borderColor: 'rgba(139, 92, 246, 0.2)' }}>
            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
              or
            </Typography>
          </Divider>

          {/* Login Link */}
          <Box textAlign="center">
            <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1 }}>
              Already have an account?
            </Typography>
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: '#8B5CF6',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  color: '#EC4899',
                  textDecoration: 'underline',
                }
              }}
            >
              Sign in to your account
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
