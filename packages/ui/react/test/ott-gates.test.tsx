import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
	AccessGate,
	AgeVerificationGate,
	GeoRestrictionGate,
	SubscriptionGate,
} from '../src/components/base/ott/remaining';

describe('OTT Access Gate Components', () => {
	describe('AccessGate', () => {
		it('should render children when access is allowed', () => {
			render(
				<AccessGate allowed={true}>
					<div>Contenido Protegido</div>
				</AccessGate>,
			);

			expect(screen.getByText('Contenido Protegido')).toBeInTheDocument();
		});

		it('should render empty state when access is denied', () => {
			render(
				<AccessGate allowed={false}>
					<div>Contenido Protegido</div>
				</AccessGate>,
			);

			expect(screen.getByText(/Acceso denegado/i)).toBeInTheDocument();
			expect(screen.queryByText('Contenido Protegido')).not.toBeInTheDocument();
		});
	});

	describe('AgeVerificationGate', () => {
		it('should render children when user age meets requirement', () => {
			render(
				<AgeVerificationGate minAge={18} currentAge={18}>
					<div>Contenido Restringido</div>
				</AgeVerificationGate>,
			);

			expect(screen.getByText('Contenido Restringido')).toBeInTheDocument();
		});

		it('should render age restriction message when user is too young', () => {
			render(
				<AgeVerificationGate minAge={18} currentAge={16}>
					<div>Contenido Restringido</div>
				</AgeVerificationGate>,
			);

			expect(screen.getByText(/Control de edad/i)).toBeInTheDocument();
			expect(screen.getByText(/18 años/i)).toBeInTheDocument();
			expect(
				screen.queryByText('Contenido Restringido'),
			).not.toBeInTheDocument();
		});

		it('should display required age in restriction message', () => {
			render(
				<AgeVerificationGate minAge={21} currentAge={15}>
					<div>Contenido Restringido</div>
				</AgeVerificationGate>,
			);

			expect(screen.getByText(/21 años/i)).toBeInTheDocument();
		});
	});

	describe('GeoRestrictionGate', () => {
		it('should render children when user country is allowed', () => {
			render(
				<GeoRestrictionGate allowedCountries={['ES', 'PT']} country="ES">
					<div>Contenido Geo-Restringido</div>
				</GeoRestrictionGate>,
			);

			expect(screen.getByText('Contenido Geo-Restringido')).toBeInTheDocument();
		});

		it('should render geo-block message when user country is not allowed', () => {
			render(
				<GeoRestrictionGate allowedCountries={['ES', 'PT']} country="US">
					<div>Contenido Geo-Restringido</div>
				</GeoRestrictionGate>,
			);

			expect(
				screen.getByText(/No disponible en tu región/i),
			).toBeInTheDocument();
			expect(
				screen.queryByText('Contenido Geo-Restringido'),
			).not.toBeInTheDocument();
		});

		it('should display allowed countries in message', () => {
			render(
				<GeoRestrictionGate allowedCountries={['ES', 'PT', 'FR']} country="US">
					<div>Content</div>
				</GeoRestrictionGate>,
			);

			expect(screen.getByText(/ES, PT, FR/i)).toBeInTheDocument();
		});
	});

	describe('SubscriptionGate', () => {
		it('should render children when user has required subscription', () => {
			render(
				<SubscriptionGate hasSubscription={true}>
					<div>Contenido Premium</div>
				</SubscriptionGate>,
			);

			expect(screen.getByText('Contenido Premium')).toBeInTheDocument();
		});

		it('should render subscription wall when user lacks subscription', () => {
			render(
				<SubscriptionGate hasSubscription={false}>
					<div>Contenido Premium</div>
				</SubscriptionGate>,
			);

			expect(screen.getByText(/Suscripción requerida/i)).toBeInTheDocument();
			expect(screen.queryByText('Contenido Premium')).not.toBeInTheDocument();
		});

		it('should show action button to upgrade subscription', () => {
			const handleSubscribe = vi.fn();
			render(
				<SubscriptionGate
					hasSubscription={false}
					onSubscribeClick={handleSubscribe}
				>
					<div>Contenido Premium</div>
				</SubscriptionGate>,
			);

			const upgradeButton = screen.getByRole('button', { name: /Ver planes/i });
			expect(upgradeButton).toBeInTheDocument();
			fireEvent.click(upgradeButton);
			expect(handleSubscribe).toHaveBeenCalledOnce();
		});
	});
});
