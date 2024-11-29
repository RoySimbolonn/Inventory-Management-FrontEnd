import apiClient from "@/plugins/axios";
import { useAuthStore } from "@/store/authStore";

// Fungsi Login
export const login = async (username, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });

    const { token } = response.data.data;

    if (!token) {
      throw new Error("Invalid token");
    }

    const role = decodeToken(token);

    const authStore = useAuthStore();
    authStore.setToken(token);
    authStore.setRole(role);

    localStorage.setItem('auth', 'true');

    return { token, role }; 
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Fungsi untuk decode token (membutuhkan jwt-decode)
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decoded = JSON.parse(window.atob(base64));
    console.log("Decoded Token Payload:", decoded); // Tambahkan log ini
    return decoded.role || 'USER';
  } catch (error) {
    console.error("Token decoding error:", error);
    return null;
  }
}
// Fungsi Register
export const register = async (username, email, password) => {
  try {
    const response = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });

    return response.data; // Kembalikan respons untuk digunakan di komponen
  } catch (error) {
    if (error.response) {
      // Handle error berdasarkan status kode
      switch (error.response.status) {
        case 400:
          throw new Error(error.response.data.message || "User already exists");
        default:
          throw new Error(error.response.data.message || "An error occurred");
      }
    } else {
      console.error("Error during registration:", error);
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};
