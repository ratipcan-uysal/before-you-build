import { createRoot } from 'react-dom/client';
import CaseWorkspace from '../../components/case-workspace';
import '../../app/globals.css';
createRoot(document.getElementById('root')!).render(<CaseWorkspace local />);
