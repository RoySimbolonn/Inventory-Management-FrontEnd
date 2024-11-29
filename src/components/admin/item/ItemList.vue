<template>
  <div class="item-list">
    <h2>Daftar Barang</h2>
    
    <button @click="showAddForm" class="btn btn-primary mb-3">
      Add Item
    </button>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Kode Barang</th>
            <th>Nama Barang</th>
            <th>Deskripsi</th>
            <th>Stok</th>
            <th class="action-column">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in filteredItems" :key="item.kode">
            <td>{{ item.kode }}</td>
            <td>{{ item.nama }}</td>
            <td>{{ item.deskripsi }}</td>
            <td>{{ item.stok }}</td>
            <td class="action-buttons">
              <button class="edit-btn me-2" @click="editItem(item)">
                Edit
              </button>
              <button class="delete-btn" @click="deleteItem(item.kode)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal :visible="showForm" @close="cancelForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEditing"
        @submit="handleSubmit"
        @cancel="cancelForm"
      />
    </Modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Modal from "@/components/MainModels.vue"
import ItemForm from "@/components/admin/item/ItemForm.vue"
import { useItemStore } from "@/store/itemStore"
import { EventBus } from "@/eventBus"

export default defineComponent({
  name: 'ItemList',
  components: {
    Modal,
    ItemForm,
  },

  data() {
    return {
      showForm: false,
      selectedItem: null,
      searchQuery: "",
      isEditing: false,
    }
  },

  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase()
      return this.itemStore.items.filter(item => {
        return item && (
          (item.kode && item.kode.toString().toLowerCase().includes(query)) ||
          (item.nama && item.nama.toLowerCase().includes(query))
        )
      })
    }
  },

  methods: {
    showAddForm() {
      this.selectedItem = {
        kode: '',
        nama: '',
        deskripsi: '',
        stok: 0
      }
      this.isEditing = false
      this.showForm = true
    },

    editItem(item) {
      this.selectedItem = { ...item }
      this.isEditing = true
      this.showForm = true
    },

    deleteItem(kode) {
      if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
        this.itemStore.deleteItem(kode)
      }
    },

    cancelForm() {
      this.showForm = false
      this.selectedItem = null
      this.isEditing = false
    },

    handleSubmit(formData) {
      if (this.isEditing) {
        this.itemStore.updateItem(formData)
      } else {
        this.itemStore.addItem(formData)
      }
      this.cancelForm()
    },

    handleSearch(query) {
      this.searchQuery = query || ''
    },
  },

  mounted() {
    EventBus.on("search", this.handleSearch)
  },

  beforeUnmount() {
    EventBus.off("search", this.handleSearch)
  },

  setup() {
    const itemStore = useItemStore()
    return { itemStore }
  },
})
</script>


<style scoped>
.item-list {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 8px 0;
}

h2 {
  margin-bottom: 20px;
  color: #4b3f6b;
  text-align: center;
  font-size: 24px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
}

th {
  background-color: #4b3f6b;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

tbody tr {
  transition: all 0.3s ease;
}

tbody tr:hover {
  transform: scale(1.02);
  background-color: #f8f4ff;
  box-shadow: 0 4px 15px rgba(75, 63, 107, 0.2);
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.action-column {
  width: 100px;
  text-align: center;
}

button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.borrow-btn {
  background-color: #754bc5;
  color: white;
}

.borrow-btn:hover {
  background-color: #5a37a0;
}

.borrow-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(117, 75, 197, 0.3);
}

.edit-btn {
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-right: 8px;
}

.edit-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.edit-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

.delete-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsivitas */
@media (max-width: 600px) {
  th,
  td {
    padding: 8px 10px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  tbody tr:hover {
    transform: scale(1.01);
  }
}
</style>