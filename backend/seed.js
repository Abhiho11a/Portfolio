import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminUser from './models/AdminUser.js';
import PortfolioData from './models/PortfolioData.js';

dotenv.config();

// ═══════════════════════════════════════════════════════════════
//  DEFAULT PORTFOLIO DATA — migrated from hardcoded components
// ═══════════════════════════════════════════════════════════════

export function getDefaultData() {
  return {
    hero: {
      name: 'Abhishek',
      tagline: 'Full-Stack AI Engineer',
      subtitle: 'Building Intelligent Systems',
      description: 'Crafting production-grade applications with',
      location: 'Bengaluru, IN',
      status: 'Open for Placements',
      highlights: [
        { text: 'MERN Stack', color: 'var(--accent)', label: 'primary' },
        { text: 'GenAI', color: 'var(--secondary)', label: 'secondary' },
        { text: 'RAG Pipelines', color: 'var(--tertiary)', label: 'tertiary' },
      ],
    },

    skills: [
      {
        id: 'mern',
        label: 'MERN Stack',
        tagline: 'Full-Stack Web Development',
        color: '#10B981',
        skills: [
          { name: 'MongoDB', level: 88, desc: 'NoSQL, Aggregation, Atlas' },
          { name: 'Express.js', level: 82, desc: 'REST APIs, Middleware, Auth' },
          { name: 'React', level: 92, desc: 'Hooks, Context, Next.js' },
          { name: 'Node.js', level: 85, desc: 'Streams, Workers, Clustering' },
        ],
      },
      {
        id: 'dsa',
        label: 'DSA',
        tagline: 'Data Structures & Algorithms',
        color: '#06B6D4',
        skills: [
          { name: 'Arrays & Strings', level: 95, desc: 'Sliding Window, Two Pointer' },
          { name: 'Trees & Graphs', level: 88, desc: 'BFS, DFS, Dijkstra' },
          { name: 'Dynamic Programming', level: 80, desc: 'Memoization, Tabulation' },
          { name: 'System Design', level: 75, desc: 'LLD, HLD, Scalability' },
        ],
      },
      {
        id: 'genai',
        label: 'GenAI',
        tagline: 'Generative AI & ML Pipelines',
        color: '#8B5CF6',
        skills: [
          { name: 'RAG Pipelines', level: 85, desc: 'LangChain, LlamaIndex' },
          { name: 'LLM Integration', level: 80, desc: 'OpenAI, Gemini, Llama' },
          { name: 'Vector Databases', level: 78, desc: 'Pinecone, ChromaDB' },
          { name: 'Prompt Engineering', level: 90, desc: 'Chain-of-Thought, Few-Shot' },
        ],
      },
      {
        id: 'devops',
        label: 'DevOps',
        tagline: 'Containerization & Version Control',
        color: '#F59E0B',
        skills: [
          { name: 'Docker', level: 82, desc: 'Compose, Multi-stage Builds' },
          { name: 'Git & GitHub', level: 92, desc: 'CI/CD, Actions, Branching' },
          { name: 'Linux / CLI', level: 85, desc: 'Bash, Nginx, SSH' },
          { name: 'Cloud (AWS)', level: 70, desc: 'EC2, S3, Lambda' },
        ],
      },
    ],

    projects: [
      {
        title: 'SimplifiED',
        tagline: 'AI-Powered EdTech Platform',
        description: 'A comprehensive educational platform leveraging FastAPI and Computer Vision to deliver personalized learning experiences with real-time gesture recognition and adaptive assessments.',
        techStack: ['FastAPI', 'Computer Vision', 'React', 'TensorFlow', 'PostgreSQL'],
        colorHex: '#10B981',
        accent: 'emerald',
        stats: { users: '2.5K+', modules: '12' },
        links: { live: '', github: '' },
        images: [
          { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop', caption: 'Dashboard Overview' },
          { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', caption: 'Data Analytics' }
        ],
      },
      {
        title: 'EngiTrack',
        tagline: '14-Module Student Productivity Suite',
        description: 'An all-in-one student productivity tool with 14 integrated modules including task management, study planner, GPA tracker, resource library, and collaborative workspace.',
        techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'JWT'],
        colorHex: '#06B6D4',
        accent: 'cyan',
        stats: { modules: '14', active: '1.2K+' },
        links: { live: '', github: '' },
        images: [
          { url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop', caption: 'Productivity Suite UI' },
          { url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1200&auto=format&fit=crop', caption: 'Task Management Module' }
        ],
      },
      {
        title: 'Codebase Q&A Engine',
        tagline: 'RAG-Based GitHub Repository Analyzer',
        description: 'An intelligent code analysis tool that ingests GitHub repos, builds vector embeddings, and enables natural language Q&A using Retrieval-Augmented Generation pipelines.',
        techStack: ['LangChain', 'OpenAI', 'Pinecone', 'Python', 'FastAPI', 'React'],
        colorHex: '#8B5CF6',
        accent: 'violet',
        stats: { repos: '500+', queries: '10K+' },
        links: { live: '', github: '' },
        images: [
          { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop', caption: 'Code Analysis Interface' },
          { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop', caption: 'RAG Pipeline Visualization' }
        ],
      },
    ],

    currentlyBuilding: [
      {
        status: 'In Progress',
        title: 'AI Resume Screener',
        description: 'LLM-powered resume parser that auto-ranks candidates using semantic similarity and RAG.',
        progress: 65,
        techStack: ['LangChain', 'FastAPI', 'React', 'Pinecone'],
        color: '#10B981',
        started: '2 weeks ago',
      },
      {
        status: 'Shipping Soon',
        title: 'Portfolio v2 — This Site',
        description: 'Spatial-computing inspired portfolio with glassmorphism, Framer Motion, and floating dock nav.',
        progress: 90,
        techStack: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
        color: '#06B6D4',
        started: '1 week ago',
      },
      {
        status: 'Research Phase',
        title: 'Real-time Code Collab',
        description: 'Exploring CRDTs for a multiplayer code editor with live cursor presence and voice chat.',
        progress: 25,
        techStack: ['Yjs', 'WebSocket', 'Monaco Editor', 'WebRTC'],
        color: '#8B5CF6',
        started: '3 days ago',
      },
    ],

    education: [
      {
        level: 'B.Tech — Computer Science & Engineering',
        institution: 'RNS Institute of Technology, Bengaluru',
        board: 'VTU',
        duration: '2022 — 2026',
        score: 'CGPA: 8.5 / 10',
        highlights: ['Data Structures & Algorithms', 'Machine Learning', 'Database Systems', 'Operating Systems'],
        color: '#10B981',
        current: true,
      },
      {
        level: 'Class XII — PCM + Computer Science',
        institution: 'Delhi Public School, Bengaluru',
        board: 'CBSE',
        duration: '2020 — 2022',
        score: '92.4%',
        highlights: ['Physics', 'Mathematics', 'Computer Science', 'Chemistry'],
        color: '#06B6D4',
        current: false,
      },
      {
        level: 'Class X',
        institution: 'Delhi Public School, Bengaluru',
        board: 'CBSE',
        duration: '2019 — 2020',
        score: '95.2%',
        highlights: ['Mathematics', 'Science', 'English', 'Social Studies'],
        color: '#8B5CF6',
        current: false,
      },
    ],

    certifications: [
      {
        title: 'Full-Stack Web Development Intern',
        issuer: 'Tech Startup Inc.',
        date: 'Summer 2024',
        description: 'Completed a 3-month unpaid internship building internal tools using the MERN stack. Designed and developed a dashboard to track employee metrics.',
        link: 'https://github.com/user/internship-project',
        color: '#10B981',
      },
      {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'January 2025',
        description: 'Validated overall understanding of the AWS Cloud platform, covering basic cloud concepts and security.',
        link: '',
        color: '#F59E0B',
      }
    ],

    achievements: {
      hackathons: [
        {
          title: 'HackRevolution 2025 — 1st Place 🏆',
          event: 'National Level Hackathon',
          location: 'IIT Bengaluru',
          date: 'March 2025',
          teamSize: '4 Members',
          description: 'Built "MedSync AI" — a real-time patient monitoring dashboard with AI-powered anomaly detection. Processes vitals through a custom ML pipeline and alerts providers via WebSocket within 200ms.',
          whatWeBuilt: [
            'Real-time vitals monitoring with live ECG/SpO2 charts',
            'Custom anomaly detection ML model (MIT-BIH dataset)',
            'WebSocket-based instant alert system',
            'React Native companion app',
          ],
          techStack: ['React', 'FastAPI', 'TensorFlow', 'WebSocket', 'MongoDB', 'Docker'],
          liveDemo: 'https://medsync-demo.vercel.app',
          github: 'https://github.com/user/medsync-ai',
          images: [
            { placeholder: 'Team presenting at finals', label: 'Finals Presentation' },
            { placeholder: 'Live dashboard demo', label: 'Dashboard Demo' },
            { placeholder: 'Team with trophy', label: 'Winners 🏆' },
          ],
          color: '#F59E0B',
          trophy: '🥇',
        },
        {
          title: 'CodeSprint 3.0 — 2nd Place 🥈',
          event: '36-Hour Regional Hackathon',
          location: 'RVCE, Bengaluru',
          date: 'November 2024',
          teamSize: '3 Members',
          description: 'Developed "EcoTrack" — a sustainability analytics platform helping organizations track and reduce carbon footprint using IoT sensor data and predictive modeling.',
          whatWeBuilt: [
            'Carbon footprint calculator with IoT integration',
            'Predictive analytics for emission forecasting',
            'Gamified sustainability challenges',
            'Automated ESG report generation',
          ],
          techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Chart.js', 'IoT', 'Python'],
          liveDemo: '',
          github: 'https://github.com/user/ecotrack',
          images: [
            { placeholder: 'Team during 36-hour sprint', label: 'Coding Sprint' },
            { placeholder: 'Demo to judges', label: 'Judging Round' },
          ],
          color: '#C0C0C0',
          trophy: '🥈',
        },
        {
          title: 'Smart India Hackathon — Finalist 🏅',
          event: 'SIH 2024 Grand Finale',
          location: 'NIT Warangal',
          date: 'December 2024',
          teamSize: '6 Members',
          description: 'Top 5 nationally for "AI-Driven Traffic Management". Built a Computer Vision system using YOLOv8 that optimizes traffic signal timings based on real-time vehicle density.',
          whatWeBuilt: [
            'YOLOv8-based real-time vehicle detection',
            'Dynamic traffic signal optimization',
            'Admin dashboard with live CCTV feeds',
            'Historical traffic pattern analysis',
          ],
          techStack: ['Python', 'YOLOv8', 'OpenCV', 'Flask', 'React', 'Redis'],
          liveDemo: '',
          github: 'https://github.com/user/smart-traffic',
          images: [
            { placeholder: 'Grand finale at NIT Warangal', label: 'SIH Finals' },
            { placeholder: 'Vehicle detection in real-time', label: 'Live Detection' },
            { placeholder: 'Finalists certificate', label: 'Finalists' },
          ],
          color: '#CD7F32',
          trophy: '🏅',
        },
      ],
      events: [
        {
          title: 'RIFT Hackathon 2025',
          type: 'Hackathon',
          location: 'Bengaluru',
          date: 'April 2025',
          status: 'completed',
          experience: 'An incredible 48-hour hackathon experience. Collaborated with developers from across the country. Built a real-time collaborative whiteboard with AI-powered diagram generation. The networking and learning were invaluable — met industry mentors and got feedback directly from startup founders.',
          takeaways: [
            'Learned WebRTC for real-time collaboration',
            'First time integrating AI image generation APIs',
            'Connected with 3 potential collaborators for future projects',
          ],
          mood: '🔥',
          color: '#EC4899',
        },
        {
          title: 'Google DevFest Bengaluru',
          type: 'Tech Conference',
          location: 'Bengaluru',
          date: 'January 2025',
          status: 'completed',
          experience: "Attended workshops on Gemini API, Firebase Extensions, and Flutter. The hands-on codelabs were the highlight — built a working AI chatbot during the Gemini session. Great exposure to Google's latest developer tools and ecosystem.",
          takeaways: [
            'Hands-on with Gemini API and function calling',
            'Learned Firebase Genkit for AI workflows',
            'Explored Flutter for cross-platform development',
          ],
          mood: '🚀',
          color: '#06B6D4',
        },
        {
          title: 'MLOps Community Meetup',
          type: 'Meetup',
          location: 'Koramangala, Bengaluru',
          date: 'February 2025',
          status: 'completed',
          experience: 'A deep-dive into production ML pipelines. Speakers from Flipkart and Swiggy shared real-world challenges of deploying ML at scale. Learned about feature stores, model monitoring, and A/B testing infrastructure.',
          takeaways: [
            'Understanding of ML model deployment pipelines',
            'Exposure to MLflow and Kubeflow',
            'Networking with ML engineers from top startups',
          ],
          mood: '🧠',
          color: '#8B5CF6',
        },
      ],
    },

    proofOfWork: {
      github: {
        username: 'abhiho11a',
        stats: [
          { label: 'Repositories', value: '45+', color: '#10B981' },
          { label: 'Contributions', value: '1,200+', color: '#06B6D4' },
          { label: 'Current Streak', value: '67 days', color: '#8B5CF6' },
          { label: 'Active Since', value: '2022', color: '#F59E0B' },
        ],
      },
      leetcode: {
        username: 'abhishek_holla_',
        totalSolved: 335,
        stats: [
          { difficulty: 'Easy', solved: 180, total: 800, color: '#10B981' },
          { difficulty: 'Medium', solved: 120, total: 1700, color: '#F59E0B' },
          { difficulty: 'Hard', solved: 35, total: 750, color: '#EF4444' },
        ],
      },
    },

    contact: {
      email: 'abhishek@example.com',
      linkedin: '#',
      github: '#',
      location: 'Based in Bengaluru, India — Open to remote & relocation',
      availability: ['Placements', 'Freelance', 'Hackathons'],
    },

    footer: {
      socials: [
        { label: 'GitHub', href: '#' },
        { label: 'LinkedIn', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'Email', href: '#' },
      ],
    },
  };
}

// ═══════════════════════════════════════════════════════════════
//  SEED SCRIPT
// ═══════════════════════════════════════════════════════════════

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await AdminUser.deleteMany({});
    await PortfolioData.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await AdminUser.create({
      username: 'admin',
      password: 'admin123',
    });
    console.log(`👤 Admin user created: ${admin.username}`);

    // Create portfolio data
    const data = await PortfolioData.create(getDefaultData());
    console.log('📄 Portfolio data seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('   Admin login: admin / admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDB();
}
