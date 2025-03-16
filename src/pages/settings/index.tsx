import { Building2, CreditCard, Users, Link as LinkIcon, Apple as WhatsApp, Slack, FileSpreadsheet, FolderGit2, Settings as SettingsIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isExternal?: boolean;
}

function SidebarItem({ icon, label, href, isExternal }: SidebarItemProps) {
  const content = (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground",
      "hover:bg-muted transition-colors",
      href && "cursor-pointer"
    )}>
      {icon}
      <span className="flex-1">{label}</span>
      {isExternal && <LinkIcon className="h-3 w-3" />}
      {href && <ChevronRight className="h-4 w-4" />}
    </div>
  );

  if (href) {
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link to={href}>{content}</Link>;
  }

  return content;
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium text-muted-foreground px-3">{title}</h3>
      {children}
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Configuración</h1>
            <p className="text-muted-foreground">
              Gestiona la configuración de tu cuenta
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <nav className="space-y-6">
              <SidebarSection title="Configuración">
                <SidebarItem 
                  icon={<SettingsIcon className="h-4 w-4" />} 
                  label="Business Data" 
                  href="/settings/business"
                />
                <SidebarItem 
                  icon={<Users className="h-4 w-4" />} 
                  label="Users" 
                  href="/settings/users"
                />
                <SidebarItem 
                  icon={<Building2 className="h-4 w-4" />} 
                  label="Áreas" 
                  href="/departments"
                />
                <SidebarItem 
                  icon={<Users className="h-4 w-4" />} 
                  label="Colaboradores" 
                  href="/employees"
                />
              </SidebarSection>

              <SidebarSection title="Integraciones">
                <SidebarItem 
                  icon={<WhatsApp className="h-4 w-4" />} 
                  label="WhatsApp" 
                  href="/settings/integrations/whatsapp"
                />
                <SidebarItem 
                  icon={<Slack className="h-4 w-4" />} 
                  label="Slack" 
                  href="/settings/integrations/slack"
                />
                <SidebarItem 
                  icon={<FileSpreadsheet className="h-4 w-4" />} 
                  label="Google Sheets" 
                  href="/settings/integrations/sheets"
                />
                <SidebarItem 
                  icon={<FolderGit2 className="h-4 w-4" />} 
                  label="Google Drive" 
                  href="/settings/integrations/drive"
                />
              </SidebarSection>

              <SidebarSection title="Facturación">
                <SidebarItem 
                  icon={<CreditCard className="h-4 w-4" />} 
                  label="Plan y facturación" 
                  href="/settings/billing"
                />
              </SidebarSection>
            </nav>
          </div>

          {/* Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="border rounded-lg h-[600px] flex items-center justify-center text-muted-foreground">
              Selecciona una opción del menú
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}