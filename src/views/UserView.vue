<template>
  <div class="user-dashboard">
    <h1>Dashboard Pengguna</h1>
    
    <section class="profile-section">
      <h2>Profil Saya</h2>
      <div class="profile-info">
        <p><strong>Nama:</strong> {{ user.nama }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Status:</strong> {{ user.status }}</p>
        <button 
          @click="showProfileModal" 
          class="edit-button"
        >
          Edit Profil
        </button>
      </div>

      <!-- Modal Edit Profil -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>Edit Profil</h3>
          <form @submit.prevent="handleProfileSubmit">
            <div class="form-group">
              <label>Nama:</label>
              <input 
                v-model="profileForm.nama" 
                type="text" 
                required
              >
            </div>

            <div class="form-group">
              <label>Email:</label>
              <input 
                v-model="profileForm.email" 
                type="email" 
                required
              >
            </div>

            <div class="modal-buttons">
              <button type="submit" class="btn-save">
                Simpan Perubahan
              </button>
              <button type="button" @click="closeModal" class="btn-cancel">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section class="transaction-section">
      <h2>Transaksi</h2>
      <div class="transaction-list">
        <div v-if="transactions.length === 0" class="no-data">
          Tidak ada transaksi
        </div>
        <div 
          v-else
          v-for="transaction in transactions" 
          :key="transaction.id"
          class="transaction-item"
        >
          <div class="transaction-header">
            <span>Transaksi #{{ transaction.id }}</span>
            <span :class="['status', transaction.status.toLowerCase()]">
              {{ transaction.status }}
            </span>
          </div>
          <div class="transaction-details">
            <p><strong>Tanggal:</strong> {{ transaction.tanggal }}</p>
            <p><strong>Total:</strong> Rp{{ transaction.total.toLocaleString() }}</p>
          </div>
          <button 
            @click="lihatDetail(transaction)"
            class="view-button"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  
  data() {
    return {
      showModal: false,
      user: {
        nama: 'John Doe',
        email: 'john@example.com',
        status: 'Aktif'
      },
      profileForm: {
        nama: '',
        email: ''
      },
      transactions: [
        {
          id: 1,
          tanggal: '2024-01-01',
          total: 150000,
          status: 'Selesai'
        },
        {
          id: 2,
          tanggal: '2024-01-15',
          total: 75000,
          status: 'Proses'
        }
      ]
    }
  },

  methods: {
    showProfileModal() {
      this.profileForm = {
        nama: this.user.nama,
        email: this.user.email
      };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    handleProfileSubmit() {
      // Update user data
      this.user = { 
        ...this.user,
        nama: this.profileForm.nama,
        email: this.profileForm.email
      };
      this.closeModal();
    },

    lihatDetail(transaction) {
      alert(`Detail Transaksi #${transaction.id}:\n` +
            `Tanggal: ${transaction.tanggal}\n` +
            `Total: Rp${transaction.total}\n` +
            `Status: ${transaction.status}`);
    }
  }
};
</script>

<style scoped>
.user-dashboard {
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}

h2 {
  margin-top: 20px;
  color: #4b3f6b;
}

.profile-section,
.transaction-section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-info {
  padding: 15px;
  background-color: white;
  border-radius: 4px;
}

.profile-info p {
  margin: 10px 0;
}

.transaction-list {
  display: grid;
  gap: 15px;
}

.transaction-item {
  background: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.transaction-details p {
  margin: 5px 0;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.status.selesai {
  background-color: #e6ffe6;
  color: #006600;
}

.status.proses {
  background-color: #fff3e6;
  color: #995200;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-save,
.btn-cancel,
.edit-button,
.view-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-save,
.edit-button,
.view-button {
  background-color: #4b3f6b;
  color: white;
}

.btn-cancel {
  background-color: #ddd;
}

.btn-save:hover,
.edit-button:hover,
.view-button:hover {
  background-color: #3a3154;
}

.btn-cancel:hover {
  background-color: #ccc;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>