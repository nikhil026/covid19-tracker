import React from 'react';
import { Autocomplete } from 'react-materialize';

export const SearchBar = (props) => {

  return (
    <Autocomplete
      className='autocomplete-container l10 offset-l1 s12 offset-s0 '
      autoComplete="off"
      title={props.placeholder}
      style={style.autocompleteStyle}
      options={{
        data: props.data,
        onAutocomplete: (value) => { props.onAutoCompleteChange(value) }
      }}
    />


  )
}

const style = {
  searchBarContainer: {
    margin: 0
  },
  autocompleteStyle: {
    backgroundColor: '#fff',
    width: '100%',
    border: '1px solid black !important',
    marginLeft: -10
  }
}
