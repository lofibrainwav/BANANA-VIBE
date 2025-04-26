import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VibeForm } from '@/components/features/VibeForm'

describe('VibeForm', () => {
  const mockOnSubmit = jest.fn()
  const mockInitialData = {
    id: '1',
    title: 'Test Title',
    content: 'Test Content',
    mood: 'happy',
    createdAt: new Date().toISOString(),
    userId: '1',
  }

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders form fields correctly', () => {
    render(<VibeForm onSubmit={mockOnSubmit} />)
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument()
    expect(screen.getByText(/mood/i)).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    render(<VibeForm onSubmit={mockOnSubmit} />)
    
    const titleInput = screen.getByLabelText(/title/i)
    const contentInput = screen.getByLabelText(/content/i)
    const submitButton = screen.getByRole('button', { name: /create vibe/i })
    
    fireEvent.change(titleInput, { target: { value: 'New Title' } })
    fireEvent.change(contentInput, { target: { value: 'New Content' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Title',
        content: 'New Content',
        mood: 'neutral', // default mood
      })
    })
  })

  it('pre-fills form with initial data', () => {
    render(<VibeForm onSubmit={mockOnSubmit} initialData={mockInitialData} />)
    
    expect(screen.getByLabelText(/title/i)).toHaveValue(mockInitialData.title)
    expect(screen.getByLabelText(/content/i)).toHaveValue(mockInitialData.content)
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
  })

  it('shows loading state during submission', async () => {
    mockOnSubmit.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<VibeForm onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /create vibe/i })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/saving/i)).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.queryByText(/saving/i)).not.toBeInTheDocument()
    })
  })

  it('shows error message when submission fails', async () => {
    const errorMessage = 'Submission failed'
    mockOnSubmit.mockRejectedValue(new Error(errorMessage))
    
    render(<VibeForm onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /create vibe/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })
}) 