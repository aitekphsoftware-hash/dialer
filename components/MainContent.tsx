
import React from 'react';
import { TEMPLATES } from '../constants';
import { TemplateCard } from './TemplateCard';
import { Icon } from './Icon';

const MetricCard = ({ title, value, unit }: { title: string, value: string, unit: string }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">
            {value}
            <span className="text-base font-normal text-gray-400 ml-1">{unit}</span>
        </p>
    </div>
);

const CustomizeCard = () => (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col">
        <h3 className="text-lg font-semibold text-white">Customize Your Own Agent</h3>
        <p className="text-sm text-gray-400 mt-1 mb-4">Fine-tune the tone, speed, and empathy to create a unique CSR variant.</p>
        <div className="space-y-4 text-sm">
             <div>
                <label className="font-medium text-gray-300">Tone</label>
                <div className="flex gap-2 mt-1">
                    {['Empathetic', 'Neutral', 'Confident'].map(tone => 
                        <button key={tone} className="px-3 py-1 bg-gray-700 rounded-full text-gray-300 hover:bg-teal-500 hover:text-white transition">{tone}</button>
                    )}
                </div>
            </div>
            <div>
                <label className="font-medium text-gray-300">Speed</label>
                <input type="range" min="1" max="5" defaultValue="3" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-1" />
            </div>
            <div>
                <label className="font-medium text-gray-300">Languages</label>
                <div className="flex gap-2 mt-1">
                    {['EN', 'TL', 'TR', 'NL'].map(lang => 
                        <button key={lang} className="px-3 py-1 bg-gray-700 rounded-full text-gray-300 hover:bg-teal-500 hover:text-white transition">{lang}</button>
                    )}
                </div>
            </div>
        </div>
         <button className="mt-auto w-full bg-teal-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-600 transition-colors">
            Save as My Variant
        </button>
    </div>
);

const KnowledgeCard = () => {
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };
    return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col text-center items-center col-span-1 md:col-span-2">
        <h3 className="text-lg font-semibold text-white">Knowledge Base</h3>
        <p className="text-sm text-gray-400 mt-1 mb-4">Upload PDFs, Docs, or FAQs to power real-time answers.</p>
        <div className="relative border-2 border-dashed border-gray-600 rounded-lg w-full p-8 flex flex-col items-center justify-center">
             <Icon icon="upload" className="w-10 h-10 text-gray-500 mb-2" />
             <p className="text-sm text-gray-400">Drag & drop files or click to upload</p>
             <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
        {files.length > 0 && (
            <div className="w-full text-left mt-4">
                <p className="text-sm font-medium text-teal-400">Indexed: <span className="text-gray-300">{files.map(f => f.name).join(', ')}</span></p>
            </div>
        )}
    </div>
    )
};


export const MainContent = () => {
  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Calls Handled (Today)" value="128" unit="calls" />
        <MetricCard title="Avg. Turn Latency" value="0.9" unit="s" />
        <MetricCard title="CSAT (Demo)" value="94.2" unit="%" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Templates Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
           <CustomizeCard />
        </div>
      </div>

       <div>
        <h2 className="text-2xl font-bold text-white mb-4">Workspace Tools</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <KnowledgeCard />
         </div>
      </div>
    </div>
  );
};
