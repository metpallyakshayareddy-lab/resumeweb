import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ResumeData,
  PersonalInfo,
  Education,
  Experience,
  Project,
  Skill,
  ResumeSettings,
  ResumeSection,
} from '@/types/resume';

const defaultSections: ResumeSection[] = [
  { id: 'personalInfo', label: 'Personal Info', visible: true, order: 0 },
  { id: 'experience', label: 'Experience', visible: true, order: 1 },
  { id: 'education', label: 'Education', visible: true, order: 2 },
  { id: 'projects', label: 'Projects', visible: true, order: 3 },
  { id: 'skills', label: 'Skills', visible: true, order: 4 },
];

const defaultData: ResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    title: 'Senior Software Engineer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    summary:
      'Passionate software engineer with 5+ years of experience building scalable web applications. Led cross-functional teams to deliver high-impact products used by millions of users.',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8',
      description: '',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: '',
      achievements: [
        'Led development of microservices architecture serving 2M+ daily users',
        'Built and deployed CI/CD pipelines reducing deployment time by 60%',
        'Mentored team of 5 junior engineers and conducted technical interviews',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'CloudDash Analytics',
      description:
        'Designed and built a real-time analytics dashboard processing 100K+ events/second using React, Node.js, and Kafka.',
      technologies: ['React', 'Node.js', 'Kafka', 'PostgreSQL', 'Redis'],
      url: 'https://clouddash.io',
      github: 'https://github.com/alexj/clouddash',
    },
  ],
  skills: [
    {
      id: 'skill-1',
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Go', 'SQL'],
    },
    {
      id: 'skill-2',
      category: 'Frameworks',
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI'],
    },
    {
      id: 'skill-3',
      category: 'Tools & Platforms',
      skills: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    },
  ],
  sections: defaultSections,
  settings: {
    template: 'modern',
    primaryColor: '#6366f1',
    fontFamily: 'sans',
    fontName: 'Inter',
  },
};

interface ResumeStore extends ResumeData {
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addProject: (proj: Project) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addSkillGroup: (skill: Skill) => void;
  updateSkillGroup: (id: string, skill: Partial<Skill>) => void;
  removeSkillGroup: (id: string) => void;
  updateSettings: (settings: Partial<ResumeSettings>) => void;
  updateSectionOrder: (sections: ResumeSection[]) => void;
  toggleSectionVisibility: (id: string) => void;
  resetData: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      ...defaultData,

      updatePersonalInfo: (info) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),

      addEducation: (edu) =>
        set((state) => ({ education: [...state.education, edu] })),

      updateEducation: (id, edu) =>
        set((state) => ({
          education: state.education.map((e) =>
            e.id === id ? { ...e, ...edu } : e
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((e) => e.id !== id),
        })),

      addExperience: (exp) =>
        set((state) => ({ experience: [...state.experience, exp] })),

      updateExperience: (id, exp) =>
        set((state) => ({
          experience: state.experience.map((e) =>
            e.id === id ? { ...e, ...exp } : e
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experience: state.experience.filter((e) => e.id !== id),
        })),

      addProject: (proj) =>
        set((state) => ({ projects: [...state.projects, proj] })),

      updateProject: (id, proj) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...proj } : p
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      addSkillGroup: (skill) =>
        set((state) => ({ skills: [...state.skills, skill] })),

      updateSkillGroup: (id, skill) =>
        set((state) => ({
          skills: state.skills.map((s) =>
            s.id === id ? { ...s, ...skill } : s
          ),
        })),

      removeSkillGroup: (id) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        })),

      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

      updateSectionOrder: (sections) => set({ sections }),

      toggleSectionVisibility: (id) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === id ? { ...s, visible: !s.visible } : s
          ),
        })),

      resetData: () => set(defaultData),
    }),
    {
      name: 'resume-forge-data-v2',
    }
  )
);
