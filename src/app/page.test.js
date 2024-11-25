import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from './(before)/login/page'
import ReactQueryProvider from '../providers/ReactQueryProvider'
import ReduxProvider from '../providers/ReduxProvider'
import WeatherProvider from '../providers/WeatherProvider'

test('Login Page Success', () => {
  render(
    <ReactQueryProvider>
      <ReduxProvider>
        <Login />
      </ReduxProvider>
    </ReactQueryProvider>,
  )
})
