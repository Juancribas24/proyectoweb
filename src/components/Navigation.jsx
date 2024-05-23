import React from 'react'

const Navigation = () => {
  return (
    <div>
        <header>
            <form action="">
                <div className='search-torneo'>
                    <input 
                        type="search"
                        name='valueSearch' 
                        placeholder="Buscar torneo" 
                    />
                </div>
                <button className='btn-search'>Buscar</button>
            </form>
        </header>
    </div>
  )
}

export default Navigation
