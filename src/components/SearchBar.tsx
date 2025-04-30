import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchBar = ({ placeholder = 'Search...', onSearch }) => {
  const handleChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>
        <Search />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </InputGroup>
  );
};

export default SearchBar;