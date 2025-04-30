import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorDialog from './ErrorDialog';

describe('ErrorDialog', () => {
  it('renders the modal with provided title and message', () => {
    render(
      <ErrorDialog
        show={true}
        onClose={() => {}}
        title="Test Error"
        message="Something went wrong"
      />
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByTestId('error-dialog-close-button')).toBeInTheDocument();
  });

  it('calls onClose when the Close button is clicked', () => {
    const onClose = vi.fn();

    render(
      <ErrorDialog
        show={true}
        onClose={onClose}
        title="Error"
        message="Error message"
      />
    );

    fireEvent.click(screen.getByTestId('error-dialog-close-button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render modal when show is false', () => {
    render(<ErrorDialog show={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
