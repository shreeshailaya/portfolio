"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  ProjectModal,
  type ProjectModalState,
} from "@/components/overlay/ProjectModal";

interface ProjectModalContextValue {
  open: (projectId: string) => void;
  close: () => void;
  state: ProjectModalState;
}

const ProjectModalContext = createContext<ProjectModalContextValue | null>(
  null,
);

export function useProjectModal(): ProjectModalContextValue {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) {
    throw new Error(
      "useProjectModal must be used inside <ProjectModalProvider>",
    );
  }
  return ctx;
}

export function ProjectModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ProjectModalState>({
    open: false,
    projectId: null,
  });

  const open = useCallback((projectId: string) => {
    setState({ open: true, projectId });
  }, []);
  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const value = useMemo(
    () => ({ state, open, close }),
    [state, open, close],
  );

  return (
    <ProjectModalContext.Provider value={value}>
      {children}
      <ProjectModal state={state} onClose={close} />
    </ProjectModalContext.Provider>
  );
}
