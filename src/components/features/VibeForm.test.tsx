import { render, screen, fireEvent, waitFor } from '@/lib/test-utils'
import { VibeForm } from './VibeForm'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('VibeForm', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockInitialData = {
    id: '1',
    title: 'Existing Vibe',
    content: 'Existing Content',
    mood: 'happy',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
  }

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
    jest.clearAllMocks()
  })

  it('renders form fields with correct labels and placeholders', () => {
    render(<VibeForm />)
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your vibe title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/write your vibe content/i)).toBeInTheDocument()
    expect(screen.getByText(/select your mood/i)).toBeInTheDocument()
  })

  it('handles form submission with valid data', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(<VibeForm />)
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Vibe' },
    })
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    })
    fireEvent.click(screen.getByText('😊'))

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /create vibe/i }))

    // Verify API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/vibes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Vibe',
          content: 'Test Content',
          mood: 'happy',
        }),
      })
    })

    // Verify success handling
    expect(toast.success).toHaveBeenCalledWith('Vibe created successfully')
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
  })

  it('handles edit mode with pre-filled data', () => {
    render(<VibeForm initialData={mockInitialData} />)
    
    expect(screen.getByLabelText(/title/i)).toHaveValue(mockInitialData.title)
    expect(screen.getByLabelText(/content/i)).toHaveValue(mockInitialData.content)
    expect(screen.getByText('😊')).toHaveClass('bg-yellow-200')
    expect(screen.getByRole('button', { name: /update vibe/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<VibeForm />)
    
    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /create vibe/i }))

    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument()
      expect(screen.getByText(/content is required/i)).toBeInTheDocument()
      expect(screen.getByText(/please select a mood/i)).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))

    render(<VibeForm />)
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Vibe' },
    })
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    })
    fireEvent.click(screen.getByText('😊'))
    fireEvent.click(screen.getByRole('button', { name: /create vibe/i }))

    // Verify error handling
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create vibe')
    })
  })

  it('handles form reset correctly', () => {
    render(<VibeForm />)
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Vibe' },
    })
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test Content' },
    })
    fireEvent.click(screen.getByText('😊'))

    // Reset form
    fireEvent.click(screen.getByRole('button', { name: /reset/i }))

    // Verify form is reset
    expect(screen.getByLabelText(/title/i)).toHaveValue('')
    expect(screen.getByLabelText(/content/i)).toHaveValue('')
    expect(screen.getByText('😊')).not.toHaveClass('bg-yellow-200')
  })
}) 