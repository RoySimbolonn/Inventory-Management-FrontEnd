<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>
    
    <section class="user-management">
      <h2>Pengguna</h2>
      <UserList 
        @add-user="showUserModal('add')" 
        @edit-user="showUserModal('edit', $event)" 
        @delete-user="deleteUser" 
      />

      <!-- Modal Form Pengguna -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>{{ modalMode === 'add' ? 'Tambah Pengguna' : 'Edit Pengguna' }}</h3>
          <form @submit.prevent="handleUserSubmit">
            <div class="form-group">
              <label>Nama Pengguna:</label>
              <input 
                v-model="userForm.username" 
                type="text" 
                required
              >
            </div>

            <div class="form-group">
              <label>Email:</label>
              <input 
                v-model="userForm.email" 
                type="email" 
                required
              >
            </div>

            <div class="form-group">
              <label>No. Telepon:</label>
              <input 
                v-model="userForm.phone" 
                type="tel"
                required
              >
            </div>

            <div class="form-group">
              <label>Alamat:</label>
              <textarea 
                v-model="userForm.address" 
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label>Role:</label>
              <select v-model="userForm.role" required>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>

            <div class="modal-buttons">
              <button type="submit" class="btn-save">
                {{ modalMode === 'add' ? 'Simpan' : 'Update' }}
              </button>
              <button type="button" @click="closeModal" class="btn-cancel">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section class="item-management">
      <h2>Item</h2>
      <ItemList 
        @add-item="addItem" 
        @edit-item="editItem" 
        @delete-item="deleteItem" 
      />
    </section>
  </div>
</template>

<script>
import UserList from '@/components/admin/user/UserList.vue'
import ItemList from '@/components/admin/item/ItemList.vue'

export default {
  components: {
    UserList,
    ItemList
  },
  data() {
    return {
      showModal: false,
      modalMode: 'add', // 'add' atau 'edit'
      userForm: {
        username: '',
        email: '',
        phone: '',
        address: '',
        role: 'user'
      },
      selectedUserId: null
    }
  },
  methods: {
    showUserModal(mode, user = null) {
      this.modalMode = mode;
      this.showModal = true;
      
      if (mode === 'edit' && user) {
        this.selectedUserId = user.id;
        this.userForm = { ...user };
      } else {
        this.resetForm();
      }
    },

    closeModal() {
      this.showModal = false;
      this.resetForm();
    },

    resetForm() {
      this.userForm = {
        username: '',
        email: '',
        phone: '',
        address: '',
        role: 'user'
      };
      this.selectedUserId = null;
    },

    handleUserSubmit() {
      if (this.modalMode === 'add') {
        // Di sini Anda bisa menambahkan kode untuk menyimpan ke API/database
        console.log('Menambah pengguna:', this.userForm);
      } else {
        // Di sini Anda bisa menambahkan kode untuk mengupdate ke API/database
        console.log('Mengupdate pengguna:', this.userForm);
      }

      this.closeModal();
    },

    deleteUser(id) {
      if (confirm(`Apakah Anda yakin ingin menghapus pengguna dengan ID: ${id}?`)) {
        // Di sini Anda bisa menambahkan kode untuk menghapus dari API/database
        console.log(`Menghapus pengguna dengan ID: ${id}`);
      }
    },

    // Item methods tetap sama
    addItem() {
      const itemName = prompt('Masukkan nama item:');
      if (itemName) {
        alert(`Item '${itemName}' berhasil ditambahkan.`);
      }
    },
    
    editItem(item) {
      const newItemName = prompt(`Edit nama item:`, item.nama);
      if (newItemName) {
        alert(`Item '${item.nama}' telah diubah menjadi '${newItemName}'.`);
      }
    },
    
    deleteItem(kode) {
      if (confirm(`Apakah Anda yakin ingin menghapus item dengan kode: ${kode}?`)) {
        alert(`Item dengan kode: ${kode} telah dihapus.`);
      }
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

h2 {
  margin-top: 20px;
  color: #4b3f6b;
}

.user-management,
.item-management {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-save,
.btn-cancel {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-save {
  background-color: #4b3f6b;
  color: white;
}

.btn-cancel {
  background-color: #ddd;
}

.btn-save:hover {
  background-color: #3a3154;
}

.btn-cancel:hover {
  background-color: #ccc;
}
</style>