export type Category =
'Jobs' |
'Training' |
'Transportation' |
'Coaching' |
'Community Resources';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: Category;
  location: string;
  type: 'In-Person' | 'Remote' | 'Hybrid';
  supportLevel: 'High Support' | 'Moderate Support' | 'Independent';
  description: string;
  tags: string[];
  postedAt: string;
}

export const categories: {
  name: Category;
  icon: string;
  description: string;
}[] = [
{
  name: 'Jobs',
  icon: 'Briefcase',
  description: 'Inclusive employers and supported employment'
},
{
  name: 'Training',
  icon: 'GraduationCap',
  description: 'Skill-building and certification programs'
},
{
  name: 'Transportation',
  icon: 'Bus',
  description: 'Accessible transit and ride programs'
},
{
  name: 'Coaching',
  icon: 'Users',
  description: 'Job coaches and life skills mentors'
},
{
  name: 'Community Resources',
  icon: 'HeartHandshake',
  description: 'Local groups, events, and support networks'
}];


export const opportunities: Opportunity[] = [
{
  id: '1',
  title: 'Retail Associate (Supported)',
  organization: 'Fresh Market Grocers',
  category: 'Jobs',
  location: 'Downtown Area',
  type: 'In-Person',
  supportLevel: 'Moderate Support',
  description:
  'Join our friendly team as a retail associate. You will help stock shelves, organize displays, and assist customers. We provide a dedicated job coach for your first 3 months and flexible scheduling.',
  tags: ['Retail', 'Flexible Hours', 'Job Coach Provided'],
  postedAt: '2 days ago'
},
{
  id: '2',
  title: 'Digital Skills Bootcamp',
  organization: 'Tech For All',
  category: 'Training',
  location: 'Online',
  type: 'Remote',
  supportLevel: 'Independent',
  description:
  'A 6-week online bootcamp teaching basic computer skills, email etiquette, and introductory data entry. Perfect for young adults looking to enter office or remote work environments.',
  tags: ['Technology', 'Self-Paced', 'Certificate'],
  postedAt: '1 week ago'
},
{
  id: '3',
  title: 'Accessible Transit Pass Program',
  organization: 'City Metro',
  category: 'Transportation',
  location: 'Citywide',
  type: 'In-Person',
  supportLevel: 'High Support',
  description:
  'Apply for a reduced-fare transit pass that includes door-to-door paratransit services for eligible individuals. Includes free travel training sessions.',
  tags: ['Transit', 'Financial Aid', 'Travel Training'],
  postedAt: 'Ongoing'
},
{
  id: '4',
  title: 'Independent Living Skills Workshop',
  organization: 'Pathways Center',
  category: 'Community Resources',
  location: 'Westside Community Center',
  type: 'In-Person',
  supportLevel: 'Moderate Support',
  description:
  'Weekly group sessions focusing on cooking, budgeting, and household management. Meet peers and learn practical skills in a supportive environment.',
  tags: ['Life Skills', 'Group Activity', 'Ages 18-30'],
  postedAt: '3 days ago'
},
{
  id: '5',
  title: 'Data Entry Clerk',
  organization: 'HealthPlus Admin',
  category: 'Jobs',
  location: 'North Campus',
  type: 'Hybrid',
  supportLevel: 'Independent',
  description:
  'Quiet, focused work environment managing patient records. We offer a sensory-friendly workspace and clear, structured daily tasks.',
  tags: ['Office', 'Sensory-Friendly', 'Quiet Environment'],
  postedAt: 'Just now'
},
{
  id: '6',
  title: '1-on-1 Career Coaching',
  organization: 'Next Step Services',
  category: 'Coaching',
  location: 'Online or In-Person',
  type: 'Hybrid',
  supportLevel: 'High Support',
  description:
  'Work with a certified career coach to discover your strengths, build a resume, and practice interview skills. We match you with a coach based on your specific needs.',
  tags: ['Mentorship', 'Career Prep', 'Personalized'],
  postedAt: 'Ongoing'
}];


export const testimonials = [
{
  quote:
  'OppLink helped me find a job where my manager actually understands my needs. The job coach they connected me with was amazing.',
  author: 'Sarah J.',
  role: 'Found a job in Retail'
},
{
  quote:
  'As a parent, navigating resources for my son was overwhelming. This platform put everything in one clear, easy-to-use place.',
  author: 'David M.',
  role: 'Parent & Advocate'
},
{
  quote:
  "I love how easy it is to filter by 'Support Level'. It saves me so much time when looking for opportunities for my clients.",
  author: 'Elena R.',
  role: 'Employment Specialist'
}];