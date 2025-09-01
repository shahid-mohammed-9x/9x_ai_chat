import React, { memo } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const PasswordRules = ({ rules, show }) => {
  if (!show) return null;

  const ruleList = [
    { label: 'At least 8 characters', valid: rules.hasMinLength },
    { label: 'One uppercase & lowercase letter', valid: rules.upperLower },
    { label: 'One number', valid: rules.number },
    { label: 'One special character (!@#$%)', valid: rules.special },
  ];

  return (
    <div className="mt-3 p-3 text-sm bg-gray-800 border border-gray-700 rounded-xl">
      <p className="font-semibold mb-2 text-gray-200">Password must contain:</p>
      <ul className="space-y-1">
        {ruleList.map((rule, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {rule.valid ? (
              <CheckCircle size={16} className="text-green-400" />
            ) : (
              <XCircle size={16} className="text-red-400" />
            )}
            {rule.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(PasswordRules);
