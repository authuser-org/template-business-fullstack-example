import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ForgotPasswordForm, LoginForm, RegisterForm } from '../src/components/base/ott/remaining';

describe('OTT Authentication Forms', () => {
	describe('LoginForm', () => {

		it('should render email and password input fields', () => {
			render(<LoginForm onSubmit={vi.fn()} />);

			const emailInput = screen.getByPlaceholderText(/dominio/i) as HTMLInputElement;
			const passwordInput = screen.getByPlaceholderText(/•••/i) as HTMLInputElement;

			expect(emailInput).toBeInTheDocument();
			expect(passwordInput).toBeInTheDocument();
		});

		it('should capture form input values', () => {
			render(<LoginForm onSubmit={vi.fn()} />);

			const emailInput = screen.getByPlaceholderText(/dominio/i) as HTMLInputElement;
			const passwordInput = screen.getByPlaceholderText(/•••/i) as HTMLInputElement;

			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(passwordInput, { target: { value: 'password123' } });

			expect(emailInput.value).toBe('test@example.com');
			expect(passwordInput.value).toBe('password123');
		});

		it('should call onSubmit with form data when submit button is clicked', () => {
			const handleSubmit = vi.fn();
			render(<LoginForm onSubmit={handleSubmit} />);

			const emailInput = screen.getByPlaceholderText(/dominio/i) as HTMLInputElement;
			const passwordInput = screen.getByPlaceholderText(/•••/i) as HTMLInputElement;
			const submitButton = screen.getByRole('button', { name: /entrar/i });
			fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
			fireEvent.change(passwordInput, { target: { value: 'password123' } });
			fireEvent.click(submitButton);

			expect(handleSubmit).toHaveBeenCalledWith({
				email: 'test@example.com',
				password: 'password123',
			});
		});
	});

	describe('RegisterForm', () => {
		it('should render name, email, and password input fields', () => {
			render(<RegisterForm onSubmit={vi.fn()} />);

			expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/dominio/i)).toBeInTheDocument();
			expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
		});

		it('should capture all registration form fields', () => {
			render(<RegisterForm onSubmit={vi.fn()} />);

			const nameInput = screen.getByPlaceholderText(/nombre/i) as HTMLInputElement;
			const emailInput = screen.getByPlaceholderText(/dominio/i) as HTMLInputElement;
			const passwordInput = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement;

			fireEvent.change(nameInput, { target: { value: 'John Doe' } });
			fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
			fireEvent.change(passwordInput, { target: { value: 'pass123' } });

			expect(nameInput.value).toBe('John Doe');
			expect(emailInput.value).toBe('john@example.com');
			expect(passwordInput.value).toBe('pass123');
		});


		it('should call onSubmit with all registration data', () => {
			const handleSubmit = vi.fn();
			render(<RegisterForm onSubmit={handleSubmit} />);

			const nameInput = screen.getByPlaceholderText(/nombre/i) as HTMLInputElement;
			const emailInput = screen.getByPlaceholderText(/dominio/i) as HTMLInputElement;
			const passwordInput = screen.getByPlaceholderText(/contraseña/i) as HTMLInputElement;
			const submitButton = screen.getByRole('button', { name: /registrarme/i });
			fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
			fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
			fireEvent.change(passwordInput, { target: { value: 'secure123' } });
			fireEvent.click(submitButton);

			expect(handleSubmit).toHaveBeenCalledWith({
				name: 'Jane Doe',
				email: 'jane@example.com',
				password: 'secure123',
			});
		});
	});

	describe('ForgotPasswordForm', () => {
		it('should render email input field', () => {
			render(<ForgotPasswordForm onSubmit={vi.fn()} />);

			expect(screen.getByPlaceholderText(/dominio/i)).toBeInTheDocument();
		});

	});
		it('should call onSubmit with email address', () => {
			const handleSubmit = vi.fn();
			render(<ForgotPasswordForm onSubmit={handleSubmit} />);

			const emailInput = screen.getByPlaceholderText(/dominio/i) as HTMLInputElement;
			const submitButton = screen.getByRole('button', { name: /enviar/i });

			fireEvent.change(emailInput, { target: { value: 'recover@example.com' } });
			fireEvent.click(submitButton);

			expect(handleSubmit).toHaveBeenCalledWith('recover@example.com');
		});
});
