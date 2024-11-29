<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEdit ? 'Edit Barang' : 'Tambah Barang Baru' }}</h2>
    <form @submit.prevent="submitForm" class="item-form">
      <div class="form-group">
        <label for="kode">Kode Barang:</label>
        <input
          type="text"
          id="kode"
          v-model="form.kode"
          class="form-control"
          :disabled="isEdit"
          required
        />
      </div>

      <div class="form-group">
        <label for="nama">Nama Barang:</label>
        <input
          type="text"
          id="nama"
          v-model="form.nama"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label for="deskripsi">Deskripsi:</label>
        <textarea
          id="deskripsi"
          v-model="form.deskripsi"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="stok">Stok:</label>
        <input
          type="number"
          id="stok"
          v-model="form.stok"
          class="form-control"
          min="0"
          required
        />
      </div>

      <div class="button-group">
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
          Batal
        </button>
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? 'Simpan Perubahan' : 'Tambah Barang' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ItemForm',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        kode: '',
        nama: '',
        deskripsi: '',
        stok: 0,
      },
    };
  },

  watch: {
    item: {
      handler(newItem) {
        if (newItem) {
          this.form = {
            kode: newItem.kode || '',
            nama: newItem.nama || '',
            deskripsi: newItem.deskripsi || '',
            stok: newItem.stok || 0,
          };
        }
      },
      immediate: true,
    },
  },

  methods: {
  submitForm() {
    try {
      // Tambahkan validasi lebih ketat
      if (!this.form.kode.trim()) {
        alert('Kode barang harus diisi!');
        return;
      }
      if (!this.form.nama.trim()) {
        alert('Nama barang harus diisi!');
        return;
      }
      if (!this.form.deskripsi.trim()) {
        alert('Deskripsi barang harus diisi!');
        return;
      }
      if (this.form.stok < 0) {
        alert('Stok tidak boleh negatif!');
        return;
      }

      this.$emit('submit', { 
        ...this.form,
        stok: Number(this.form.stok) // Pastikan stok adalah angka
      });
    } catch (error) {
      console.error('Error saat submit form:', error);
      alert('Terjadi kesalahan saat menyimpan barang.');
    }
  },
},
};
</script>


<style scoped>
.form-container {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.item-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-control {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-control:focus {
  border-color: #4b3f6b;
  outline: none;
  box-shadow: 0 0 0 2px rgba(75, 63, 107, 0.2);
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4b3f6b;
  color: white;
}

.btn-primary:hover {
  background-color: #3a3153;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>