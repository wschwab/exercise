import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import Feed from '../components/Feed'

beforeEach(cleanup)

jest.mock()

it('renders Feed without crashing', () => {
  const id = 'Ozymandius'
  const tweets = ["Look on my Works, ye Mighty, and despair!"]
  const div = document.createElement('div')
  ReactDOM.render(<Feed id={id} tweets={tweets} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
