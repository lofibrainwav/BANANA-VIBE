import { render, screen, fireEvent } from '@/lib/test-utils'
import { VibeList } from './VibeList'

const mockVibes = [
  {
    id: '1',
    title: 'Happy Vibe',
    content: 'Feeling great today!',
    mood: 'happy',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    userId: '1',
  },
  {
    id: '2',
    title: 'Calm Vibe',
    content: 'Peaceful evening',
    mood: 'calm',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    userId: '1',
  },
]

describe('VibeList', () => {
  it('renders list of vibes correctly', () => {
    render(<VibeList vibes={mockVibes} />)
    
    expect(screen.getByText('Happy Vibe')).toBeInTheDocument()
    expect(screen.getByText('Calm Vibe')).toBeInTheDocument()
    expect(screen.getByText('Feeling great today!')).toBeInTheDocument()
    expect(screen.getByText('Peaceful evening')).toBeInTheDocument()
  })

  it('displays correct mood emojis', () => {
    render(<VibeList vibes={mockVibes} />)
    
    expect(screen.getByText('😊')).toBeInTheDocument()
    expect(screen.getByText('😌')).toBeInTheDocument()
  })

  it('shows empty state when no vibes', () => {
    render(<VibeList vibes={[]} />)
    
    expect(screen.getByText(/no vibes yet/i)).toBeInTheDocument()
    expect(screen.getByText(/create your first vibe/i)).toBeInTheDocument()
  })

  it('handles vibe deletion', async () => {
    const mockOnDelete = jest.fn()
    render(<VibeList vibes={mockVibes} onDelete={mockOnDelete} />)
    
    // Click delete button on first vibe
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /confirm/i })
    fireEvent.click(confirmButton)

    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('filters vibes by mood', () => {
    render(<VibeList vibes={mockVibes} />)
    
    // Click happy mood filter
    const moodFilters = screen.getAllByRole('button', { name: /filter/i })
    fireEvent.click(moodFilters[0]) // Assuming first filter is 'happy'

    // Should only show happy vibes
    expect(screen.getByText('Happy Vibe')).toBeInTheDocument()
    expect(screen.queryByText('Calm Vibe')).not.toBeInTheDocument()
  })
}) 