<template>
  <div id="app">
    <!-- Navigation Header -->
    <header class="nav-header">
      <nav class="navbar">
        <div class="nav-container">
          <!-- Logo/Brand -->
          <RouterLink to="/" class="nav-brand">
            <h2>Your Name</h2>
          </RouterLink>

          <!-- Mobile Menu Toggle -->
          <button
            class="mobile-menu-toggle"
            @click="toggleMobileMenu"
            :class="{ active: isMobileMenuOpen }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <!-- Navigation Links -->
          <div class="nav-links" :class="{ active: isMobileMenuOpen }">
            <RouterLink to="/" class="nav-link" @click="closeMobileMenu">
              Home
            </RouterLink>
            <RouterLink to="/projects" class="nav-link" @click="closeMobileMenu">
              Projects
            </RouterLink>
            <RouterLink to="/about" class="nav-link" @click="closeMobileMenu">
              About
            </RouterLink>
            <RouterLink to="/contact" class="nav-link" @click="closeMobileMenu">
              Contact
            </RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-container">
        <p>&copy; 2025 Your Name. All rights reserved.</p>
        <div class="social-links">
          <a href="https://github.com/yourusername" target="_blank" class="social-link">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" class="social-link">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
/* Global App Styles */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #2c3e50;
}

/* Navigation Header */
.nav-header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  padding: 0 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

/* Brand/Logo */
.nav-brand {
  text-decoration: none;
  color: #2c3e50;
}

.nav-brand h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  transition: color 0.2s;
}

.nav-brand:hover h2 {
  color: #3498db;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 30px;
  height: 30px;
  position: relative;
}

.mobile-menu-toggle span {
  width: 100%;
  height: 3px;
  background: #2c3e50;
  margin: 3px 0;
  transition: 0.3s;
  transform-origin: center;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

/* Active link styling */
.nav-link.router-link-active {
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: #3498db;
}

/* Main Content */
.main-content {
  flex: 1;
  background: #f8f9fa;
}

/* Footer */
.site-footer {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-container p {
  margin: 0;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.social-link:hover {
  color: #3498db;
  background: rgba(52, 152, 219, 0.1);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    gap: 0.5rem;
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }

  .footer-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .nav-brand h2 {
    font-size: 1.25rem;
  }

  .navbar {
    padding: 0 0.5rem;
  }

  .footer-container {
    padding: 0 1rem;
  }
}
</style>
