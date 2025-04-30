import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Find a task" onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Find a task');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearch when typing', () => {
    const mockSearch = vi.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockSearch).toHaveBeenCalledWith('test');
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });
});
