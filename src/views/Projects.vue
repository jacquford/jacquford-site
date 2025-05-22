<template>
    <div class="projects-container">
      <!-- Filter Sidebar -->
      <aside class="filter-sidebar">
        <h3>Filters</h3>

        <!-- Technology Filter -->
        <div class="filter-section">
          <h4>Technology</h4>
          <div class="filter-options">
            <label v-for="tech in technologies" :key="tech" class="filter-option">
              <input
                type="checkbox"
                :value="tech"
                v-model="selectedTechnologies"
              >
              {{ tech }}
            </label>
          </div>
        </div>

        <!-- Category Filter -->
        <div class="filter-section">
          <h4>Category</h4>
          <div class="filter-options">
            <label v-for="category in categories" :key="category" class="filter-option">
              <input
                type="checkbox"
                :value="category"
                v-model="selectedCategories"
              >
              {{ category }}
            </label>
          </div>
        </div>

        <!-- Clear Filters Button -->
        <button @click="clearFilters" class="clear-filters-btn">
          Clear All Filters
        </button>
      </aside>

      <!-- Main Content Area -->
      <main class="projects-main">
        <div class="projects-header">
          <h1>My Projects</h1>
          <p>Showing {{ filteredProjects.length }} of {{ projects.length }} projects</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <h3>Error Loading Projects</h3>
          <p>{{ error }}</p>
          <button @click="loadProjects" class="retry-btn">Try Again</button>
        </div>

        <!-- Projects Content -->
        <div v-else>
          <!-- Projects Grid -->
          <div class="projects-grid">
            <ProjectCard
              v-for="project in filteredProjects"
              :key="project.id"
              :project="project"
            />
          </div>

          <!-- No Results Message -->
          <div v-if="filteredProjects.length === 0" class="no-results">
            <h3>No projects found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        </div>
      </main>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import ProjectCard from '@/components/ProjectCard.vue'
  import { useProjects } from '@/composables/useProjects'

  // Use the projects composable
  const {
    projects,
    loading,
    error,
    loadProjects,
    getAllTechnologies,
    getAllCategories
  } = useProjects()

  // Filter state
  const selectedTechnologies = ref<string[]>([])
  const selectedCategories = ref<string[]>([])

  // Computed properties for dynamic filter options
  const technologies = computed(() => getAllTechnologies())
  const categories = computed(() => getAllCategories())

  // Computed filtered projects
  const filteredProjects = computed(() => {
    let filtered = [...projects.value]

    // Filter by technologies
    if (selectedTechnologies.value.length > 0) {
      filtered = filtered.filter(project =>
        selectedTechnologies.value.some(tech =>
          project.technologies.includes(tech)
        )
      )
    }

    // Filter by categories
    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter(project =>
        selectedCategories.value.includes(project.category)
      )
    }

    return filtered
  })

  // Methods
  const clearFilters = () => {
    selectedTechnologies.value = []
    selectedCategories.value = []
  }

  // Initialize data
  onMounted(async () => {
    await loadProjects()
  })
  </script>

  <style scoped>
  .projects-container {
    display: flex;
    min-height: 100vh;
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .filter-sidebar {
    width: 280px;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .filter-sidebar h3 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
    font-size: 1.25rem;
  }

  .filter-section {
    margin-bottom: 1.5rem;
  }

  .filter-section h4 {
    margin: 0 0 0.75rem 0;
    color: #34495e;
    font-size: 1rem;
    font-weight: 600;
  }

  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: #555;
  }

  .filter-option input[type="checkbox"] {
    margin: 0;
  }

  .clear-filters-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    width: 100%;
    transition: background-color 0.2s;
  }

  .clear-filters-btn:hover {
    background: #2980b9;
  }

  .projects-main {
    flex: 1;
  }

  .projects-header {
    margin-bottom: 2rem;
  }

  .projects-header h1 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
    font-size: 2.5rem;
  }

  .projects-header p {
    margin: 0;
    color: #7f8c8d;
    font-size: 1rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: #7f8c8d;
  }

  .no-results h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }

  .no-results p {
    margin: 0;
    font-size: 1rem;
  }

  /* Loading and Error States */
  .loading-state {
    text-align: center;
    padding: 3rem;
    color: #7f8c8d;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #ecf0f1;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-state {
    text-align: center;
    padding: 3rem;
    color: #e74c3c;
  }

  .error-state h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }

  .error-state p {
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
  }

  .retry-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }

  .retry-btn:hover {
    background: #c0392b;
  }
  @media (max-width: 768px) {
    .projects-container {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .filter-sidebar {
      width: 100%;
      position: static;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
