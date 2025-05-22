import { ref, type Ref } from 'vue'

// Types
export interface ProjectFrontmatter {
  title: string
  description: string
  technologies: string[]
  category: string
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  date: string
  status?: 'completed' | 'in-progress' | 'planned'
}

export interface Project extends ProjectFrontmatter {
  id: string
  content: string
  slug: string
}

// Composable for managing projects
export function useProjects() {
  const projects: Ref<Project[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Function to parse frontmatter from markdown
  const parseFrontmatter = (
    markdown: string,
  ): { frontmatter: ProjectFrontmatter; content: string } => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = markdown.match(frontmatterRegex)

    if (!match) {
      throw new Error('Invalid markdown format - missing frontmatter')
    }

    const frontmatterText = match[1]
    const content = match[2].trim()

    // Parse YAML-like frontmatter
    const frontmatter: any = {}
    const lines = frontmatterText.split('\n')

    for (const line of lines) {
      if (line.trim() === '') continue

      const colonIndex = line.indexOf(':')
      if (colonIndex === -1) continue

      const key = line.substring(0, colonIndex).trim()
      let rawValue = line.substring(colonIndex + 1).trim()
      let parsedValue: any = rawValue

      // Remove quotes if present
      if (
        (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
        (rawValue.startsWith("'") && rawValue.endsWith("'"))
      ) {
        parsedValue = rawValue.slice(1, -1)
      }

      // Handle arrays (technologies)
      else if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        const arrayContent = rawValue.slice(1, -1)
        parsedValue = arrayContent.split(',').map((item) => item.trim().replace(/['"]/g, ''))
      }

      // Handle booleans
      else if (rawValue === 'true') {
        parsedValue = true
      } else if (rawValue === 'false') {
        parsedValue = false
      }

      frontmatter[key] = parsedValue
    }

    return { frontmatter: frontmatter as ProjectFrontmatter, content }
  }

  // Function to load all project markdown files
  const loadProjects = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // Get all markdown files from the projects directory
      const projectModules = import.meta.glob('/src/content/projects/*.md', { as: 'raw' })
      const projectPromises = Object.entries(projectModules).map(async ([path, resolver]) => {
        const markdown = await resolver()
        const filename = path.split('/').pop()?.replace('.md', '') || ''

        try {
          const { frontmatter, content } = parseFrontmatter(markdown)

          return {
            id: filename,
            slug: filename,
            content,
            ...frontmatter,
          } as Project
        } catch (parseError) {
          console.error(`Error parsing ${filename}:`, parseError)
          return null
        }
      })

      const loadedProjects = await Promise.all(projectPromises)
      projects.value = loadedProjects
        .filter((project): project is Project => project !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date, newest first
    } catch (err) {
      error.value = 'Failed to load projects'
      console.error('Error loading projects:', err)
    } finally {
      loading.value = false
    }
  }

  // Filter functions
  const getProjectsByTechnology = (tech: string): Project[] => {
    return projects.value.filter((project) => project.technologies.includes(tech))
  }

  const getProjectsByCategory = (category: string): Project[] => {
    return projects.value.filter((project) => project.category === category)
  }

  const getFeaturedProjects = (): Project[] => {
    return projects.value.filter((project) => project.featured)
  }

  const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.value.find((project) => project.slug === slug)
  }

  // Get unique technologies and categories for filters
  const getAllTechnologies = (): string[] => {
    const techSet = new Set<string>()
    projects.value.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }

  const getAllCategories = (): string[] => {
    const categorySet = new Set<string>()
    projects.value.forEach((project) => {
      categorySet.add(project.category)
    })
    return Array.from(categorySet).sort()
  }

  return {
    projects,
    loading,
    error,
    loadProjects,
    getProjectsByTechnology,
    getProjectsByCategory,
    getFeaturedProjects,
    getProjectBySlug,
    getAllTechnologies,
    getAllCategories,
  }
}
