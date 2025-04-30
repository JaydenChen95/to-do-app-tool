import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

vi.mock('./backend/toDoBackend', () => ({
  getAllTasks: vi.fn(() => Promise.resolve([
    { id: '1', description: 'Test Task', status: 'Uncompleted', subTasks: [] }
  ])),
  createNewTask: vi.fn((task) => Promise.resolve({ ...task, id: '2', subTasks: [] })),
  editTask: vi.fn(() => Promise.resolve()),
  updateTaskStatus: vi.fn((id, status) =>
    Promise.resolve({ id, description: 'Updated Task', status, subTasks: [] })
  )
}));

// Mock components
vi.mock('./components/TaskItem', () => ({
  default: ({ task }) => <div data-testid="task-item">{task.description}</div>
}));

vi.mock('./components/ErrorDialog', () => ({
  default: ({ message }) => <div data-testid="error-dialog">{message}</div>
}));

vi.mock('./components/SearchBar', () => ({
  default: ({ onSearch }) => (
    <input
      placeholder="Search your tasks..."
      onChange={(e) => onSearch(e.target.value)}
      data-testid="search-input"
    />
  )
}));

describe('App component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial tasks', async () => {
    render(<App />);
    expect(await screen.findByText('Test Task')).toBeInTheDocument();
  });

  it('adds a new task on valid submit', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Enter a new task');
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  it('shows error dialog for empty submission', async () => {
    render(<App />);
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-dialog')).toHaveTextContent('Please enter a valid description');
    });
  });

  it('filters tasks by description', async () => {
    render(<App />);

    expect(await screen.findByText('Test Task')).toBeInTheDocument();

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'No Match' } });

    await waitFor(() => {
      expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
    });
  });
});
