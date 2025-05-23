<template>
    <div class="project-card" :class="{ featured: project.featured }">
      <!-- Featured Badge -->
      <div v-if="project.featured" class="featured-badge">
        Featured
      </div>

      <!-- Project Image -->
      <div class="project-image">
        <img :src="project.imageUrl" :alt="project.title" />
        <div class="image-overlay">
          <div class="overlay-buttons">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="overlay-btn live-btn"
              title="View Live Project"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
              </svg>
            </a>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="overlay-btn github-btn"
              title="View on GitHub"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Project Content -->
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">{{ project.title }}</h3>
          <span class="project-category">{{ project.category }}</span>
        </div>

        <p class="project-description">{{ project.description }}</p>

        <!-- Technology Tags -->
        <div class="technology-tags">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="tech-tag"
            :class="getTechTagClass(tech)"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import type { Project } from '@/composables/useProjects'

  // Props
  defineProps<{
    project: Project
  }>()

  // Helper function to assign colors to technology tags
  const getTechTagClass = (tech: string): string => {
    const techColors: { [key: string]: string } = {
      'Vue.js': 'vue',
      'React': 'react',
      'TypeScript': 'typescript',
      'JavaScript': 'javascript',
      'Node.js': 'nodejs',
      'Python': 'python',
      'CSS': 'css',
      'HTML': 'html',
      'MongoDB': 'mongodb',
      'PostgreSQL': 'postgresql'
    }

    return techColors[tech] || 'default'
  }
  </script>

  <style scoped>
  .project-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .project-card.featured {
    border: 2px solid #f39c12;
  }

  .featured-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #f39c12;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 2;
  }

  .project-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .project-card:hover .project-image img {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .project-card:hover .image-overlay {
    opacity: 1;
  }

  .overlay-buttons {
    display: flex;
    gap: 1rem;
  }

  .overlay-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    border-radius: 50%;
    text-decoration: none;
    transition: background-color 0.2s, transform 0.2s;
  }

  .overlay-btn:hover {
    background: white;
    transform: scale(1.1);
  }

  .live-btn:hover {
    color: #27ae60;
  }

  .github-btn:hover {
    color: #333;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .project-title {
    margin: 0;
    color: #2c3e50;
    font-size: 1.25rem;
    font-weight: 600;
    flex: 1;
  }

  .project-category {
    background: #ecf0f1;
    color: #7f8c8d;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    margin-left: 1rem;
  }

  .project-description {
    color: #555;
    line-height: 1.6;
    margin: 0 0 1.5rem 0;
    font-size: 0.9rem;
  }

  .technology-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
  }

  /* Technology-specific colors */
  .tech-tag.vue {
    background: #4fc08d;
  }

  .tech-tag.react {
    background: #61dafb;
    color: #333;
  }

  .tech-tag.typescript {
    background: #3178c6;
  }

  .tech-tag.javascript {
    background: #f7df1e;
    color: #333;
  }

  .tech-tag.nodejs {
    background: #339933;
  }

  .tech-tag.python {
    background: #3776ab;
  }

  .tech-tag.css {
    background: #1572b6;
  }

  .tech-tag.html {
    background: #e34f26;
  }

  .tech-tag.mongodb {
    background: #47a248;
  }

  .tech-tag.postgresql {
    background: #336791;
  }

  .tech-tag.default {
    background: #95a5a6;
  }
  </style>
