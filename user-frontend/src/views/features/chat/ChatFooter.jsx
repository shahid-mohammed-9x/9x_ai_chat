import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, Send } from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';

const aiModels = [
  { value: 'gemini', label: 'Gemini' },
  { value: 'chatgpt', label: 'Chat GPT' },
  { value: 'gork', label: 'Gork' },
  { value: 'claude', label: 'Claude' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'sonar', label: 'Sonar' },
];

const ChatFooter = ({ onClickFunction, loading = false, clearInput = false }) => {
  const [selectedModels, setSelectedModels] = useState([]);
  const [info, setInfo] = useState({
    inputMessage: '',
  });

  const triggerText = useMemo(() => {
    const selectedList = aiModels.filter((m) => selectedModels.includes(m.value));
    let text = 'Select AI Models';
    if (selectedList.length === 1) {
      text = selectedList[0].label;
    } else if (selectedList.length > 1) {
      text = `${selectedList[0].label}, +${selectedList.length - 1}`;
    }
    return text;
  }, [selectedModels]);

  useEffect(() => {
    if (clearInput) {
      setInfo((prev) => ({ ...prev, inputMessage: '' }));
    }
  }, [clearInput]);

  // Functions
  const onChangeHandlerFunction = useCallback(
    (e) => {
      const { name, value } = e?.target;
      setInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [info?.inputMessage]
  );

  const handleToggleFunction = useCallback(
    (value) => {
      setSelectedModels((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    },
    [selectedModels]
  );

  const submitButtonHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (loading) return;
      let data = { selectedModels, inputMessage: info?.inputMessage };
      onClickFunction(data);
    },
    [info?.inputMessage, selectedModels, loading]
  );

  return (
    <div className="bottom-0 left-0 right-0 items-center m-2">
      <CardContent className="mx-auto w-full max-w-[90%] sm:max-w-[80%] bg-card text-white flex flex-col gap-2 py-2 rounded-2xl shadow-lg">
        {/* Input */}
        <textarea
          name="inputMessage"
          placeholder="Ask me anything..."
          className="min-h-[40px] max-h-[100px] w-full resize-none bg-transparent outline-none px-3 text-base placeholder-gray-400"
          value={info?.inputMessage || ''}
          onChange={onChangeHandlerFunction}
        />

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
          {/* Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto flex-1 sm:flex-initial truncate"
              >
                {triggerText}
                <ChevronDownIcon className="ml-2 opacity-60" size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="max-h-[200px] overflow-y-auto no-scrollbar w-48 sm:w-56">
              {aiModels.map((model) => (
                <DropdownMenuCheckboxItem
                  key={model.value}
                  checked={selectedModels.includes(model.value)}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() => handleToggleFunction(model.value)}
                >
                  {model.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Send button */}
          <Button
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-gray-50 shrink-0"
            disabled={loading}
            onClick={submitButtonHandler}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default memo(ChatFooter);
