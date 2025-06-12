import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (error: any) {
        toast.error('Failed to fetch task statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color }: any) => (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: `${color}.light`,
          color: `${color}.dark`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
      </Paper>
    </Grid>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<AssignmentIcon fontSize="large" />}
          color="primary"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircleIcon fontSize="large" />}
          color="success"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<ScheduleIcon fontSize="large" />}
          color="warning"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<PendingIcon fontSize="large" />}
          color="error"
        />
      </Grid>
    </Container>
  );
};

export default Dashboard; 