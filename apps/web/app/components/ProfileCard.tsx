import { type User, UserRole, formatDate, formatPrice } from "@repo/shared";

// ----- datos de ejemplo -----
const currentUser: User = {
  id: "a1b2c3d4-e5f6-4789-abcd-ef0123456789",
  email: "ana@example.com",
  name: "Ana García",
  role: UserRole.Editor,
  createdAt: new Date("2025-01-15"),
};

const productPrice = 1999.9;

// ----- componente -----
export default function ProfileCard() {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{currentUser.name}</h2>
      <p className="text-sm text-gray-500">{currentUser.email}</p>
      <p className="mt-1 text-sm capitalize">Rol: {currentUser.role}</p>
      <p className="mt-1 text-sm text-gray-400">
        Miembro desde: {formatDate(currentUser.createdAt)}
      </p>

      <div className="mt-4 rounded bg-gray-50 p-3">
        <span className="text-sm text-gray-600">Precio ejemplo:</span>
        <span className="ml-2 font-bold text-green-700">
          {formatPrice(productPrice)}
        </span>
      </div>
    </div>
  );
}
