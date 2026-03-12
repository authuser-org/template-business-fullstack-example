import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { EmptyState, ErrorState, OfflineState } from '../src/components/base/ott/remaining';

describe('OTT Loading & State Components', () => {
	describe('EmptyState', () => {
		it('should render empty state with title and description', () => {
			render(
				<EmptyState
					title="Sin resultados"
					description="Intenta buscando algo más"
				/>
			);

			expect(screen.getByText('Sin resultados')).toBeInTheDocument();
			expect(screen.getByText('Intenta buscando algo más')).toBeInTheDocument();
		});


		it('should render action button with callback', () => {
			const handleReload = vi.fn();
			render(
				<EmptyState
					title="Sin contenido"
					description="Recarga la página"
					actionLabel="Recargar"
					onActionClick={handleReload}
				/>
			);

			const button = screen.getByRole('button', { name: /recargar/i });
			fireEvent.click(button);
			expect(handleReload).toHaveBeenCalledOnce();
		});
		it('should not render action button when onActionClick is not provided', () => {

			render(
				<EmptyState
					title="Sin contenido"
					description="Nada que mostrar"
				/>
			);
			const button = screen.queryByRole('button');
			expect(button).not.toBeInTheDocument();
		});
	});

	describe('ErrorState', () => {
		it('should render error state with title and description', () => {
			render(
				<ErrorState
					title="Ha ocurrido un error"
					description="Inténtalo de nuevo"
				/>
			);

			expect(screen.getByText('Ha ocurrido un error')).toBeInTheDocument();
			expect(screen.getByText('Inténtalo de nuevo')).toBeInTheDocument();
		});

		it('should call onRetry callback when retry button is clicked', () => {
			const handleRetry = vi.fn();
			render(
				<ErrorState
					title="Error ocurrido"
					description="Intenta de nuevo"
					onRetry={handleRetry}
				/>
			);

			const button = screen.getByRole('button', { name: /reintentar/i });
			fireEvent.click(button);
			expect(handleRetry).toHaveBeenCalledOnce();
		});

		it('should render with red styling for error', () => {
			const { container } = render(
				<ErrorState
					title="Error"
					description="Descripción del error"
				/>
			);

			const errorContainer = container.firstChild as HTMLElement;
			expect(errorContainer.className).toContain('bg-red-50');
		});
	});

	describe('OfflineState', () => {
		it('should render offline state message', () => {
			render(<OfflineState onReconnect={vi.fn()} />);

			expect(screen.getByText(/Sin conexión/i)).toBeInTheDocument();
		});

		it('should call onReconnect when reconnect button is clicked', () => {
			const handleReconnect = vi.fn();
			render(<OfflineState onReconnect={handleReconnect} />);

			const button = screen.getByRole('button', { name: /Reconectar/i });
			fireEvent.click(button);
			expect(handleReconnect).toHaveBeenCalledOnce();
		});

		it('should render with amber styling for offline', () => {
			const { container } = render(<OfflineState onReconnect={vi.fn()} />);

			const offlineContainer = container.firstChild as HTMLElement;
			expect(offlineContainer.className).toContain('bg-amber-50');
		});
	});
});
