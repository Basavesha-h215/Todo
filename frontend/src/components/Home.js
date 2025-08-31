import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  AppBar, 
  Toolbar, 
  Box,
  Chip,
  Avatar,
  Fab,
  CircularProgress
} from '@mui/material';
import { 
  Add as AddIcon, 
  Login as LoginIcon, 
  PersonAdd as RegisterIcon,
  Logout as LogoutIcon,
  LocationOn as LocationIcon,
  Tag as TagIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getPublicPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        }}
      >
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#8B5CF6',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
        />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Modern AppBar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        }}
      >
        <Toolbar>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em',
            }}
          >
            ✈️ TravelBlog
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/create-post')}
                  sx={{
                    borderColor: '#8B5CF6',
                    color: '#8B5CF6',
                    '&:hover': {
                      borderColor: '#EC4899',
                      color: '#EC4899',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  Create Post
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    borderColor: '#EF4444',
                    color: '#EF4444',
                    '&:hover': {
                      borderColor: '#DC2626',
                      color: '#DC2626',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: '#8B5CF6',
                    color: '#8B5CF6',
                    '&:hover': {
                      borderColor: '#EC4899',
                      color: '#EC4899',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  startIcon={<RegisterIcon />}
                  onClick={() => navigate('/register')}
                  sx={{
                    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
                    }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(51, 65, 85, 0.8) 100%)',
          py: 8,
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
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          }}
        />
        
        <Container maxWidth="lg">
          <Box textAlign="center" position="relative" zIndex={1}>
            <Typography 
              variant="h1" 
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Beyond Imagination
            </Typography>
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                color: '#94A3B8',
                mb: 4,
                fontWeight: 300,
              }}
            >
              Discover Amazing Travel Stories from Around the World
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                fontSize: '1.1rem',
                color: '#94A3B8',
                maxWidth: 600,
                mx: 'auto',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              Embark on a journey through captivating travel experiences, stunning destinations, 
              and unforgettable adventures shared by passionate travelers.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Posts Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            fontWeight: 600,
            color: '#F8FAFC',
          }}
        >
          Latest Travel Stories
        </Typography>
        
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.9) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                    borderColor: 'rgba(139, 92, 246, 0.4)',
                  },
                }}
              >
                {post.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:8000${post.image}`}
                    alt={post.title}
                    sx={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#F8FAFC',
                      mb: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                      color: '#94A3B8',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.content}
                  </Typography>

                  {/* Post metadata */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar 
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          mr: 1,
                          bgcolor: '#8B5CF6',
                          fontSize: '0.75rem',
                        }}
                      >
                        <PersonIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#8B5CF6', fontWeight: 500 }}
                      >
                        {post.author.username}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TimeIcon sx={{ fontSize: 16, color: '#94A3B8', mr: 0.5 }} />
                      <Typography 
                        variant="caption" 
                        sx={{ color: '#94A3B8' }}
                      >
                        {formatDate(post.created_date)}
                      </Typography>
                    </Box>
                    
                    {post.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon sx={{ fontSize: 16, color: '#94A3B8', mr: 0.5 }} />
                        <Typography 
                          variant="caption" 
                          sx={{ color: '#94A3B8' }}
                        >
                          {post.location}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Tags */}
                  {post.tags && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {post.tags.split(',').map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag.trim()}
                          size="small"
                          icon={<TagIcon />}
                          sx={{
                            backgroundColor: 'rgba(139, 92, 246, 0.2)',
                            color: '#8B5CF6',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            '& .MuiChip-icon': {
                              color: '#8B5CF6',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  {/* Comments count */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="caption" 
                      sx={{ color: '#94A3B8' }}
                    >
                      {post.comments_count} comments
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {posts.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography 
              variant="h5" 
              sx={{ color: '#94A3B8', mb: 2 }}
            >
              No travel stories yet
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ color: '#94A3B8', mb: 3 }}
            >
              Be the first to share your amazing travel adventure!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create-post')}
              sx={{
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
                }
              }}
            >
              Create Your First Post
            </Button>
          </Box>
        )}
      </Container>

      {/* Floating Action Button */}
      {user && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate('/create-post')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
            '&:hover': {
              background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Home;
