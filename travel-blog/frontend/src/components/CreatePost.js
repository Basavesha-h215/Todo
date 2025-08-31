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
  IconButton,
  InputAdornment,
  Chip,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Image as ImageIcon,
  LocationOn as LocationIcon,
  Tag as TagIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    tags: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('content', formData.content);
      postData.append('location', formData.location);
      postData.append('tags', formData.tags);
      
      if (image) {
        postData.append('image', image);
      }

      await postsAPI.createPost(postData);
      setSuccess('Post created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.title?.[0] || 
               err.response?.data?.content?.[0] || 
               'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: 4,
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
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              color: '#8B5CF6',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderColor: 'rgba(139, 92, 246, 0.5)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Share Your Adventure
          </Typography>
        </Box>

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
          {/* Success Alert */}
          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#10B981',
                '& .MuiAlert-icon': {
                  color: '#10B981',
                }
              }}
            >
              {success}
            </Alert>
          )}

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

          {/* Create Post Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon sx={{ color: '#8B5CF6' }} />
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
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              multiline
              rows={6}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                    <DescriptionIcon sx={{ color: '#8B5CF6' }} />
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
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon sx={{ color: '#8B5CF6' }} />
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
              label="Tags (comma separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              margin="normal"
              placeholder="adventure, culture, food, travel"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TagIcon sx={{ color: '#8B5CF6' }} />
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

            {/* Image Upload */}
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 2 }}>
                Add Image (Optional)
              </Typography>
              
              <Box
                sx={{
                  border: '2px dashed rgba(139, 92, 246, 0.3)',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                    backgroundColor: 'rgba(30, 41, 59, 0.7)',
                  }
                }}
                onClick={() => document.getElementById('image-input').click()}
              >
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                
                <CloudUploadIcon sx={{ fontSize: 48, color: '#8B5CF6', mb: 2 }} />
                
                <Typography variant="body1" sx={{ color: '#94A3B8', mb: 1 }}>
                  {image ? image.name : 'Click to upload an image'}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                  JPG, PNG, GIF up to 5MB
                </Typography>
              </Box>
              
              {image && (
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Chip
                    label={image.name}
                    onDelete={() => setImage(null)}
                    icon={<ImageIcon />}
                    sx={{
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      color: '#8B5CF6',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      '& .MuiChip-icon': {
                        color: '#8B5CF6',
                      }
                    }}
                  />
                </Stack>
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
              sx={{
                mt: 3,
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
              {loading ? 'Creating Post...' : 'Create Post'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatePost;
