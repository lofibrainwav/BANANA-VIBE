import { render, screen, fireEvent } from '@testing-library/react'
import { VibeList } from '@/components/features/VibeList'

describe('VibeList', () => {
  const mockVibes = [
    {
      id: '1',
      title: 'Happy Day',
      content: 'Today was a great day!',
      mood: 'happy',
      createdAt: new Date().toISOString(),
      userId: '1',
    },
    {
      id: '2',
      title: 'Sad Day',
      content: 'Today was not so great.',
      mood: 'sad',
      createdAt: new Date().toISOString(),
      userId: '1',
    },
  ]

  it('renders loading state', () => {
    render(<VibeList vibes={[]} isLoading={true} />)
    expect(screen.getByText(/loading vibes/i)).toBeInTheDocument()
  })

  it('renders error state', () => {
    const errorMessage = 'Failed to load vibes'
    render(<VibeList vibes={[]} error={errorMessage} />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('renders vibes correctly', () => {
    render(<VibeList vibes={mockVibes} />)
    
    expect(screen.getByText('Happy Day')).toBeInTheDocument()
    expect(screen.getByText('Today was a great day!')).toBeInTheDocument()
    expect(screen.getByText('Sad Day')).toBeInTheDocument()
    expect(screen.getByText('Today was not so great.')).toBeInTheDocument()
  })

  it('filters vibes by mood', () => {
    render(<VibeList vibes={mockVibes} />)
    
    // Open filter dropdown
    const filterButton = screen.getByText(/filter/i)
    fireEvent.click(filterButton)
    
    // Select happy mood
    const happyFilter = screen.getByText('Happy')
    fireEvent.click(happyFilter)
    
    // Check if only happy vibe is shown
    expect(screen.getByText('Happy Day')).toBeInTheDocument()
    expect(screen.queryByText('Sad Day')).not.toBeInTheDocument()
  })

  it('filters vibes by search query', () => {
    render(<VibeList vibes={mockVibes} />)
    
    const searchInput = screen.getByPlaceholderText(/search vibes/i)
    fireEvent.change(searchInput, { target: { value: 'great' } })
    
    expect(screen.getByText('Happy Day')).toBeInTheDocument()
    expect(screen.queryByText('Sad Day')).not.toBeInTheDocument()
  })

  it('shows empty state when no vibes match filters', () => {
    render(<VibeList vibes={mockVibes} />)
    
    const searchInput = screen.getByPlaceholderText(/search vibes/i)
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
    
    expect(screen.getByText(/no vibes found/i)).toBeInTheDocument()
  })

  it('navigates to vibe detail page when view button is clicked', () => {
    const mockRouter = { push: jest.fn() }
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue(mockRouter)
    
    render(<VibeList vibes={mockVibes} />)
    
    const viewButton = screen.getAllByText(/view/i)[0]
    fireEvent.click(viewButton)
    
    expect(mockRouter.push).toHaveBeenCalledWith('/vibes/1')
  })
}) 