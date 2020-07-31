import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
function App(props) {
  

  return (
    <Container>
      <h1 className="title">My Hacker Stories</h1>
      <form className="" onSubmit={handleSearch}>
        <LabeledInput
          id="search"
          value={searchTerm}
          handler={handleChange}
        >
          Search: 
        </LabeledInput>
        <button className="button button-large" type="submit">
          Go
        </button>
      </form>
      <hr />
    </Container>
  )
}

function LabeledInput({id, type="text", value, handler, children}){
  return(
    <>
    <label htmlFor={id} className="label">{children}</label>
    <input
      id={id}
      className="input"
      type={type}
      value={value}
      onChange={handler}
    />
    </>
  )
}

export default App