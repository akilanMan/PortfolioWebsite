export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
};

export type ProjectItem = {
  name: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
  tags: string[];
  github?: string;
  live?: string;
};

export const siteData = {
  identity: {
    name: 'akilan',
    title: 'software engineer',
    subtitle: 'Data Science',
    headshot: '/selfie.jpg',
    email: 'akilan.manivannan@gmail.com',
    linkedin: 'AkilanManivannan',
    github: 'akilanMan',
    location: 'New Brunswick, NJ'
  },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ] as NavItem[],
  about: {
      bio: "Hi! I'm a new grad software engineer passionate about building thoughtful software that combines strong engineering fundamentals with data and machine learning. I enjoy taking ideas from concept to working, whether that's designing backend architecture, designing new apps, or experimenting with ML models. I always love a challenge and expanding my horizons.",    
      education: {
      school: 'Rutgers University',
      degree: 'B.S. Computer Science, Minor in Data Science',
      location: 'New Brunswick, NJ',
      coursework: [
        'Algorithms',
        'Artificial Intelligence',
        'Machine Learning',
        'Data Structures',
        'Systems Programming',
        'Computer Architecture',
        'Linear Algebra',
        'Principles of Data Management',
        'Regression Methods'
      ]
    }
  },
  experience: [
    {
      company: 'Colgate-Palmolive',
      role: 'Software Engineering Intern',
      location: 'Piscataway, NJ',
      period: 'June 2025 to Dec 2025',
      bullets: [
        'Led a business-facing talent analytics application for HR stakeholders using a React frontend integrated with real-time OData services, enabling interactive filtering, search, and cross-system candidate insights.',
        'Improved enterprise reporting performance at scale by optimizing API data retrieval for 40,000+ record real-time datasets, reducing latency by 60% through query restructuring and asynchronous data handling.',
        'Eliminated manual workflows across enterprise systems by architecting ABAP OData API services that orchestrated real-time data retrieval from multiple SAP entity sets, enabling scalable cross-system reporting.',
        'Modernized legacy SAP On-Premise programs by refactoring and deploying to the cloud, enabling cloud-native scalability, improved security configuration, and streamlined environment management.'
      ]
    },
    {
      company: 'Penske',
      role: 'Software Engineering Intern',
      location: 'Reading, PA',
      period: 'May 2024 to Aug 2024',
      bullets: [
        'Spearheaded an internal application for business management to monitor and manage 200,000+ customer contracts and $2B in transactions using Angular, Java, and Spring.',
        'Engineered asynchronous RESTful API services using Spring and Microsoft SQL Server to manage and update the database, resulting in an efficient and fast data pipeline.',
        'Leveraged CI/CD GitHub Actions to collaborate, merge, and deploy applications while tracking delivery with JIRA.'
      ]
    },
    {
      company: 'Rutgers IEEE IGVC',
      role: 'Developer',
      location: 'New Brunswick, NJ',
      period: 'September 2022 to Dec 2025',
      bullets: [
        'Engineered an autonomous ground vehicle to compete against 100+ universities globally, adhering to stringent performance, safety, and regulatory guidelines through hardware-software integration.',
        'Utilized Python, ROS, and computer vision algorithms to build an integrated system for navigation, line, and object detection, achieving efficient and precise autonomous driving in dynamic environments.'
      ]
    }
  ] as ExperienceItem[],
  projects: [
    {
      name: 'Rutgers IEEE IGVC',
      role: 'Developer',
      period: 'Club',
      summary: 'Autonomous ground vehicle work across hardware and software under strict performance and safety constraints.',
      bullets: [
        'Engineered an autonomous ground vehicle to compete against 100+ universities globally with hardware-software integration under performance and safety constraints.',
        'Built navigation, line detection, and object detection using Python, ROS, and computer vision algorithms.'
      ],
      tags: ['Python', 'ROS', 'Computer Vision', 'Autonomy'],
      github: 'https://github.com/akilanMan'
    },
    {
      name: 'JobHackR',
      period: 'Independent Project',
      summary: 'NLP-powered internship ranking platform that maps resume relevance to job listings.',
      bullets: [
        'Scraped internships from Simplify job repository using pandas, BeautifulSoup, and spaCy; extracted resume keywords and ranked listings with similarity scoring.',
        'Built a React frontend and FastAPI backend used by 20+ users.'
      ],
      tags: ['Python', 'React', 'FastAPI', 'NLP', 'ML'],
      github: 'https://github.com/akilanMan'
    },
    {
      name: 'Sector News Scanner',
      period: 'Independent Project',
      summary: 'Explainable stock watchlist engine combining sentiment, catalysts, and market indicators.',
      bullets: [
        'Generated explainable ranked stock watchlists for S&P 500 equities via multi-factor scoring across Reddit sentiment, catalyst detection, and market indicators.',
        'Automated ingestion pipelines with APScheduler for 30-minute refresh cycles, integrated yFinance, and delivered ranked results in a React frontend.'
      ],
      tags: ['Python', 'React', 'FastAPI', 'PostgreSQL', 'NLP'],
      github: 'https://github.com/akilanMan'
    }
  ] as ProjectItem[],
  skills: {
    languages: ['Java', 'Python', 'C', 'HTML/CSS', 'JavaScript', 'TypeScript', 'SQL', 'R', 'ABAP'],
    frameworks: ['React', 'NodeJS', 'Angular', 'Spring', 'TensorFlow', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'],
    tools: ['Git', 'Linux', 'SQL Server', 'Postman', 'Excel', 'Agile']
  }
};
