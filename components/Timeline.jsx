import * as React from 'react';
import { experiences } from '../public/data/experienceData';
import Timeline from '@mui/lab/Timeline'; // Update to @mui/lab
import TimelineItem from '@mui/lab/TimelineItem'; // Update to @mui/lab
import TimelineSeparator from '@mui/lab/TimelineSeparator'; // Update to @mui/lab
import TimelineConnector from '@mui/lab/TimelineConnector'; // Update to @mui/lab
import TimelineContent from '@mui/lab/TimelineContent'; // Update to @mui/lab
import TimelineDot from '@mui/lab/TimelineDot'; // Update to @mui/lab
import TimelineRole from './TimelineRole'; // Assuming you want to keep this component for rendering role details

const AlternateTimeline = ({ filter }) => {
  const filteredExperiences = experiences
    .map(section => ({
      ...section,
      roles: section.roles.filter(role => filter === 'all' || role.category === filter),
    }))
    .filter(section => section.roles.length > 0);

  const allRoles = filteredExperiences.flatMap(section => section.roles);

  return (
    <Timeline position="alternate">
      {allRoles.map((role, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot variant="outlined" /> {/* Use outlined variant here */}
            {index < allRoles.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <TimelineRole role={role} /> {/* Assuming TimelineRole handles the display of the role */}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default AlternateTimeline;
