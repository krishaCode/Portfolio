import React from 'react';
import { Code2, Palette, Brain, Users } from 'lucide-react';


const About = () => {
  const skills = [
    {
      category: 'Programming Languages',
      items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'HTML/CSS']
    },
    {
      category: 'Frameworks & Libraries',
      items: ['React', 'Node.js', 'Express.js', 'Spring Boot', 'Tailwind CSS']
    },
    {
      category: 'Design Tools',
      items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Canva']
    },
    {
      category: 'Databases & Tools',
      items: ['MySQL', 'MongoDB', 'Git', 'VS Code', 'IntelliJ IDEA']
    }
  ];

  const qualities = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Experienced in both frontend and backend development with modern technologies.'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces with focus on user experience.'
    },
    {
      icon: Brain,
      title: 'Problem Solving',
      description: 'Strong analytical skills with ability to break down complex problems into manageable solutions.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Excellent communication skills and experience working in collaborative environments.'
    }
  ];


  return (
     <section id="about" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I'm a passionate software developer and UI/UX designer with a strong foundation in 
            computer science and a keen eye for design.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">My Journey</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                I'm currently pursuing my BSc (Hons) in Information Systems at Sabaragamuwa University 
                of Sri Lanka, where I've developed a strong foundation in software development, 
                system analysis, and design principles.
              </p>
              <p>
                My passion lies in creating innovative solutions that bridge the gap between 
                functionality and aesthetics. I believe that great software should not only work 
                flawlessly but also provide an exceptional user experience.
              </p>
              <p>
                Through various projects and continuous learning, I've gained expertise in 
                full-stack development, AI integration, and modern design practices. I'm always 
                eager to take on new challenges and learn emerging technologies.
              </p>
            </div>

            {/* Qualities */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {qualities.map((quality, index) => (
                <div key={index} className="bg-slate-700/50 p-6 rounded-lg">
                  <quality.icon className="text-blue-400 mb-3" size={32} />
                  <h4 className="text-white font-semibold mb-2">{quality.title}</h4>
                  <p className="text-gray-400 text-sm">{quality.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <div key={index} className="bg-slate-700/30 p-6 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default AboutMe;