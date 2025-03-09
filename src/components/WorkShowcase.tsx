import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Application } from '@splinetool/runtime'

const projects = [
  {
    title: 'Interactive Car Dashboard',
    description: 'A fully animated and interactive 3D car dashboard interface with real-time controls and dynamic lighting effects.',
    splineFile: '/3d/car_dashboard_with_animation.spline',
    tags: ['UI/UX', '3D Animation', 'Interactive', 'Automotive']
  },
  {
    title: 'Website 3D Model',
    description: 'Dynamic 3D website visualization showcasing modern web design concepts through immersive 3D elements.',
    splineFile: '/3d/webbee_websitespline_model.spline',
    tags: ['Web Design', '3D Modeling', 'Animation', 'Creative']
  }
]

export default function WorkShowcase() {
  const handleLoad = (splineApp: Application) => {
    // Disable all interactions for all models
    const canvas = splineApp.canvas;
    if (canvas) {
      // Make the canvas non-interactive
      canvas.style.pointerEvents = 'none';
      
      // Prevent all interactions
      const preventDefault = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };
      
      // Add event listeners with passive: false to ensure prevention works
      canvas.addEventListener('wheel', preventDefault, { passive: false });
      canvas.addEventListener('touchstart', preventDefault, { passive: false });
      canvas.addEventListener('mousedown', preventDefault, { passive: false });
      canvas.addEventListener('contextmenu', preventDefault);
    }
  };

  return (
    <div className="relative w-full space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {projects.map((project) => (
          <motion.div 
            key={project.title} 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Project display */}
            <div className="relative h-[400px] rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-600/20 via-blue-900/20 to-black/40 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Spline 
                  scene={project.splineFile}
                  className="w-full h-full pointer-events-none"
                  onLoad={handleLoad}
                  style={{
                    transform: 'scale(1)',
                    transformOrigin: 'center center',
                    touchAction: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </div>
              {/* Overlay for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
            
            {/* Project info card */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                {project.title}
              </h3>
              <p className="text-gray-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 