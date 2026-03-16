import { X, Download, Trash2, Edit2, Info, FileText, Image as ImageIcon, File as FileIcon } from "lucide-react";

interface DetailsPaneProps {
  file: any;
  onClose: () => void;
}

export default function DetailsPane({ file, onClose }: DetailsPaneProps) {
  if (!file) return null;

  return (
    <aside className="w-[320px] bg-card border-l border-border flex flex-col h-full shrink-0 shadow-xl z-10" data-usecases="UC_067,UC_070">
      <div className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          Details
        </h3>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Preview Area */}
        <div className="w-full aspect-square bg-secondary/50 rounded-xl border border-border flex items-center justify-center mb-6" data-usecases="UC_068">
          {file.type === "image" ? <ImageIcon className="w-16 h-16 text-primary/50" /> : 
           file.type === "pdf" ? <FileText className="w-16 h-16 text-destructive/50" /> : 
           <FileIcon className="w-16 h-16 text-primary/50" />}
        </div>

        {/* File Info */}
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-foreground break-words">{file.name}</h4>
            <p className="text-sm text-muted-foreground uppercase">{file.type} Document</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Size</span>
              <span className="text-sm font-medium">{file.size}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Modified</span>
              <span className="text-sm font-medium">{file.modified}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Created</span>
              <span className="text-sm font-medium">Oct 1, 2023</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Owner</span>
              <span className="text-sm font-medium">You</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md border border-border bg-card hover:bg-accent transition-colors"
              data-usecases="UC_027"
            >
              <Edit2 className="w-4 h-4" />
              Rename
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md border border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors"
              data-usecases="UC_026"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
