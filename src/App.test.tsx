import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'


describe('test', () => {
  test('Deve testar', () =>{
    renderer.create(<App />)
    
  })
})