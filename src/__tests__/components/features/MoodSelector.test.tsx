import { render, screen, fireEvent } from '@testing-library/react'
import { MoodSelector } from '@/components/features/MoodSelector'

describe('MoodSelector', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders all mood options', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} />)
    
    const moods = ['happy', 'sad', 'neutral', 'excited', 'calm']
    moods.forEach(mood => {
      expect(screen.getByText(mood.charAt(0).toUpperCase() + mood.slice(1))).toBeInTheDocument()
    })
  })

  it('calls onChange when a mood is selected', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} />)
    
    const happyButton = screen.getByText('Happy')
    fireEvent.click(happyButton)
    
    expect(mockOnChange).toHaveBeenCalledWith('happy')
  })

  it('highlights the selected mood', () => {
    render(<MoodSelector value="happy" onChange={mockOnChange} />)
    
    const happyButton = screen.getByText('Happy').closest('button')
    expect(happyButton).toHaveClass('bg-yellow-100')
    
    const neutralButton = screen.getByText('Neutral').closest('button')
    expect(neutralButton).not.toHaveClass('bg-yellow-100')
  })

  it('disables all buttons when disabled prop is true', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} disabled />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })
}) 