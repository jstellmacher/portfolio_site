"use client";

import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './ResumeGenerator.module.css';

const resumeOutputCSS = `
  body {
    font-family: Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 14pt;
    color: #1a202c;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 12pt;
    color: #2c5282;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 11pt;
    color: #1a202c;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  p, li {
    margin: 5px 0;
    color: #2d3748;
  }

  a {
    color: #2c5282;
    text-decoration: none;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
    margin: 5px 0;
  }

  li {
    margin-bottom: 3px;
  }

  .section {
    margin-bottom: 20px;
  }
`;

const ResumeGenerator = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', location: '', linkedin: '', github: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
    volunteer: [],
    awards: [],
  });

  const [sectionOrder, setSectionOrder] = useState([
    'personalInfo', 'summary', 'experience', 'education', 'skills',
    'certifications', 'projects', 'languages', 'volunteer', 'awards'
  ]);

  const [visibleSections, setVisibleSections] = useState(
    sectionOrder.reduce((acc, section) => ({ ...acc, [section]: true }), {})
  );

  const [previewZoom, setPreviewZoom] = useState(100);

  const previewRef = useRef(null);

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      if (section === 'personalInfo') {
        return { ...prev, [section]: { ...prev[section], [name]: value } };
      }
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [name]: value };
        return { ...prev, [section]: newArray };
      }
      return { ...prev, [section]: value };
    });
  };

  const handleDateChange = (date, section, index, field) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: date };
      return { ...prev, [section]: newArray };
    });
  };

  const addItem = (section) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], {}],
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const toggleSection = (section) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formatSectionTitle = (section) => {
    return section.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatLink = (text, type) => {
    switch (type) {
      case 'email':
        return <a href={`mailto:${text}`}>{text}</a>;
      case 'phone':
        return <a href={`tel:${text}`}>{text}</a>;
      case 'url':
        return <a href={text.startsWith('http') ? text : `https://${text}`} target="_blank" rel="noopener noreferrer">{text}</a>;
      default:
        return text;
    }
  };

  const handleZoomChange = (e) => {
    setPreviewZoom(Number(e.target.value));
  };

  const generateResumeHTML = () => {
    const resumeContent = sectionOrder.map((section) => {
      if (!visibleSections[section]) return '';

      switch (section) {
        case 'personalInfo':
          return `
            <div class="section">
              <h1>${resumeData.personalInfo.name || 'Your Name'}</h1>
              <p>
                ${formatLink(resumeData.personalInfo.email || 'email@example.com', 'email')} | ${formatLink(resumeData.personalInfo.phone || 'Phone Number', 'phone')}
              </p>
              <p>${resumeData.personalInfo.location || 'Location'}</p>
              ${resumeData.personalInfo.linkedin ? `<p>LinkedIn: ${formatLink(resumeData.personalInfo.linkedin, 'url')}</p>` : ''}
              ${resumeData.personalInfo.github ? `<p>GitHub: ${formatLink(resumeData.personalInfo.github, 'url')}</p>` : ''}
            </div>
          `;
        case 'summary':
          return `
            <div class="section">
              <h2>Professional Summary</h2>
              <p>${resumeData.summary || 'Your professional summary will appear here.'}</p>
            </div>
          `;
        case 'experience':
          return `
            <div class="section">
              <h2>Work Experience</h2>
              ${resumeData.experience.map((exp) => `
                <div>
                  <h3>${exp.title || 'Job Title'} at ${exp.company || 'Company Name'}</h3>
                  <p>${exp.startDate?.toLocaleDateString() || 'Start Date'} - ${exp.endDate?.toLocaleDateString() || 'End Date'}</p>
                  <ul>
                    ${exp.responsibilities.split('\n').map(resp => `<li>${resp}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          `;
        case 'education':
          return `
            <div class="section">
              <h2>Education</h2>
              ${resumeData.education.map((edu) => `
                <div>
                  <h3>${edu.degree || 'Degree'} from ${edu.institution || 'Institution'}</h3>
                  <p>Graduated: ${edu.graduationDate?.toLocaleDateString() || 'Graduation Date'}</p>
                </div>
              `).join('')}
            </div>
          `;
        case 'skills':
          return `
            <div class="section">
              <h2>Skills</h2>
              <p>${resumeData.skills.join(' • ')}</p>
            </div>
          `;
        case 'certifications':
          return `
            <div class="section">
              <h2>Certifications</h2>
              ${resumeData.certifications.map((cert) => `
                <div>
                  <h3>${cert.name || 'Certification Name'}</h3>
                  <p>${cert.issuer || 'Issuer'} - ${cert.date?.toLocaleDateString() || 'Date'}</p>
                </div>
              `).join('')}
            </div>
          `;
        case 'projects':
          return `
            <div class="section">
              <h2>Projects</h2>
              ${resumeData.projects.map((project) => `
                <div>
                  <h3>${project.name || 'Project Name'}</h3>
                  <p>${project.description || 'Project description'}</p>
                  <p>Technologies: ${project.technologies || 'Technologies used'}</p>
                </div>
              `).join('')}
            </div>
          `;
        case 'languages':
          return `
            <div class="section">
              <h2>Languages</h2>
              ${resumeData.languages.map((language) => `
                <p>${language.language || 'Language'}: ${language.proficiency || 'Proficiency level'}</p>
              `).join('')}
            </div>
          `;
        case 'volunteer':
          return `
            <div class="section">
              <h2>Volunteer Experience</h2>
              ${resumeData.volunteer.map((vol) => `
                <div>
                  <h3>${vol.role || 'Volunteer Role'} at ${vol.organization || 'Organization'}</h3>
                  <p>${vol.description || 'Description of volunteer work'}</p>
                </div>
              `).join('')}
            </div>
          `;
        case 'awards':
          return `
            <div class="section">
              <h2>Awards</h2>
              ${resumeData.awards.map((award) => `
                <div>
                  <h3>${award.title || 'Award Title'}</h3>
                  <p>${award.issuer || 'Issuer'} - ${award.date?.toLocaleDateString() || 'Date'}</p>
                  <p>${award.description || 'Award description'}</p>
                </div>
              `).join('')}
            </div>
          `;
        default:
          return '';
      }
    }).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume - ${resumeData.personalInfo.name}</title>
        <style>
          ${resumeOutputCSS}
        </style>
      </head>
      <body>
        ${resumeContent}
      </body>
      </html>
    `;
  };

  const renderSection = (section) => {
    switch (section) {
      case 'personalInfo':
        return (
          <div className={styles['resume-section']}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={resumeData.personalInfo.name}
              onChange={(e) => handleInputChange(e, 'personalInfo')}
              className={styles['resume-input']}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={resumeData.personalInfo.email}
              onChange={(e) => handleInputChange(e, 'personalInfo')}
              className={styles['resume-input']}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => handleInputChange(e, 'personalInfo')}
              className={styles['resume-input']}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={resumeData.personalInfo.location}
              onChange={(e) => handleInputChange(e, 'personalInfo')}
              className={styles['resume-input']}
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={resumeData.personalInfo.linkedin}
              onChange={(e) => handleInputChange(e, 'personalInfo')}
              className={styles['resume-input']}
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={resumeData.personalInfo.github}
              onChange={(e) => handleInputChange(e, 'personalInfo')}
              className={styles['resume-input']}
            />
          </div>
        );
      case 'summary':
        return (
          <div className={styles['resume-section']}>
            <textarea
              name="summary"
              placeholder="Brief professional summary"
              value={resumeData.summary}
              onChange={(e) => handleInputChange(e, 'summary')}
              className={styles['resume-textarea']}
              rows="3"
            />
          </div>
        );
      case 'experience':
        return (
          <div className={styles['resume-section']}>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className={styles['experience-item']}>
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={exp.title || ''}
                  onChange={(e) => handleInputChange(e, 'experience', index)}
                  className={styles['resume-input']}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={exp.company || ''}
                  onChange={(e) => handleInputChange(e, 'experience', index)}
                  className={styles['resume-input']}
                />
                <DatePicker
                  selected={exp.startDate}
                  onChange={(date) => handleDateChange(date, 'experience', index, 'startDate')}
                  placeholderText="Start Date"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className={styles['resume-input']}
                />
                <DatePicker
                  selected={exp.endDate}
                  onChange={(date) => handleDateChange(date, 'experience', index, 'endDate')}
                  placeholderText="End Date"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className={styles['resume-input']}
                />
                <textarea
                  name="responsibilities"
                  placeholder="Key responsibilities and achievements"
                  value={exp.responsibilities || ''}
                  onChange={(e) => handleInputChange(e, 'experience', index)}
                  className={styles['resume-textarea']}
                  rows="3"
                />
                <button onClick={() => removeItem('experience', index)} className={styles['resume-button']}>Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('experience')} className={styles['resume-button']}>Add Experience</button>
          </div>
        );
      case 'education':
        return (
          <div className={styles['resume-section']}>
            {resumeData.education.map((edu, index) => (
              <div key={index} className={styles['education-item']}>
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleInputChange(e, 'education', index)}
                  className={styles['resume-input']}
                />
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution"
                  value={edu.institution || ''}
                  onChange={(e) => handleInputChange(e, 'education', index)}
                  className={styles['resume-input']}
                />
                <DatePicker
                  selected={edu.graduationDate}
                  onChange={(date) => handleDateChange(date, 'education', index, 'graduationDate')}
                  placeholderText="Graduation Date"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className={styles['resume-input']}
                />
                <button onClick={() => removeItem('education', index)} className={styles['resume-button']}>Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('education')} className={styles['resume-button']}>Add Education</button>
          </div>
        );
      case 'skills':
        return (
          <div className={styles['resume-section']}>
            <textarea
              name="skills"
              placeholder="List your skills (comma-separated)"
              value={resumeData.skills.join(', ')}
              onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value.split(',').map(skill => skill.trim()) }))}
              className={styles['resume-textarea']}
              rows="3"
            />
          </div>
        );
      case 'certifications':
        return (
          <div className={styles['resume-section']}>
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className={styles['certification-item']}>
                <input
                  type="text"
                  name="name"
                  placeholder="Certification Name"
                  value={cert.name || ''}
                  onChange={(e) => handleInputChange(e, 'certifications', index)}
                  className={styles['resume-input']}
                />
                <input
                  type="text"
                  name="issuer"
                  placeholder="Issuing Organization"
                  value={cert.issuer || ''}
                  onChange={(e) => handleInputChange(e, 'certifications', index)}
                  className={styles['resume-input']}
                />
                <DatePicker
                  selected={cert.date}
                  onChange={(date) => handleDateChange(date, 'certifications', index, 'date')}
                  placeholderText="Date Obtained"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className={styles['resume-input']}
                />
                <button onClick={() => removeItem('certifications', index)} className={styles['resume-button']}>Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('certifications')} className={styles['resume-button']}>Add Certification</button>
          </div>
        );
      case 'projects':
        return (
          <div className={styles['resume-section']}>
            {resumeData.projects.map((project, index) => (
              <div key={index} className={styles['project-item']}>
                <input
                  type="text"
                  name="name"
                  placeholder="Project Name"
                  value={project.name || ''}
                  onChange={(e) => handleInputChange(e, 'projects', index)}
                  className={styles['resume-input']}
                />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={project.description || ''}
                  onChange={(e) => handleInputChange(e, 'projects', index)}
                  className={styles['resume-textarea']}
                  rows="3"
                />
                <input
                  type="text"
                  name="technologies"
                  placeholder="Technologies Used (comma-separated)"
                  value={project.technologies || ''}
                  onChange={(e) => handleInputChange(e, 'projects', index)}
                  className={styles['resume-input']}
                />
                <button onClick={() => removeItem('projects', index)} className={styles['resume-button']}>Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('projects')} className={styles['resume-button']}>Add Project</button>
          </div>
        );
      case 'languages':
        return (
          <div className={styles['resume-section']}>
            {resumeData.languages.map((language, index) => (
              <div key={index} className={styles['language-item']}>
                <input
                  type="text"
                  name="language"
                  placeholder="Language"
                  value={language.language || ''}
                  onChange={(e) => handleInputChange(e, 'languages', index)}
                  className={styles['resume-input']}
                />
                <input
                  type="text"
                  name="proficiency"
                  placeholder="Proficiency Level"
                  value={language.proficiency || ''}
                  onChange={(e) => handleInputChange(e, 'languages', index)}
                  className={styles['resume-input']}
                />
                <button onClick={() => removeItem('languages', index)} className={styles['resume-button']}>Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('languages')} className={styles['resume-button']}>Add Language</button>
          </div>
        );
      case 'volunteer':
        return (
          <div className={styles['resume-section']}>
            {resumeData.volunteer.map((vol, index) => (
              <div key={index} className={styles['volunteer-item']}>
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  value={vol.organization || ''}
                  onChange={(e) => handleInputChange(e, 'volunteer', index)}
                  className={styles['resume-input']}
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={vol.role || ''}
                  onChange={(e) => handleInputChange(e, 'volunteer', index)}
                  className={styles['resume-input']}
                />
                <textarea
                  name="description"
                  placeholder="Description of volunteer work"
                  value={vol.description || ''}
                  onChange={(e) => handleInputChange(e, 'volunteer', index)}
                  className={styles['resume-textarea']}
                  rows="3"
                />
                <button onClick={() => removeItem('volunteer', index)} className={styles['resume-button']}>Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('volunteer')} className={styles['resume-button']}>Add Volunteer Experience</button>
          </div>
        );
      case 'awards':
        return (
          <div className={styles['resume-section']}>
            {resumeData.awards.map((award, index) => (
              <div key={index} className={styles['award-item']}>
                <input
                  type="text"
                  name="title"
                  placeholder="Award Title"
                  value={award.title || ''}
                  onChange={(e) => handleInputChange(e, 'awards', index)}
                  className={styles['resume-input']}
                />
                <input
                  type="text"
                  name="issuer"
                  placeholder="Issuing Organization"
                  value={award.issuer || ''}
                  onChange={(e) => handleInputChange(e, 'awards', index)}
                  className={styles['resume-input']}
                />
                <DatePicker
                  selected={award.date}
                  onChange={(date) => handleDateChange(date, 'awards', index, 'date')}
                  placeholderText="Date Received"
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className={styles['resume-input']}
                />
                <textarea
                  name="description"
                  placeholder="Description of the award"
                  value={award.description || ''}
                  onChange={(e) => handleInputChange(e, 'awards', index)}
                  className={styles['resume-textarea']}
                  rows="3"
                />
                <button onClick={() => removeItem('awards', index)} className={styles['resume-button']}>Remove</button>
              </div>
            ))}
            <button onClick={() => addItem('awards')} className={styles['resume-button']}>Add Award</button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <div className={`${styles['resume-preview']} ${styles.resumeBody}`} style={{ transform: `scale(${previewZoom / 100})`, transformOrigin: 'top left' }}>
        {sectionOrder.map((section) => {
          if (!visibleSections[section]) return null;

          switch (section) {
            case 'personalInfo':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h1>{resumeData.personalInfo.name || 'Your Name'}</h1>
                  <p>
                    {formatLink(resumeData.personalInfo.email || 'email@example.com', 'email')} | {formatLink(resumeData.personalInfo.phone || 'Phone Number', 'phone')}
                  </p>
                  <p>{resumeData.personalInfo.location || 'Location'}</p>
                  {resumeData.personalInfo.linkedin && <p>LinkedIn: {formatLink(resumeData.personalInfo.linkedin, 'url')}</p>}
                  {resumeData.personalInfo.github && <p>GitHub: {formatLink(resumeData.personalInfo.github, 'url')}</p>}
                </div>
              );
            case 'summary':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Professional Summary</h2>
                  <p>{resumeData.summary || 'Your professional summary will appear here.'}</p>
                </div>
              );
            case 'experience':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Work Experience</h2>
                  {resumeData.experience.length > 0 ? (
                    resumeData.experience.map((exp, index) => (
                      <div key={index}>
                        <h3>{exp.title || 'Job Title'} at {exp.company || 'Company Name'}</h3>
                        <p>{exp.startDate?.toLocaleDateString() || 'Start Date'} - {exp.endDate?.toLocaleDateString() || 'End Date'}</p>
                        <ul>
                          {exp.responsibilities.split('\n').map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p>Your work experience will be listed here.</p>
                  )}
                </div>
              );
            case 'education':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Education</h2>
                  {resumeData.education.length > 0 ? (
                    resumeData.education.map((edu, index) => (
                      <div key={index}>
                        <h3>{edu.degree || 'Degree'} from {edu.institution || 'Institution'}</h3>
                        <p>Graduated: {edu.graduationDate?.toLocaleDateString() || 'Graduation Date'}</p>
                      </div>
                    ))
                  ) : (
                    <p>Your education details will be listed here.</p>
                  )}
                </div>
              );
            case 'skills':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Skills</h2>
                  <p>{resumeData.skills.join(' • ')}</p>
                </div>
              );
            case 'certifications':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Certifications</h2>
                  {resumeData.certifications.length > 0 ? (
                    resumeData.certifications.map((cert, index) => (
                      <div key={index}>
                        <h3>{cert.name || 'Certification Name'}</h3>
                        <p>{cert.issuer || 'Issuer'} - {cert.date?.toLocaleDateString() || 'Date'}</p>
                      </div>
                    ))
                  ) : (
                    <p>Your certifications will be listed here.</p>
                  )}
                </div>
              );
            case 'projects':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Projects</h2>
                  {resumeData.projects.length > 0 ? (
                    resumeData.projects.map((project, index) => (
                      <div key={index}>
                        <h3>{project.name || 'Project Name'}</h3>
                        <p>{project.description || 'Project description'}</p>
                        <p>Technologies: {project.technologies || 'Technologies used'}</p>
                      </div>
                    ))
                  ) : (
                    <p>Your projects will be listed here.</p>
                  )}
                </div>
              );
            case 'languages':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Languages</h2>
                  {resumeData.languages.length > 0 ? (
                    resumeData.languages.map((lang, index) => (
                      <p key={index}>{lang.language || 'Language'}: {lang.proficiency || 'Proficiency level'}</p>
                    ))
                  ) : (
                    <p>Your language proficiencies will be listed here.</p>
                  )}
                </div>
              );
            case 'volunteer':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Volunteer Experience</h2>
                  {resumeData.volunteer.length > 0 ? (
                    resumeData.volunteer.map((vol, index) => (
                      <div key={index}>
                        <h3>{vol.role || 'Volunteer Role'} at {vol.organization || 'Organization'}</h3>
                        <p>{vol.description || 'Description of volunteer work'}</p>
                      </div>
                    ))
                  ) : (
                    <p>Your volunteer experience will be listed here.</p>
                  )}
                </div>
              );
            case 'awards':
              return (
                <div key={section} className={styles['preview-section']}>
                  <h2>Awards</h2>
                  {resumeData.awards.length > 0 ? (
                    resumeData.awards.map((award, index) => (
                      <div key={index}>
                        <h3>{award.title || 'Award Title'}</h3>
                        <p>{award.issuer || 'Issuer'} - {award.date?.toLocaleDateString() || 'Date'}</p>
                        <p>{award.description || 'Award description'}</p>
                      </div>
                    ))
                  ) : (
                    <p>Your awards will be listed here.</p>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className={styles['resume-container']}>
      <div className={styles['input-column']}>
        {sectionOrder.map((section) => (
          <div key={section} className={styles['draggable-section']}>
            <div className={styles['section-header']}>
              <h2>{formatSectionTitle(section)}</h2>
              <label className={styles['switch']}>
                <input
                  type="checkbox"
                  checked={visibleSections[section]}
                  onChange={() => toggleSection(section)}
                />
                <span className={styles['slider']}></span>
              </label>
            </div>
            {renderSection(section)}
          </div>
        ))}
        <button onClick={() => {
          const resumeHTML = generateResumeHTML();
          const blob = new Blob([resumeHTML], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        }} className={styles['generate-button']}>
          Generate ATS-Friendly Resume
        </button>
      </div>
      <div className={styles['preview-column']}>
        <h2 className={styles['preview-title']}>Live Preview</h2>
        <div className={styles['zoom-control']}>
          <label htmlFor="zoom">Zoom: </label>
          <input
            type="range"
            id="zoom"
            min="50"
            max="150"
            value={previewZoom}
            onChange={handleZoomChange}
          />
          <span>{previewZoom}%</span>
        </div>
        <div className={styles['preview-wrapper']} ref={previewRef}>
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;