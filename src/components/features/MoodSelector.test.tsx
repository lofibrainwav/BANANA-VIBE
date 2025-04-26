import { render, screen, fireEvent } from '@/lib/test-utils'
import { MoodSelector } from './MoodSelector'

describe('MoodSelector', () => {
  const mockOnChange = jest.fn()
  const moods = {
    happy: '😊',
    sad: '😢',
    neutral: '😐',
    excited: '🤩',
    calm: '😌'
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders all mood options with correct emojis', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} />)
    
    Object.values(moods).forEach(emoji => {
      expect(screen.getByText(emoji)).toBeInTheDocument()
    })
  })

  it('calls onChange with correct mood value when a mood is selected', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} />)
    
    Object.entries(moods).forEach(([mood, emoji]) => {
      fireEvent.click(screen.getByText(emoji))
      expect(mockOnChange).toHaveBeenCalledWith(mood)
      mockOnChange.mockClear()
    })
  })

  it('disables all buttons when disabled prop is true', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} disabled />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeDisabled()
      expect(button).toHaveClass('opacity-50')
    })
  })

  it('highlights the selected mood with correct styling', () => {
    Object.keys(moods).forEach(mood => {
      const { rerender } = render(<MoodSelector value={mood} onChange={mockOnChange} />)
      const selectedButton = screen.getByText(moods[mood as keyof typeof moods]).closest('button')
      expect(selectedButton).toHaveClass('bg-yellow-200')
      rerender(<MoodSelector value="neutral" onChange={mockOnChange} />)
    })
  })

  it('applies hover effects to mood buttons', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveClass('hover:bg-gray-100')
    })
  })

  it('maintains accessibility attributes', () => {
    render(<MoodSelector value="neutral" onChange={mockOnChange} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('type', 'button')
    })
  })
}) 