import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Paper elevation={2}>
        <List>
          {tasks.map((task) => (
            <ListItem key={task._id} divider>
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {task.description}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary">
                      Due: {formatDate(task.dueDate)}
                    </Typography>
                  </>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={task.status}
                  color={getStatusColor(task.status) as any}
                  size="small"
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TaskList; 