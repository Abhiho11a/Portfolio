import mongoose from 'mongoose';

const portfolioDataSchema = new mongoose.Schema({
  hero: {
    name: { type: String, default: '' },
    tagline: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    status: { type: String, default: '' },
    highlights: [{
      text: { type: String },
      color: { type: String },
      label: { type: String },
    }],
  },

  skills: [{
    id: String,
    label: String,
    tagline: String,
    color: String,
    skills: [{
      name: String,
      level: Number,
      desc: String,
    }],
  }],

  projects: [{
    title: String,
    tagline: String,
    description: String,
    techStack: [String],
    colorHex: String,
    accent: String,
    stats: { type: mongoose.Schema.Types.Mixed },
    links: {
      live: String,
      github: String,
    },
    images: [{
      url: String,
      caption: String,
    }],
  }],

  currentlyBuilding: [{
    status: String,
    title: String,
    description: String,
    progress: Number,
    techStack: [String],
    color: String,
    started: String,
  }],

  education: [{
    level: String,
    institution: String,
    board: String,
    duration: String,
    score: String,
    highlights: [String],
    color: String,
    current: Boolean,
  }],

  certifications: [{
    title: String,
    issuer: String,
    date: String,
    description: String,
    link: String,
    image: String,
    color: String,
  }],

  achievements: {
    hackathons: [{
      title: String,
      event: String,
      location: String,
      date: String,
      teamSize: String,
      description: String,
      whatWeBuilt: [String],
      techStack: [String],
      liveDemo: String,
      github: String,
      images: [{
        placeholder: String,
        label: String,
      }],
      color: String,
      trophy: String,
    }],
    events: [{
      title: String,
      type: { type: String },
      location: String,
      date: String,
      status: String,
      experience: String,
      takeaways: [String],
      mood: String,
      color: String,
    }],
  },

  proofOfWork: {
    github: {
      username: { type: String, default: '' },
      stats: [{
        label: String,
        value: String,
        color: String,
      }],
    },
    leetcode: {
      username: { type: String, default: '' },
      totalSolved: { type: Number, default: 0 },
      stats: [{
        difficulty: String,
        solved: Number,
        total: Number,
        color: String,
      }],
    },
  },

  contact: {
    email: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    location: { type: String, default: '' },
    availability: [String],
  },

  footer: {
    socials: [{
      label: String,
      href: String,
    }],
  },
}, {
  timestamps: true,
  strict: false,
});

const PortfolioData = mongoose.model('PortfolioData', portfolioDataSchema);
export default PortfolioData;
