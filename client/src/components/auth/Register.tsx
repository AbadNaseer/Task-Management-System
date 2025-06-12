import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Avatar,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: '100%',
            mt: 2,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              margin="normal"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 