import { useState } from "react";
import { LayoutGrid, List, Upload, FolderPlus, MoreVertical, FileText, Image as ImageIcon, File as FileIcon } from "lucide-react";

interface MainContentProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  selectedFile: any;
  setSelectedFile: (file: any) => void;
}

const MOCK_FILES = [
  { id: "f1", name: "Q3_Report.pdf", type: "pdf", size: "2.4 MB", modified: "2 hours ago" },
  { id: "f2", name: "Project_Proposal.docx", type: "doc", size: "1.1 MB", modified: "Yesterday" },
  { id: "f3", name: "Hero_Image.png", type: "image", size: "4.8 MB", modified: "Oct 12, 2023" },
  { id: "f4", name: "Budget_2024.xlsx", type: "sheet", size: "850 KB", modified: "Oct 10, 2023" },
];

export default function MainContent({ viewMode, setViewMode, selectedFile, setSelectedFile }: MainContentProps) {
  return (
    <main className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0 bg-card/50" data-usecases="UC_064,UC_065">
        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            data-usecases="UC_031"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <button 
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
            data-usecases="UC_023"
          >
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
        </div>

        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-md">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-sm transition-colors ${viewMode === "grid" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            data-usecases="UC_058"
            aria-label="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-sm transition-colors ${viewMode === "list" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            data-usecases="UC_058"
            aria-label="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* File Area */}
      <div className="flex-1 overflow-y-auto p-6" data-usecases="UC_057,UC_061">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {MOCK_FILES.map(file => (
              <div 
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`group relative flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedFile?.id === file.id 
                    ? "border-primary bg-primary/5 ring-1 ring-primary" 
                    : "border-border bg-card hover:border-primary/30 hover:bg-accent/50"
                }`}
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center bg-secondary rounded-lg group-hover:scale-105 transition-transform">
                  {file.type === "image" ? <ImageIcon className="w-8 h-8 text-primary" /> : 
                   file.type === "pdf" ? <FileText className="w-8 h-8 text-destructive" /> : 
                   <FileIcon className="w-8 h-8 text-primary" />}
                </div>
                <span className="text-sm font-medium text-center truncate w-full">{file.name}</span>
                <span className="text-xs text-muted-foreground mt-1">{file.size}</span>
                
                <button className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full border border-border rounded-lg overflow-hidden bg-card">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Modified</th>
                  <th className="px-6 py-3 font-medium">Size</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_FILES.map(file => (
                  <tr 
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer ${
                      selectedFile?.id === file.id ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      {file.type === "image" ? <ImageIcon className="w-5 h-5 text-primary" /> : 
                       file.type === "pdf" ? <FileText className="w-5 h-5 text-destructive" /> : 
                       <FileIcon className="w-5 h-5 text-primary" />}
                      <span className="font-medium">{file.name}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{file.modified}</td>
                    <td className="px-6 py-4 text-muted-foreground">{file.size}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
