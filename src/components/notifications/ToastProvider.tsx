import { createContext, useContext, useCallback, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const showToast = useCallback((message: string, type: ToastType = "info", title?: string) => {
    const icons = {
      success: CheckCircle,
      error: XCircle,
      warning: AlertCircle,
      info: Info,
    };

    const colors = {
      success: "text-success",
      error: "text-destructive",
      warning: "text-warning",
      info: "text-primary",
    };

    const Icon = icons[type];

    toast({
      title: title || message,
      description: title ? message : undefined,
      duration: 5000,
      className: "glass border-glass-border animate-slide-in-right",
      action: (
        <Icon className={`h-5 w-5 ${colors[type]}`} />
      ),
    });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}