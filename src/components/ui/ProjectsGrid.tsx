import { FC, useEffect } from 'react';
import { useApiStore } from '../../store/api-store';
import GridCell from './grid-cell'

const ProjectsGrid: FC = () => {
  const fetchProjects = useApiStore((s) => s.fetchProjects);
  const projects = useApiStore((s) => s.projects);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await fetchProjects();
      console.log('projectsData: ', projectsData)
    };
    fetchData();
  }, [fetchProjects]);

  return (
    <div className="mt-[-2] sm:mt-2 overflow-auto h-screen w-screen pt-4 p-2 sm:pt-2">
      <div className="grid gap-2 pb-24 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {projects.map((project) => (
          <GridCell
            key={project.id}
            {...project}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;

