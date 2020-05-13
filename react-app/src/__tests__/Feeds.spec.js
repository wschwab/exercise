import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import Feeds from '../components/Feeds'

beforeEach(cleanup)

it('renders Feeds without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Feeds />, div)
  ReactDOM.unmountComponentAtNode(div)
})
