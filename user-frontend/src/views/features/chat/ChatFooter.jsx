import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, Send } from 'lucide-react';
import { memo, useState } from 'react';

const aiModels = [
  { value: 'gemini', label: 'Gemini' },
  { value: 'chatgpt', label: 'Chat GPT' },
  { value: 'gork', label: 'Gork' },
  { value: 'claude', label: 'Claude' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'sonar', label: 'Sonar' },
];

const ChatFooter = () => {
  const [selectedModels, setSelectedModels] = useState({});

  // toggle selection
  const handleToggle = (value) => {
    setSelectedModels((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const selectedList = aiModels.filter((m) => selectedModels[m.value]);

  // Build trigger text
  let triggerText = 'Select AI Models';
  if (selectedList.length === 1) {
    triggerText = selectedList[0].label;
  } else if (selectedList.length > 1) {
    triggerText = `${selectedList[0].label}, +${selectedList.length - 1}`;
  }

  return (
    <div className="bottom-0 left-0 right-0 items-center m-2">
      <CardContent className="mx-auto w-full max-w-[80%] bg-card text-white  flex flex-col gap-2  py-2 rounded-2xl shadow-lg">
        {/* Input */}
        <textarea
          name="input text"
          placeholder="Ask me anything..."
          className="min-h-[40px] max-h-[100px] w-full resize-none bg-transparent outline-none px-3 text-base items-center placeholder-gray-400"
        />

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap w-[15%] flex-1 sm:flex-none">
                {triggerText}
                <ChevronDownIcon className="ml-2 opacity-60" size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="max-h-[200px] overflow-y-auto no-scrollbar">
              {aiModels.map((model) => (
                <DropdownMenuCheckboxItem
                  key={model.value}
                  checked={!!selectedModels[model.value]}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() => handleToggle(model.value)}
                >
                  {model.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="icon" className="h-10 w-10 rounded-full hover:bg-gray-50 shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default memo(ChatFooter);
