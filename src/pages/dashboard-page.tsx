
import { useEffect, useState, useRef } from 'react';
import { Modal } from "../components/ui/NewProjectModal";
import ProjectsGrid from '../components/ui/ProjectsGrid';
import Navbar from '../components/ui/NavBar';
import useEditorStore from '../components/editor/EditorStore';

function DashboardPage() {
  const [startProject, setStartProject] = useState(false);
  const resetStore = useEditorStore((s) => s.resetStore)
  // Use a more specific type for the modalRef
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (event: MouseEvent) => {
      // Ensure modalRef is not null and the target is an HTMLElement
      if (modalRef.current && event.target instanceof HTMLElement && !modalRef.current.contains(event.target)) {
        setStartProject(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    resetStore()
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>

      <Navbar
        route="Dashboard"
        buttons={[
          { name: 'New Project', function: () => setStartProject(true) },
          'logout'
        ]}
        isLoggedIn={true}
      />

      <div className="fixed top-20 left-0 right-0 bottom-0 z-0">
        <ProjectsGrid />
      </div>

      {startProject && <div ref={modalRef}><Modal /></div>}
    </>
  );
}

export default DashboardPage;

