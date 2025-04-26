// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
        }
    },
    usePathname() {
        return ''
    },
    useSearchParams() {
        return new URLSearchParams()
    },
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
    useSession() {
        return {
            data: null,
            status: 'unauthenticated',
        }
    },
    signIn: jest.fn(),
    signOut: jest.fn(),
}))

// Mock SWR
jest.mock('swr', () => ({
    __esModule: true,
    default: () => ({
        data: undefined,
        error: undefined,
        isLoading: false,
        mutate: jest.fn(),
    }),
}))

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
}) 