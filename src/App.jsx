import { useEffect, useState } from 'react'
import './App.css'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'

import TaskItem from '../components/TaskItem';
import ErrorDialog from '../components/ErrorDialog';
import SearchBar from '../components/SearchBar';
import { createNewTask, editTask, getAllTasks, updateTaskStatus } from './backend/toDoBackend';
import { convertDateFieldToISODate } from '../utils/dateConverter';

function App() {
  const [todos, setTodos] = useState([{}]);
  const [description, setDescription] = useState('')
  const [error, setError] = useState({ show: false, message: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const updateTask = async (updatedTask) => {
    if(updatedTask.dueDate) {
      updatedTask.dueDate = convertDateFieldToISODate(updatedTask.dueDate)
    }
    if(updatedTask.subTasks.length) {
      updatedTask.subTasks.forEach(subTask => {
        if(subTask.dueDate) {
          subTask.dueDate = convertDateFieldToISODate(subTask.dueDate)
        }
      });
    }
    try {
      await editTask(updatedTask);
    } catch (e) {
      setError({
        show: true,
        message: "Server Error",
      });
    }
    setTodos((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const onDelete = async (taskId) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, "Deleted");
      setTodos((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (e) {
      setError({
        show: true,
        message: "Failed to delete item",
      });
    }
  }

  const onRestore = async (taskId) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, "Uncompleted");
      setTodos((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (e) {
      setError({
        show: true,
        message: "Failed to restore item",
      });
    }
  }

  const handleSubmit = async (value) => {
    if(!value.trim()){
      setError({
        show: true,
        message: "Please enter a valid description",
      });

      return;
    }

    try {
      const newTodo = {
        description: value.trim(),
        status: "Uncompleted"
      };
      const newTask = await createNewTask(newTodo);
      setTodos([newTask, ...todos])
    } catch (e) {
      setError({
        show: true,
        message: "Server Error",
      });
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const todoList = await getAllTasks();
        setTodos(todoList);

      } catch (e) {
        setError({
          show: true,
          message: "Failed to get list of to do!",
        });
      }
    })()
  }, [])

  const filteredTasks = todos.filter(task =>
    task?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Body>
          <Card.Title className="mb-4">📝 To-Do List</Card.Title>

          <SearchBar placeholder="Search your tasks..." onSearch={setSearchTerm} />

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(description)
            }}
          >
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter a new task"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="primary" type="submit" className="w-100">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
          <hr />

          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} 
              onSave={updateTask} setError={setError} onDelete={onDelete} onRestore={onRestore} />
          ))}
        </Card.Body>
      </Card>
      {error.show && (
        <ErrorDialog
          show={error.show}
          onClose={() => setError({ show: false, message: '' })}
          title="Failed to create new task"
          message={error.message}
        />
      )}
    </Container>
    );
}

export default App
