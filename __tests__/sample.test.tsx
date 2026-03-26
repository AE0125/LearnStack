import { render, screen } from '@testing-library/react'

describe('Sample Test', () => {
  it('should pass', () => {
    expect(1).toBe(1)
  })

  it('should render a simple element', () => {
    render(<div>Hello Jest</div>)
    expect(screen.getByText('Hello Jest')).toBeInTheDocument()
  })
})
