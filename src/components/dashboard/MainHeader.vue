<template>
  <header :class="{ expanded: !isSidebarVisible }">
    <button class="toggle-btn" @click="toggleSidebar">☰</button>
    <div class="header-content">
      <div class="search-bar-container">
        <input
          type="text"
          v-model="search"
          @input="emitSearch"
          placeholder="Search"
          class="search-bar form-control"
        />
      </div>
      <div class="role-selection">
        <button
          @click="selectRole('admin')"
          :class="{ active: currentRole === 'admin' }"
          class="btn btn-secondary"
        >
          Admin
        </button>
        <button
          @click="selectRole('user')"
          :class="{ active: currentRole === 'user' }"
          class="btn btn-secondary"
        >
          User
        </button>
      </div>
      <div class="logout-container">
        <button class="logout-btn btn btn-outline-light" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { EventBus } from "@/eventBus";

export default {
  name: 'HeaderComponent',
  data() {
    return {
      search: "",
    };
  },
  props: {
    currentRole: {
      type: String,
      required: true,
    },
    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    selectRole(role) {
      this.$emit("update-role", role);
      const authRole = localStorage.getItem("role");
      const isAuthenticated = Boolean(localStorage.getItem("auth"));

      if (isAuthenticated && authRole === role) {
        this.$router.push({ name: role, params: { component: "items" } });
      } else {
        alert("You do not have permission to switch to this role.");
        this.$router.push({ name: "login" });
        this.$emit("toggle-sidebar", false);
      }
    },
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    logout() {
      localStorage.removeItem("auth");
      localStorage.removeItem("role");
      this.$emit("update-role", "admin");
      this.$emit("toggle-sidebar", false);
      this.$router.push({ name: "login" });
    },
    emitSearch() {
      EventBus.emit("search", this.search);
    },
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  padding: 1rem;
  color: white;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

header.expanded {
  margin-left: 0;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.search-bar-container {
  flex: 1;
  max-width: 300px;
  margin-right: 1rem;
}

.search-bar {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.role-selection {
  display: flex;
  gap: 1rem;
  margin: 0 1rem;
}

.role-selection button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.role-selection button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.logout-container {
  margin-left: auto;
}

.logout-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn {
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-outline-light {
  background-color: transparent;
  border: 1px solid white;
  color: white;
}

.btn-outline-light:hover {
  background-color: white;
  color: #333;
}

.form-control {
  background-color: white;
  color: #333;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-bar-container {
    max-width: 100%;
  }
  
  .role-selection {
    width: 100%;
    justify-content: center;
  }
  
  .logout-container {
    margin: 1rem 0;
  }
}
</style>