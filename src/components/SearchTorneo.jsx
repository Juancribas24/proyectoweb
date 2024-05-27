import React, { useState, useEffect } from 'react';

const SearchTorneo = ({ torneos, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = torneos.filter(torneo =>
      torneo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filtered);
  }, [searchTerm, torneos]); // Removido onSearch del array de dependencias

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar torneo..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchTorneo;
