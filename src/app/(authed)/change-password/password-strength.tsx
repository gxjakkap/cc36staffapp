"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
  passwordId: string;
}

export function PasswordStrength({
  password,
  passwordId,
}: PasswordStrengthProps) {
  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "ความยาวอย่างน้อย 8 ตัวอักษร" },
      { regex: /[0-9]/, text: "ตัวเลขอย่างน้อย 1 ตัว" },
      { regex: /[a-z]/, text: "ตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว" },
      { regex: /[A-Z]/, text: "ตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "กรอกรหัสผ่าน";
    if (score <= 2) return "รหัสผ่านไม่ปลอดภัย";
    if (score === 3) return "เกือบละ";
    return "ใช้ได้";
  };

  return (
    <div>
      <div
        className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      <p
        id={`${passwordId}-description`}
        className="text-foreground mb-2 text-sm font-medium"
      >
        {getStrengthText(strengthScore)} ต้องประกอบด้วย:
      </p>

      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <X
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
