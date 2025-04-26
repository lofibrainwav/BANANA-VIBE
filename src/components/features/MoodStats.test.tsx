import { render, screen } from '@/lib/test-utils'
import { MoodStats } from './MoodStats'

const mockVibes = [
  {
    id: '1',
    title: 'Happy Vibe 1',
    content: 'Feeling great!',
    mood: 'happy',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    userId: '1',
  },
  {
    id: '2',
    title: 'Happy Vibe 2',
    content: 'Still happy!',
    mood: 'happy',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    userId: '1',
  },
  {
    id: '3',
    title: 'Calm Vibe',
    content: 'Peaceful',
    mood: 'calm',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    userId: '1',
  },
  {
    id: '4',
    title: 'Sad Vibe',
    content: 'Not feeling well',
    mood: 'sad',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    userId: '1',
  },
]

describe('MoodStats', () => {
  it('calculates mood percentages correctly', () => {
    render(<MoodStats vibes={mockVibes} />)
    
    // Happy: 2/4 = 50%
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('😊')).toBeInTheDocument()
    
    // Calm: 1/4 = 25%
    expect(screen.getByText('25%')).toBeInTheDocument()
    expect(screen.getByText('😌')).toBeInTheDocument()
    
    // Sad: 1/4 = 25%
    expect(screen.getByText('25%')).toBeInTheDocument()
    expect(screen.getByText('😢')).toBeInTheDocument()
  })

  it('shows empty state when no vibes', () => {
    render(<MoodStats vibes={[]} />)
    
    expect(screen.getByText(/no mood data yet/i)).toBeInTheDocument()
    expect(screen.getByText(/start creating vibes to see your mood stats/i)).toBeInTheDocument()
  })

  it('displays mood trends over time', () => {
    render(<MoodStats vibes={mockVibes} />)
    
    // Check if mood trend chart is rendered
    expect(screen.getByRole('img', { name: /mood trend/i })).toBeInTheDocument()
  })

  it('shows correct mood labels', () => {
    render(<MoodStats vibes={mockVibes} />)
    
    expect(screen.getByText(/happy/i)).toBeInTheDocument()
    expect(screen.getByText(/calm/i)).toBeInTheDocument()
    expect(screen.getByText(/sad/i)).toBeInTheDocument()
  })
}) 