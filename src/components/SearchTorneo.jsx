import React, { useState } from 'react';

const SearchTorneo = ({ torneos, onSearch, className }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = torneos.filter(torneo =>
      torneo.name.toLowerCase().includes(value.toLowerCase())
    );

    onSearch(filteredResults);
  };

  return (
    <input
      type="text"
      className={className}
      placeholder="Buscar torneo..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchTorneo;