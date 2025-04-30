import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ButtonWithConfirm from './ButtonWithConfirm';

describe('ButtonWithConfirm', () => {
  const mockConfirm = vi.fn();
  const mockSetIsLoading = vi.fn();
  const taskId = '123';

  it('renders delete button with trash icon', () => {
    render(
      <ButtonWithConfirm
        onConfirm={mockConfirm}
        taskId={taskId}
        type="Delete"
        setIsLoading={mockSetIsLoading}
      />
    );

    expect(screen.getByTitle('Delete')).toBeInTheDocument();
  });

  it('renders restore button with undo icon', () => {
    render(
      <ButtonWithConfirm
        onConfirm={mockConfirm}
        taskId={taskId}
        type="Restore"
        setIsLoading={mockSetIsLoading}
      />
    );

    expect(screen.getByTitle('Restore')).toBeInTheDocument();
  });

  it('opens modal on button click', () => {
    render(
      <ButtonWithConfirm
        onConfirm={mockConfirm}
        taskId={taskId}
        type="Delete"
        setIsLoading={mockSetIsLoading}
      />
    );

    fireEvent.click(screen.getByTitle('Delete'));
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
  });

  it('calls onConfirm and setIsLoading on confirm', () => {
    render(
      <ButtonWithConfirm
        onConfirm={mockConfirm}
        taskId={taskId}
        type="Delete"
        setIsLoading={mockSetIsLoading}
      />
    );

    fireEvent.click(screen.getByTitle('Delete'));
    fireEvent.click(screen.getByText('Delete'));

    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    expect(mockConfirm).toHaveBeenCalledWith(taskId, mockSetIsLoading);
  });
});
