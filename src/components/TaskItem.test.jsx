import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

vi.mock('../utils/validate', () => ({
  default: (task) => ({ error: false, message: '' })
}));

vi.mock('../utils/dateConverter', () => ({
  convertISODateToDateField: (iso) => iso?.slice(0, 10),
}));

vi.mock('./ButtonWithConfirm', () => ({
  default: ({ type }) => <button>{type}</button>
}));

const sampleTask = {
  id: '1',
  description: 'Test Task',
  status: 'Pending',
  dueDate: '2025-01-01T00:00:00Z',
  priority: 'Medium',
  category: 'Work',
  subTasks: [
    {
      description: 'Subtask 1',
      dueDate: '2025-01-02T00:00:00Z',
      priority: 'Low',
      status: 'Pending',
    }
  ]
};

describe('TaskItem', () => {
  let onSave, onDelete, setError;

  beforeEach(() => {
    onSave = vi.fn();
    onDelete = vi.fn();
    setError = vi.fn();
  });

  it('renders task description and status', () => {
    render(<TaskItem task={sampleTask} onSave={onSave} onDelete={onDelete} setError={setError} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByTestId('status-display')).toBeInTheDocument();
  });

  it('enters edit mode when Edit button is clicked', () => {
    render(<TaskItem task={sampleTask} onSave={onSave} onDelete={onDelete} setError={setError} />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });

  it('calls onSave when Save is clicked', () => {
    render(<TaskItem task={sampleTask} onSave={onSave} onDelete={onDelete} setError={setError} />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByText('Save'));
    expect(onSave).toHaveBeenCalled();
  });

  it('disables Save button if nothing changed', () => {
    render(<TaskItem task={sampleTask} onSave={onSave} onDelete={onDelete} setError={setError} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Save')).toBeDisabled();
  });

  it('shows Delete button for active tasks', () => {
    render(<TaskItem task={sampleTask} onSave={onSave} onDelete={onDelete} setError={setError} />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows Restore button if task is deleted', () => {
    const deletedTask = { ...sampleTask, status: 'Deleted' };
    render(<TaskItem task={deletedTask} onSave={onSave} onDelete={onDelete} setError={setError} onRestore={vi.fn()} />);
    expect(screen.getByText('Restore')).toBeInTheDocument();
  });
});
